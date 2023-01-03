import { NextApiHandler } from 'next';
import initializeFirebaseClient from '~/utils/common/firebaseClient';

initializeFirebaseClient();

const handler: NextApiHandler = async function handler(_req, res) {
	// eslint-disable-next-line no-console
	res.status(200).json({ detail: 'OK!!!' });
};

export default handler;
