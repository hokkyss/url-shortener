import { NextApiHandler } from 'next';

import { serverSideSignOut } from 'next-firebase-session-auth';

const handler: NextApiHandler = async function (req, res) {
	await serverSideSignOut(req, res);

	return res.status(204).end();
};

export default handler;
