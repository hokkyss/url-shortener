import { NextApiHandler } from 'next';

import { CSRF_COOKIE_NAME, SESSION_COOKIE_NAME } from '~/lib/common/constants';
import { deleteCookie } from '~/lib/server/cookies';

const handler: NextApiHandler = async function (req, res) {
	deleteCookie(req, res, SESSION_COOKIE_NAME);
	deleteCookie(req, res, CSRF_COOKIE_NAME);
	return res.status(204).json({});
};

export default handler;
