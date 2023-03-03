import type { AppType } from 'next/app';
import {
	FirebaseAppProvider,
	FirestoreProvider,
	StorageProvider,
} from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import * as React from 'react';
import { getStorage } from 'firebase/storage';
import dynamic from 'next/dynamic';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/public-sans';
import '~/styles/globals.css';

import { initializeFirebaseClient } from '~/lib/common/firebase';
import { setConfig } from 'next-firebase-session-auth';
import { CSRF_COOKIE_NAME, SESSION_COOKIE_NAME } from '~/lib/common/constants';

const CustomPerformanceProvider = dynamic(
	() => import('~/contexts/PerformanceProvider')
);
const CustomAnalyticsProvider = dynamic(
	() => import('~/contexts/AnalyticsProvider')
);
const CustomAuthProvider = dynamic(() => import('~/contexts/AuthProvider'));

setConfig({
	csrfCookieName: CSRF_COOKIE_NAME,
	csrfSecretCollectionName: 'csrfSecrets',
	maxAge: 14 * 24 * 60 * 60 * 1000,
	sessionCookieName: SESSION_COOKIE_NAME,
});

const MyApp: AppType = function MyApp({ Component, pageProps }) {
	const firebaseApp = React.useMemo(initializeFirebaseClient, []);

	return (
		<FirebaseAppProvider firebaseApp={firebaseApp}>
			<CustomAuthProvider>
				<StorageProvider sdk={getStorage(firebaseApp)}>
					<FirestoreProvider sdk={getFirestore(firebaseApp)}>
						<CustomAnalyticsProvider>
							<CustomPerformanceProvider>
								<Component {...pageProps} />
							</CustomPerformanceProvider>
						</CustomAnalyticsProvider>
					</FirestoreProvider>
				</StorageProvider>
			</CustomAuthProvider>
		</FirebaseAppProvider>
	);
};

export default MyApp;
