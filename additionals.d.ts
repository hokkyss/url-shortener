declare namespace NodeJS {
	declare interface ProcessEnv {
		readonly NEXT_PUBLIC_BASE_URL: string;
	}
}

declare interface ShortenedLink {
	clicks: number;
	createdAt: Date;
	from: string;
	title: string;
	to: URL;
	uid: string;
}

declare interface AccessToken {
	customToken: string;
	used: boolean;
}

declare interface User {
	uid: string;
	email: string;
}
