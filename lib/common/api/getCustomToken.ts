import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

import {
	accessTokenConverter,
	initializeFirebaseClient,
} from '~/lib/common/firebase';

export const getCustomToken = async (accessToken: string) => {
	const firebaseApp = initializeFirebaseClient();
	const firestore = getFirestore(firebaseApp);

	const documentRef = doc(firestore, 'accessTokens', accessToken).withConverter(
		accessTokenConverter
	);
	const accessTokenSnapshot = await getDoc(documentRef);
	const data = accessTokenSnapshot.data();

	if (!accessTokenSnapshot.exists() || data?.used || !data?.customToken) {
		return '';
	}

	await setDoc(documentRef, { used: true }, { merge: true });
	return data.customToken;
};
