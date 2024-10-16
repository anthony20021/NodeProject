import Model from "../models/index";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { hashPassword, verifyPassword, logger, APIResponse } from "../utils";
import { env } from "../config/env";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

const { JWT_SECRET, NODE_ENV } = env;

export const getUsers = async (response: Response) => {
    try {
        logger.info("[GET] /users - Récupère la liste de tous les utilisateurs");

        const users = await Model.users.get();

        APIResponse(response, users, "All users", 200);
    } catch (error : any) {
        logger.error(`Erreur lors de la récupération de la liste de tous les utilisateurs: ${error.message}`);
        APIResponse(response, error, "error", 500);
    }
}

export const getUsersById = async (request: Request, response: Response) => {
    try {
        logger.info(`[GET] - Récupération d'un utilisateur par ID`);

        const id = request.params.id;
        const user = await Model.users.where(id);
    
        if (user){
            logger.info("Utilisateur trouvé");
            APIResponse(response, user, "User found", 200);
        }
    
        else{
            logger.warn("Utilisateur non trouvé");
            APIResponse(response, null, "User not found", 404);
        }

    } catch (error : any) {
        logger.error("Erreur lors de la récupération de l'utilisateur: ${error.message}");
        APIResponse(response, error, "error", 500);
    }
}

//S'enregsitrer
export const createAUser = async (request: Request, response: Response) => {
    try {
        logger.info("[POST] /users - Création d'un nouvel utilisateur");

        const { email, password, name, firstname } = request.body;
        const emailExist = await Model.users.find( email );

        if(emailExist != null){
            logger.warn(`Un compte existe déjà avec cet e-mail: ${email}`);
            return APIResponse(response, null, "Email already exist", 409);
        }

        const hashedPassword = await hashPassword(password);

        if(!hashedPassword){
            throw new Error("Erreur lors du hashage du mot de passe");
        }

        const newUser = await Model.users.create({name, firstname, email, password : hashedPassword, role: "user"  });

        if(!newUser){
            throw new Error("Erreur lors de la création du compte");
        }

        logger.info("Utilisateur créé");

        return APIResponse(response, newUser, "User created", 201);
    }
    catch (error : any) {
        logger.error(`Erreur lors de la création de l'utilisateur: ${error.message}`);

        APIResponse(response, error, "error", 400);
    }
}

export const login = async (req : Request, res : Response) => {
    try {
        logger.info("[POST] /login - Tentative de connexion");

        const { email, password } = req.body;
        const user = await Model.users.find( email );

        if(!user){
            logger.warn("Échec de connexion: email incorrect");

            return APIResponse(res, null, "Email or password incorrect", 401);
        }

        if(await verifyPassword(password, user.password) === false){
            logger.warn("Échec de connexion : mot de passe incorrect");

            return APIResponse(res, null, "Mot de passe incorrect", 401);
        }

        const accessToken = generateAccessToken(user.role, user.id);
        const refreshToken = generateRefreshToken(user.id); 


        res.cookie("accessToken", accessToken, { 
            httpOnly: true,
            sameSite: 'strict',
            secure: NODE_ENV === "production",
         });

         res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', secure: NODE_ENV === "production" });

         await Model.users.update( {id: user.id, refreshToken} );

         logger.info("Utilisateur connecté");

        return APIResponse(res, user, "Logged in", 200);
    } catch (error: any) {
        logger.error(`Erreur lors de la connexion: ${error.message}`);

        return APIResponse(res, error, "error", 500);
    }
}

export const logout = async (req : Request, res : Response) => {
    try {
        logger.info("[POST] /logout - Utilisateur déconnecté");

        res.clearCookie("token");
        return APIResponse(res, null, "Logged out", 200);
    } catch (error: any) {
        logger.error(`Erreur lors de la déconnexion: ${error.message}`);

        return APIResponse(res, error, "error", 500);
    }
}

export const deleteUserById = async (request: Request, response: Response) => {
    try {
        logger.info(`[DELETE]- Suppression de l'utilisateur`);
        
        const id = request.params.id;
        
        await Model.users.delete(id);
        
        logger.info("Utilisateur supprimé");

        APIResponse(response, null, "User deleted", 204);
    } catch (error : any) {
        logger.error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${request.params.id}: ${error.message}`);

        APIResponse(response, error, "error", 500);
    }
}

export const updateUser = async (request: Request, response: Response) => {
    try {
        logger.info(`[PUT] - Mise à jour de l'utilisateur`);

        const id = request.params.id;
        const user = request.body;
    
        await Model.users.update({...user, id});
        
        logger.info("Utilisateur mis à jour");

        APIResponse(response, user, "User updated", 200);
    } catch (error : any) {
        logger.error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);

        APIResponse(response, error, "error", 500);
    }
}