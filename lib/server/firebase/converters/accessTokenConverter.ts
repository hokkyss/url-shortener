import * as admin from 'firebase-admin';

export const accessTokenConverter: admin.firestore.FirestoreDataConverter<AccessToken> =
	{
		fromFirestore(snapshot) {
			const data = snapshot.data();

			return {
				customToken: data.customToken,
				used: data.used,
			};
		},
		toFirestore(modelObject) {
			return {
				customToken: modelObject.used ? '' : modelObject.customToken,
				used: modelObject.used,
			};
		},
	};
