import * as React from 'react';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import Router from 'next/router';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

const InputAdornment = dynamic(() => import('@mui/material/InputAdornment'));
const TextField = dynamic(() => import('@mui/material/TextField'));
const Button = dynamic(() => import('@mui/material/Button'));
const Typography = dynamic(() => import('@mui/material/Typography'));
const Container = dynamic(() => import('@mui/material/Container'));
const Box = dynamic(() => import('@mui/material/Box'));

import styles from '~/styles/Home.module.css';

import { shortenLink, signOut } from '~/lib/common/api';
import { initializeFirebaseAdmin } from '~/lib/server/firebase';
import { withServerSideUser } from 'next-firebase-session-auth';

const Home: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ isSignedIn, user, host }) => {
	const [signingOut, setSigningOut] = React.useState(false);
	const [destination, setDestination] = React.useState('');
	const [shortLink, setShortLink] = React.useState('');
	const [title, setTitle] = React.useState('');
	const [alertProps, setAlertProps] = React.useState<{
		severity: AlertProps['severity'];
		text: string;
	}>({ severity: 'success', text: '' });

	const onSignOut: React.MouseEventHandler<HTMLButtonElement> =
		React.useCallback(() => {
			setSigningOut(true);
			signOut().finally(() => {
				setSigningOut(false);
				Router.replace(Router.asPath);
			});
		}, []);

	const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
		async (e) => {
			e.preventDefault();
			try {
				new URL(destination);
				await Promise.all([
					shortenLink(shortLink, destination, title),
					navigator.clipboard.writeText(`${location.origin}/${shortLink}`),
				]);
				setDestination('');
				setShortLink('');
				setTitle('');
				setAlertProps({
					severity: 'success',
					text: 'Link created and copied to clipboard!',
				});
			} catch (e) {
				if (e instanceof TypeError) {
					setAlertProps({
						severity: 'error',
						text: 'Invalid URL!',
					});
				} else {
					setAlertProps({
						severity: 'error',
						text: 'Something went wrong.',
					});
				}
			}
		},
		[destination, shortLink, title]
	);

	return (
		<React.Fragment>
			<Head>
				<title>Link Shortener</title>
			</Head>
			<Snackbar
				open={!!alertProps.text}
				autoHideDuration={2000}
				onClose={() => setAlertProps({ ...alertProps, text: '' })}
			>
				<Alert
					onClose={() => setAlertProps({ ...alertProps, text: '' })}
					severity={alertProps.severity}
					sx={{ width: '100%' }}
				>
					{alertProps.text}
				</Alert>
			</Snackbar>
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
				{isSignedIn ? (
					<React.Fragment>
						<Typography textAlign="center" sx={{ marginY: 2 }}>
							Signed in as {user.email}
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
			{isSignedIn && (
				<Box
					sx={{
						backgroundColor: 'black',
						width: '100%',
					}}
					paddingX={30}
					paddingY={20}
				>
					<form className={styles.form} onSubmit={onSubmit}>
						<TextField
							required
							label="Destination"
							variant="filled"
							color="primary"
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							sx={{
								backgroundColor: 'Background',
								borderRadius: 1,
								width: '100%',
								marginY: 1,
							}}
							placeholder="https://google.com"
						/>
						<TextField
							required
							label="Short Link"
							variant="filled"
							color="primary"
							sx={{
								backgroundColor: 'Background',
								borderRadius: 1,
								width: '100%',
								marginY: 1,
							}}
							value={shortLink}
							onChange={(e) => setShortLink(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">{host}/</InputAdornment>
								),
							}}
						/>
						<TextField
							required
							label="Title"
							variant="filled"
							color="primary"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							sx={{
								backgroundColor: 'Background',
								borderRadius: 1,
								width: '100%',
								marginY: 1,
							}}
							placeholder="Google"
						/>
						<Button
							type="submit"
							variant="outlined"
							sx={{
								backgroundColor: 'Background',
								marginY: 1,
							}}
						>
							Shorten!
						</Button>
					</form>
				</Box>
			)}
		</React.Fragment>
	);
};

export const getServerSideProps = withServerSideUser<{ host: string }>(
	async function (ctx) {
		return {
			props: {
				host: ctx.req.headers.host || '',
			},
		};
	},
	initializeFirebaseAdmin()
);

export default Home;
