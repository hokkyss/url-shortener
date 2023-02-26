import type { NextApiHandler } from 'next';
import { initializeFirebaseAdmin } from '~/lib/server/firebase';

initializeFirebaseAdmin();

const handler: NextApiHandler = function (_req, res) {
	res.status(404).json({ detail: 'Not found.' });
};

export default handler;
