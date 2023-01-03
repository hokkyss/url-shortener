import type { NextApiHandler } from 'next';
// import initializeFirebaseClient from '~/utils/common/firebaseClient';

// initializeFirebaseClient();

const handler: NextApiHandler = async function handler(_req, res) {
	res.status(404).json({ detail: 'Not found.' });
};

export default handler;
