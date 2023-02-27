import axios from 'axios';

export const signOut = async () =>
	axios
		.post(
			'/api/logout',
			{},
			{
				baseURL: process.env.NEXT_PUBLIC_BASE_URL,
			}
		)
		.then(() => '')
		.catch(() => '');
