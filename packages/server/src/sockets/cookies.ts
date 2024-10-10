import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { parse } from "cookie";

import { env } from "../config/env";

const { ACCESS_TOKEN_SECRET } = env;

export function authenticateSocket(socket: Socket): string | null {
    const cookies = socket.handshake.headers.cookie; // On récupère les cookies via le handshake du socket
    if (!cookies) {
        // On envoit une erreur au client: il n'y a pas de cookies
        socket.emit('error', 'Vous n\'êtes pas authentifié');
        return null;
    }

    const parsedCookies = parse(cookies);
    const { accessToken } = parsedCookies;
    if (!accessToken) {
        // On envoit une erreur au client: il n'y a pas d'accessToken dans les cookies
        socket.emit('error', 'Vous n\'êtes pas authentifié');
        return null;
    }

    try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as jwt.JwtPayload; // Et comme pour les autres mw, on vérifie, et on décode le token avec la clé secrète
        // v si on arrive en dessous, ca veut dire que l'accesstoken est valide
        return decoded.userId; // On retourne l'ID de l'utilisateur
    } catch (error) {
        // ... sinon, le token n'est pas valide on va retourner une error
        socket.emit('error', 'Vous n\'êtes pas authentifié');
        return null;
    }
}