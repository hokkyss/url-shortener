import * as React from 'react';
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useAuth } from 'reactfire';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';

import initializeFirebaseClient from '~/utils/common/firebaseClient';

const Box = dynamic(() => import('@mui/material/Box'));

const LoginHandler: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ customToken }) => {
	const auth = useAuth();

	React.useEffect(() => {
		if (auth.currentUser) {
			Router.replace('/');
			return;
		}

		signInWithCustomToken(auth, customToken);
	}, [auth, customToken]);

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

export const getServerSideProps: GetServerSideProps<{
	customToken: string;
}> = async function (ctx) {
	const customToken = ctx.query.token;
	const firebaseApp = initializeFirebaseClient();
	const auth = getAuth(firebaseApp);

	if (typeof customToken !== 'string') {
		return {
			redirect: '/',
			notFound: true,
		};
	}

	if (!auth.currentUser) {
		await signInWithCustomToken(auth, customToken);
	}

	return {
		props: {
			customToken: customToken,
		},
	};
};

export default LoginHandler;
