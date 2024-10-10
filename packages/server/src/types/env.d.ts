export interface IEnv {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    JWT_SECRET: string;
    ACCESS_TOKEN_SECRET: string
    REFRESH_JWT_SECRET: string;
    JWT_EXPIRATION_SECRET: string;
    REFRESH_JWT_EXPIRATION_SECRET: string;
    ORIGIN: string;
    DATABASE_URL: string;
}