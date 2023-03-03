import axios from 'axios';

export const signOut = async () => {
	await axios.post('/api/signOut');
};
