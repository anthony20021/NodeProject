import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { APIResponse, verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../utils";
import Model from "../models/index";
import { User } from "../entities/User";

const { JWT_SECRET, NODE_ENV } = env;

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    // Si l'un des tokens est manquant, on nettoie les cookies et on passe au middleware suivant
    if (!accessToken || !refreshToken) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return next();
    }

    try {
        // Vérifier la validité de l'accessToken
        jwt.verify(accessToken, JWT_SECRET);
        return next();
    } catch (err) {
        // L'accessToken est invalide, on vérifie le refreshToken
        const userId = verifyRefreshToken(refreshToken);
        if (!userId) {
            // Le refreshToken est invalide
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return APIResponse(res, null, "Session expirée", 401);
        }

        // Vérifier l'utilisateur et son refreshToken
        const user = await Model.users.where(userId, true) as User;
        if (!user || user.refreshToken !== refreshToken) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return APIResponse(res, null, "Session invalide", 401);
        }

        // Générer de nouveaux tokens
        const newAccessToken = generateAccessToken(user.role, userId);
        const newRefreshToken = generateRefreshToken(userId);

        // Mettre à jour le refreshToken en base de données
        await Model.users.update({ id: userId, refreshToken: newRefreshToken });

        // Définir les nouveaux cookies
        const cookieOptions = { httpOnly: true, secure: NODE_ENV === "production" };
        res.cookie("accessToken", newAccessToken, cookieOptions);
        res.cookie("refreshToken", newRefreshToken, cookieOptions);

        next();
    }
};