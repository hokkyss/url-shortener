import type { NextApiHandler } from 'next';

const handler: NextApiHandler = function (_req, res) {
	res.status(404).json({ detail: 'Not found.' });
};

export default handler;
