import Tokens from 'csrf';

export const getSecret = async () => await new Tokens().secret();

export const createCsrfToken = async (secret: string) =>
	new Tokens().create(secret);

export const verifyCsrfToken = async (secret: string, token: string) =>
	new Tokens().verify(secret, token);
