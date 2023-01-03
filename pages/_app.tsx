import type { AppProps } from 'next/app';
import {
	AuthProvider,
	FirebaseAppProvider,
	FirestoreProvider,
	StorageProvider,
} from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import dynamic from 'next/dynamic';

import '~/styles/globals.css';

const CustomPerformanceProvider = dynamic(
	() => import('~/contexts/PerformanceProvider')
);
import initializeFirebaseClient from '~/utils/common/firebaseClient';
import CustomAnalyticsProvider from '~/contexts/AnalyticsProvider';

function MyApp({ Component, pageProps }: AppProps) {
	const firebaseApp = useMemo(initializeFirebaseClient, []);

	return (
		<FirebaseAppProvider firebaseApp={firebaseApp}>
			<AuthProvider sdk={getAuth()}>
				<StorageProvider sdk={getStorage()}>
					<FirestoreProvider sdk={getFirestore()}>
						<CustomAnalyticsProvider>
							<CustomPerformanceProvider>
								<Component {...pageProps} />
							</CustomPerformanceProvider>
						</CustomAnalyticsProvider>
					</FirestoreProvider>
				</StorageProvider>
			</AuthProvider>
		</FirebaseAppProvider>
	);
}

export default MyApp;
