import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useAuth } from 'reactfire';
import { signOut } from 'firebase/auth';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';

const Button = dynamic(() => import('@mui/material/Button'));
const NextLink = dynamic(() => import('next/link'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Container = dynamic(() => import('@mui/material/Container'));
const Box = dynamic(() => import('@mui/material/Box'));

const Home: NextPage = () => {
	const auth = useAuth();
	const [signingOut, setSigningOut] = React.useState(false);

	const onSignOut: React.MouseEventHandler<HTMLButtonElement> =
		React.useCallback(
			(e) => {
				setSigningOut(true);
				signOut(auth).finally(() => {
					setSigningOut(false);
				});
			},
			[auth]
		);

	return (
		<React.Fragment>
			<Head>
				<title>Link Shortener</title>
			</Head>
			<Container
				sx={{
					height: '100vh',
					justifyContent: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Typography textAlign="center" variant="h2">
					Link Shortener
				</Typography>
				<Typography textAlign="center" variant="h3">
					by hokkyss
				</Typography>
				{auth.currentUser ? (
					<React.Fragment>
						<Typography textAlign="center" sx={{ marginY: 2 }}>
							Signed in as {auth.currentUser.email}
						</Typography>
						<Button
							sx={{ marginX: 'auto', display: 'flex' }}
							variant="outlined"
							onClick={onSignOut}
							endIcon={
								signingOut && (
									<CircularProgress size={20} sx={{ display: 'inline-flex' }} />
								)
							}
							disabled={signingOut}
						>
							Sign Out
						</Button>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography textAlign="center" sx={{ marginY: 2 }}>
							<Link
								component={NextLink}
								passHref
								href="https://sso.hokkyss.com/signin?next=linkShortener"
								underline="hover"
								target="_self"
							>
								Sign in
							</Link>{' '}
							to use Link Shortener!
						</Typography>
					</React.Fragment>
				)}
			</Container>
			<Box
				sx={{
					backgroundColor: 'black',
					height: 400,
					width: '100%',
				}}
			></Box>
			<Container></Container>
		</React.Fragment>
	);
};

export default Home;
