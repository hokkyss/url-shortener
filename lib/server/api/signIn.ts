import axios from 'axios';

import { LoginApiResponse } from '~/pages/api/login';

export const signIn = async (accessToken: string) =>
	await axios
		.post<LoginApiResponse>(
			'/api/login',
			{
				accessToken: accessToken,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
				baseURL: process.env.NEXT_PUBLIC_BASE_URL,
				validateStatus: () => true,
			}
		)
		.then((resp) => resp.data)
		.catch(() => ({ detail: '' } as LoginApiResponse));
