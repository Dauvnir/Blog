interface ImportMetaEnv {
	readonly PUBLIC_WP_URL: string;
	readonly SECRET_WP_USER: string;
	readonly SECRET_WP_PASSWORD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
