import * as React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useAuth } from 'reactfire';
import { signInWithCustomToken } from 'firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';

const Box = dynamic(() => import('@mui/material/Box'));

const LoginHandler: NextPage = () => {
	const auth = useAuth();

	React.useEffect(() => {
		const token = Router.query.token;

		if (auth.currentUser || typeof token !== 'string') {
			Router.replace('/');
			return;
		}

		signInWithCustomToken(auth, token);
	}, [auth]);

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

export default LoginHandler;
