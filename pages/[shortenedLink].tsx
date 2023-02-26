import * as React from 'react';
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import * as admin from 'firebase-admin';

import {
	initializeFirebaseAdmin,
	shortenedLinkConverter,
} from '~/lib/server/firebase';

const RedirectLink: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
	return <React.Fragment></React.Fragment>;
};

export const getServerSideProps: GetServerSideProps = async function (ctx) {
	const { shortenedLink } = ctx.query;

	if (typeof shortenedLink !== 'string') {
		return {
			notFound: true,
		};
	}

	const app = initializeFirebaseAdmin();
	const db = admin.firestore(app);
	const linkDetailDocs = db
		.collection('shortenedLinks')
		.where('from', '==', shortenedLink)
		.withConverter(shortenedLinkConverter);

	const linkDetails = await linkDetailDocs.get();
	if (linkDetails.docs.length !== 1) {
		return {
			notFound: true,
		};
	}

	const link = linkDetails.docs[0];
	await db
		.collection('shortenedLinks')
		.doc(link.id)
		.withConverter(shortenedLinkConverter)
		.set(
			{
				...link.data(),
				clicks:
					typeof link.data().clicks === 'number' ? link.data().clicks + 1 : 0,
			},
			{ merge: true }
		);

	return {
		redirect: {
			destination: link.data().to.toString(),
		},
		props: {},
	};
};
export default RedirectLink;
