import { NextApiHandler } from 'next';
import { verifySession } from 'next-firebase-session-auth';

import { initializeFirebaseAdmin } from '~/lib/server/firebase';
import { shortenLink } from '~/lib/server/api';

const handler: NextApiHandler<{ detail: string }> = async function (req, res) {
	if (req.method !== 'POST') {
		return res.redirect('/api/not-found');
	}

	const firebaseAdmin = initializeFirebaseAdmin();
	const userSession = await verifySession(req, res, firebaseAdmin);
	if (!userSession.isSignedIn) {
		return res.status(401).json({ detail: 'Unauthorized!' });
	}

	const shortLink: string = req.body.shortLink;
	const destination: string = req.body.destination;
	const title: string = req.body.title;
	if (!shortLink || !destination || !title) {
		return res.status(400).json({ detail: 'Bad Request' });
	}

	try {
		await shortenLink(shortLink, destination, title, userSession.user.uid);
		return res.status(201).json({ detail: 'Created' });
	} catch {
		return res.status(401).json({ detail: 'Unauthorized' });
	}
};

export default handler;
