import * as admin from 'firebase-admin';
import {
	initializeFirebaseAdmin,
	shortenedLinkConverter,
} from '~/lib/server/firebase';

export const shortenLink = async (
	shortLink: string,
	destination: string,
	title: string,
	uid: string
) => {
	const firebaseAdmin = initializeFirebaseAdmin();
	await admin
		.firestore(firebaseAdmin)
		.collection('shortenedLinks')
		.doc()
		.withConverter(shortenedLinkConverter)
		.set({
			clicks: 0,
			createdAt: new Date(),
			from: shortLink,
			to: new URL(destination),
			uid: uid,
			title: title,
		})
		.catch(() => '');
};
