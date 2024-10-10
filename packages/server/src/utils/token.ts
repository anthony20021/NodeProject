import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { logger } from "./logger";

const { JWT_SECRET, REFRESH_JWT_SECRET, JWT_EXPIRATION_SECRET, REFRESH_JWT_EXPIRATION_SECRET} = env;

export const generateAccessToken = (role: string, userId: string): string => {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_SECRET });
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, REFRESH_JWT_SECRET, { expiresIn: REFRESH_JWT_EXPIRATION_SECRET });
};

export const verifyRefreshToken = (refreshToken: string): string | null => {
    try {
        const decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET) as { userId: string };
        return decoded.userId;
    } catch (err) {
        logger.error("Invalide Refresh Token:" + err);
        return null;
    }
};