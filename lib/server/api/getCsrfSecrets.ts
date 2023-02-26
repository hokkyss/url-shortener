import * as admin from 'firebase-admin';

import { initializeFirebaseAdmin } from '~/lib/server/firebase';

export const getCsrfSecrets = async (sessionCookie: string) => {
	const firebaseAdmin = initializeFirebaseAdmin();

	const snapshot = await admin
		.firestore(firebaseAdmin)
		.collection('csrfSecrets')
		.doc(sessionCookie)
		.get();

	if (!snapshot.exists || !snapshot.data()) {
		return '';
	}

	return (snapshot.data()?.value as string) || '';
};
