import * as React from 'react';
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';
import { serverSideSignIn } from 'next-firebase-session-auth';
import { signInWithCustomToken } from 'firebase/auth';

import { getCustomToken } from '~/lib/common/api';
import { initializeFirebaseAdmin } from '~/lib/server/firebase';
import { initializeFirebaseClient } from '~/lib/common/firebase';

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

	const customToken = await getCustomToken(accessToken);
	await serverSideSignIn(
		ctx.req,
		ctx.res,
		(auth) => signInWithCustomToken(auth, customToken),
		initializeFirebaseAdmin(),
		initializeFirebaseClient()
	);

	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	};
};

export default LoginHandler;
