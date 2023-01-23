import type { NextApiHandler } from 'next';
import initializeFirebaseAdmin from '~/utils/server/firebase/initializeAdmin';

initializeFirebaseAdmin();

const handler: NextApiHandler = async function handler(_req, res) {
	res.status(404).json({ detail: 'Not found.' });
};

export default handler;
