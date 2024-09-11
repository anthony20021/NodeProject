import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken"
import { APIResponse } from "../utils/response";
import { hashPassword, verifyPassword } from "../utils/pass";
const { JWT_SECRET } = env;
import Models from '../models/index';
import { z } from "zod";


export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies.token;
    if (!token)
        return APIResponse(response, null, "Vous n'êtes pas authentifié", 401);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        response.locals.user = decoded;
        next();
    } catch (error) {
        return APIResponse(response, null, "Vous n'êtes pas authentifié", 401);
    }
}
