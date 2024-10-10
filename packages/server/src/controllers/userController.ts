import Model from "../models/index";
import jwt from "jsonwebtoken";
import middlewares from "../middlewares";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { APIResponse } from "../utils/response";
import { hashPassword, verifyPassword } from "../utils/pass";
import { env } from "../config/env";

const { JWT_SECRET, NODE_ENV } = env;

export const getUsers = async (response: Response) => {
    try {
        const users = await Model.users.get();
        APIResponse(response, users, "All users", 200);
    } catch (error : any) {
        logger.error(`Erreur lors de la récupération de la liste de tous les utilisateurs: ${error.message}`);
        APIResponse(response, error, "error", 500);
    }
}

export const getUsersById = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const user = await Model.users.where(id);
    
        if (user) 
            APIResponse(response, user, "User found", 200);
    
        else
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
        const { email, password, name, firstname } = request.body;
        const emailExist = await Model.users.find( email );
        if(emailExist != null){
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
        return APIResponse(response, newUser, "User created", 201);
    }
    catch (error : unknown) {
        APIResponse(response, error, "error", 400);
    }
}

export const login = async (req : Request, res : Response) => {
    try {
        const { email, password } = req.body;
        const user = await Model.users.find( email );
        if(!user){
            return APIResponse(res, null, "Email or password incorrect", 401);
        }
        if(await verifyPassword(password, user.password) === false){
            return APIResponse(res, null, "Email or password incorrect", 401);
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { 
            httpOnly: true,
            sameSite: 'strict',
            secure: NODE_ENV === "production",
         });
        return APIResponse(res, user, "Logged in", 200);
    } catch (error) {
        return APIResponse(res, error, "error", 500);
    }
}

export const logout = async (req : Request, res : Response) => {
    try {
        res.clearCookie("token");
        return APIResponse(res, null, "Logged out", 200);
    } catch (error) {
        return APIResponse(res, error, "error", 500);
    }
}

export const deleteUserById = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        
        await Model.users.delete(id);
        
        logger.info("Utilisateur supprimé");

        APIResponse(response, null, "User deleted", 204);
    } catch (error : unknown) {
        APIResponse(response, error, "error", 500);
    }
}

export const updateUser = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const user = request.body;
    
        await Model.users.update(id, user);
        
        logger.info("Utilisateur mis à jour");

        APIResponse(response, user, "User updated", 200);
    } catch (error : unknown) {
        APIResponse(response, error, "error", 500);
    }
}