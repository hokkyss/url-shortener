import axios from 'axios';

export const shortenLink = async (
	shortLink: string,
	destination: string,
	title: string
) =>
	axios
		.post(
			'/api/link',
			{
				shortLink: shortLink,
				destination: destination,
				title: title,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		.then(() => '')
		.catch(() => '');
