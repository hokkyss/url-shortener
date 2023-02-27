import Cookies from 'cookies';
import { IncomingMessage, ServerResponse } from 'http';

import { COOKIE_MAX_AGE_MILLIS } from '~/lib/common/constants';

export const getCookie = async <T>(
	req: IncomingMessage,
	res: ServerResponse,
	name: string
) => {
	const cookie = new Cookies(req, res);
	const value = cookie.get(name);
	return value
		? (JSON.parse(Buffer.from(value, 'base64').toString('utf-8')) as T)
		: undefined;
};

export const setCookie = async <T>(
	req: IncomingMessage,
	res: ServerResponse,
	name: string,
	value: T
) => {
	const cookie = new Cookies(req, res);
	const val =
		value == null
			? undefined
			: Buffer.from(JSON.stringify(value)).toString('base64');

	cookie.set(name, val, {
		path: '/',
		maxAge: COOKIE_MAX_AGE_MILLIS,
		overwrite: true,
		httpOnly: true,
		sameSite: 'strict',
	});
};

export const deleteCookie = (
	req: IncomingMessage,
	res: ServerResponse,
	name: string
) => setCookie(req, res, name, null);
