import { NextApiHandler } from 'next';
import * as admin from 'firebase-admin';
import { getAuth, getIdToken, signInWithCustomToken } from 'firebase/auth';

import { getCustomToken } from '~/lib/common/api';
import {
	COOKIE_MAX_AGE_MILLIS,
	CSRF_COOKIE_NAME,
	SESSION_COOKIE_NAME,
} from '~/lib/common/constants';
import { initializeFirebaseClient } from '~/lib/common/firebase';
import { saveCsrfSecrets } from '~/lib/server/api';
import { setCookie } from '~/lib/server/cookies';
import { createCsrfToken, getSecret } from '~/lib/server/csrf';
import { initializeFirebaseAdmin } from '~/lib/server/firebase';

export type LoginApiResponse = {
	detail: string | { sessionCookie: string; csrfToken: string };
};

const handler: NextApiHandler<LoginApiResponse> = async (req, res) => {
	if (req.method !== 'POST') {
		return res.redirect('/api/not-found');
	}

	const accessToken: string = req.body.accessToken;

	if (!accessToken || typeof accessToken !== 'string') {
		return res.status(400).json({ detail: 'Bad Request' });
	}

	const firebaseClient = initializeFirebaseClient();
	const auth = getAuth(firebaseClient);

	const customToken = await getCustomToken(accessToken);
	if (!customToken) {
		return res.status(404).json({ detail: 'Not found.' });
	}

	try {
		await signInWithCustomToken(auth, customToken);

		if (!auth.currentUser) {
			throw new Error('Internal Server Error');
		}
	} catch {
		return res.status(500).json({ detail: 'Internal Server Error.' });
	}
	const idToken = await getIdToken(auth.currentUser);

	const firebaseAdmin = initializeFirebaseAdmin();
	const [sessionCookie, csrfSecret] = await Promise.all([
		admin.auth(firebaseAdmin).createSessionCookie(idToken, {
			expiresIn: COOKIE_MAX_AGE_MILLIS,
		}),
		getSecret(),
	]);

	await Promise.all([
		saveCsrfSecrets(csrfSecret, sessionCookie),
		setCookie(req, res, SESSION_COOKIE_NAME, sessionCookie),
		setCookie(req, res, CSRF_COOKIE_NAME, createCsrfToken(csrfSecret)),
	]);

	return res.status(200).json({
		detail: {
			sessionCookie: sessionCookie,
			csrfToken: await createCsrfToken(csrfSecret),
		},
	});
};

export default handler;
