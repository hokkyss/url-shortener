import { NextApiHandler } from 'next';
import * as admin from 'firebase-admin';

import { CSRF_COOKIE_NAME, SESSION_COOKIE_NAME } from '~/lib/common/constants';
import { getCookie } from '~/lib/server/cookies';

import { initializeFirebaseAdmin } from '~/lib/server/firebase';
import { verifyCsrfToken } from '~/lib/server/csrf';
import { getCsrfSecrets, shortenLink } from '~/lib/server/api';

const handler: NextApiHandler<{ detail: string }> = async function (req, res) {
	if (req.method !== 'POST') {
		return res.redirect('/api/not-found');
	}
	const [sessionCookie, csrf] = await Promise.all([
		getCookie<string>(req, res, SESSION_COOKIE_NAME),
		getCookie<string>(req, res, CSRF_COOKIE_NAME),
	]);
	if (!csrf || !sessionCookie) {
		return res.status(401).json({ detail: 'Unauthorized' });
	}

	const shortLink: string = req.body.shortLink;
	const destination: string = req.body.destination;
	const title: string = req.body.title;
	if (!shortLink || !destination || !title) {
		return res.status(400).json({ detail: 'Bad Request' });
	}
	const firebaseAdmin = initializeFirebaseAdmin();

	try {
		const [decoded, csrfSecret] = await Promise.all([
			admin.auth(firebaseAdmin).verifySessionCookie(sessionCookie, true),
			getCsrfSecrets(sessionCookie),
		]);
		if (!(await verifyCsrfToken(csrfSecret, csrf))) {
			throw new Error('Unauthorized');
		}

		await shortenLink(shortLink, destination, title, decoded.uid);
		return res.status(201).json({ detail: 'Created' });
	} catch {
		return res.status(401).json({ detail: 'Unauthorized' });
	}
};

export default handler;
