import type { AppProps } from 'next/app';
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

const CustomPerformanceProvider = dynamic(
	() => import('~/contexts/PerformanceProvider')
);
const CustomAnalyticsProvider = dynamic(
	() => import('~/contexts/AnalyticsProvider')
);
const CustomAuthProvider = dynamic(() => import('~/contexts/AuthProvider'));

function MyApp({ Component, pageProps }: AppProps) {
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
}

export default MyApp;
