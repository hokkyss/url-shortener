import * as React from 'react';
import type { NextPage } from 'next';

import Router from 'next/router';
import { useAuth } from 'reactfire';
import { signInWithCustomToken } from 'firebase/auth';

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
		<React.Fragment>
			<div></div>
		</React.Fragment>
	);
};

export default LoginHandler;
