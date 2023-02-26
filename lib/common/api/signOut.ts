import axios from 'axios';

export const signOut = async () =>
	axios
		.post('/api/logout', {}, {})
		.then(() => '')
		.catch(() => '');
