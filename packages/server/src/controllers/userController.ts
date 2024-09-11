import Model from "../models/index";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { APIResponse, hashPassword, verifyPassword } from "../utils/response";
import { env } from "../config/env";

const { JWT_SECRET, NODE_ENV } = env;

export const getUsers = async (response: Response) => {
    try {
        const users = await Model.users.get();
        APIResponse(response, users, "All users", 200);
    } catch (error : unknown) {
        APIResponse(response, error, "error", 500);
    }
}

export const getUsersById = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const user = await Model.users.where(new Types.ObjectId(id));
    
        if (user) 
            APIResponse(response, user, "User found", 200);
    
        else
            APIResponse(response, null, "User not found", 404);
    } catch (error : unknown) {
        APIResponse(response, error, "error", 500);
    }
}

export const createAUser = async (request: Request, response: Response) => {
    try {
        const newUser = request.body;
    
        await Model.users.create(newUser);
    
        APIResponse(response, newUser, "User created", 201);
    } catch (error : unknown) {
        APIResponse(response, error, "error", 500);
    }
}

export const deleteUserById = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
    
        await Model.users.delete(new Types.ObjectId(id));
    
        APIResponse(response, null, "User deleted", 204);
    } catch (error : unknown) {
        APIResponse(response, error, "error", 500);
    }
}

export const updateUser = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const user = request.body;
    
        await Model.users.update(new Types.ObjectId(id), user);
    
        APIResponse(response, user, "User updated", 200);
    } catch (error : unknown) {
        APIResponse(response, error, "error", 500);
    }
}