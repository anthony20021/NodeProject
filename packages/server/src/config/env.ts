import { IEnv } from "../types/env";
import dotenv from "dotenv";

dotenv.config();

export const env: IEnv = {
    PORT: parseInt(process.env.PORT || "3000"),
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
    JWT_SECRET: process.env.JWT_SECRET || "¡SecretSecret!",
    ORIGIN: process.env.ORIGIN || "http://localhost:5173",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/nodeProject"
};