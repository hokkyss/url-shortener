import * as admin from 'firebase-admin';

export const shortenedLinkConverter: admin.firestore.FirestoreDataConverter<ShortenedLink> =
	{
		fromFirestore(snapshot) {
			const data = snapshot.data();
			return {
				clicks: data.clicks,
				createdAt: (data.createdAt as admin.firestore.Timestamp).toDate(),
				from: data.from,
				title: data.title,
				to: new URL(data.to),
				uid: data.uid,
			};
		},
		toFirestore(modelObject) {
			return {
				clicks: modelObject.clicks,
				createdAt: modelObject.createdAt
					? admin.firestore.Timestamp.fromDate(modelObject.createdAt as Date)
					: admin.firestore.Timestamp.now(),
				from: modelObject.from,
				title: modelObject.title,
				to: modelObject.to ? (modelObject.to as URL).toString() : '',
				uid: modelObject.uid,
			};
		},
	};
