import { IEnv } from "../types/env";
import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

export const env: IEnv = {
    PORT: parseInt(process.env.PORT || "3000"),
    NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
    JWT_SECRET: process.env.JWT_SECRET || "¡SecretSecret!",
    ACCESS_TOKEN_SECRET: process.env.JWT_SECRET || "¡SecretSecret!",
    REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET || "¡refreshRefresh!",
    JWT_EXPIRATION_SECRET: process.env.JWT_EXPIRATION_SECRET || "30m",
    REFRESH_JWT_EXPIRATION_SECRET: process.env.REFRESH_JWT_EXPIRATION_SECRET || "1d",
    ORIGIN: process.env.ORIGIN || "http://localhost:5173",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/nodeProject"
};