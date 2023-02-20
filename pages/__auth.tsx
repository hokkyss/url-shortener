import * as React from 'react';
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import dynamic from 'next/dynamic';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';

import initializeFirebaseClient from '~/utils/common/firebase/firebaseClient';
import accessTokenConverter from '~/utils/common/firebase/converters/accessTokenConverter';

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
				permanent: false,
			},
		};
	}

	const firebaseApp = initializeFirebaseClient();
	const firestore = getFirestore(firebaseApp);
	const auth = getAuth(firebaseApp);

	if (auth.currentUser) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const documentRef = doc(firestore, 'accessTokens', accessToken).withConverter(
		accessTokenConverter
	);

	try {
		const accessTokenSnapshot = await getDoc(documentRef);

		if (!accessTokenSnapshot.exists() || accessTokenSnapshot.data().used) {
			throw new Error('Not Found');
		}

		const customToken = accessTokenSnapshot.data().customToken;
		await signInWithCustomToken(auth, customToken);
		await setDoc(documentRef, { used: true }, { merge: true });
	} catch {}

	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	};
};

export default LoginHandler;
