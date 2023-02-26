import axios from 'axios';

export const signIn = async (accessToken: string) =>
	await axios.post(
		'/api/login',
		{
			accessToken: accessToken,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
