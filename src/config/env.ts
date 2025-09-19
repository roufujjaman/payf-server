interface EnvConfig {
	PORT: string;
	DB_URL: string;
	DB_URL_LOCAL: string;
	NODE_ENV: "development" | "production";
}

const loadEnvVariables = (): EnvConfig => {
	const requiredEnvVariables: string[] = [
		"PORT",
		"DB_URL",
		"DB_URL_LOCAL",
		"NODE_ENV",
	];

	requiredEnvVariables.forEach((key) => {
		if (!process.env[key]) {
			throw new Error(`❌ Missing required environment variable : ${key}`);
		}
	});

	return {
		PORT: process.env.PORT as string,
		DB_URL: process.env.DB_URL as string,
		DB_URL_LOCAL: process.env.DB_URL_LOCAL as string,
		NODE_ENV: process.env.NODE_ENV as "development" | "production",
	};
};

export const envVars: EnvConfig = loadEnvVariables();
