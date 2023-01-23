import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export default {
	fromFirestore(snapshot, options) {
		const data = snapshot.data(options);
		return {
			clicks: data.clicks,
			createdAt: (data.createdAt as Timestamp).toDate(),
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
				? Timestamp.fromDate(modelObject.createdAt as Date)
				: Timestamp.now(),
			from: modelObject.from,
			title: modelObject.title,
			to: modelObject.to ? (modelObject.to as URL).toString() : '',
			uid: modelObject.uid,
		};
	},
} as FirestoreDataConverter<ShortenedLink>;
