import * as React from 'react';
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';

import { signIn } from '~/lib/server/api';
import { setCookie } from '~/lib/server/cookies';
import { CSRF_COOKIE_NAME, SESSION_COOKIE_NAME } from '~/lib/common/constants';

const Box = dynamic(() => import('@mui/material/Box'));

const LoginHandler: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			width="100vw"
			height="100vh"
			aria-busy="true"
		>
			<CircularProgress />
		</Box>
	);
};

export const getServerSideProps: GetServerSideProps = async function (ctx) {
	const accessToken = ctx.query.accessToken;
	if (typeof accessToken !== 'string') {
		return {
			redirect: {
				destination: '/',
				permanent: true,
			},
		};
	}

	const signInResponse = await signIn(accessToken);
	if (typeof signInResponse.detail !== 'string') {
		await Promise.all([
			setCookie(
				ctx.req,
				ctx.res,
				SESSION_COOKIE_NAME,
				signInResponse.detail.sessionCookie
			),
			setCookie(
				ctx.req,
				ctx.res,
				CSRF_COOKIE_NAME,
				signInResponse.detail.csrfToken
			),
		]);
	}

	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	};
};

export default LoginHandler;
