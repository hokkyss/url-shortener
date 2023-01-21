import type { AppProps } from 'next/app';
import {
	FirebaseAppProvider,
	FirestoreProvider,
	StorageProvider,
} from 'reactfire';
import { getFirestore } from 'firebase/firestore';
import { useMemo } from 'react';
import { getStorage } from 'firebase/storage';
import dynamic from 'next/dynamic';

import '~/styles/globals.css';

const CustomPerformanceProvider = dynamic(
	() => import('~/contexts/PerformanceProvider')
);
const CustomAnalyticsProvider = dynamic(
	() => import('~/contexts/AnalyticsProvider')
);
const CustomAuthProvider = dynamic(() => import('~/contexts/AuthProvider'));
import initializeFirebaseClient from '~/utils/common/firebaseClient';

function MyApp({ Component, pageProps }: AppProps) {
	const firebaseApp = useMemo(initializeFirebaseClient, []);

	return (
		<FirebaseAppProvider firebaseApp={firebaseApp}>
			<CustomAuthProvider>
				<StorageProvider sdk={getStorage()}>
					<FirestoreProvider sdk={getFirestore()}>
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
