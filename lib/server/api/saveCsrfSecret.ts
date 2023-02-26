import * as admin from 'firebase-admin';

import { initializeFirebaseAdmin } from '~/lib/server/firebase';

export const saveCsrfSecrets = async (
	secret: string,
	sessionCookie: string
) => {
	const firebaseAdmin = initializeFirebaseAdmin();

	await admin
		.firestore(firebaseAdmin)
		.collection('csrfSecrets')
		.doc(sessionCookie)
		.set({
			value: secret,
		})
		.catch(() => '');
};
