import Model from "../Models/index.js";
import { APIResponse } from "../utils/response.js";
import crypto from 'crypto';

export const getUsers = (request, response) => {
    const users = Model.users.get();
    
    
    APIResponse(response, users, "All users", 200);
}

export const getUsersById = (request, response) => {
    const id = request.params.id;
    const user = Model.users.where(id);

    if (user) 
        APIResponse(response, user, "User found", 200);

    else
        APIResponse(response, null, "User not found", 404);
}

export const createAUser = (request, response) => {
    const newUser = request.body;

    newUser.id = crypto.randomUUID();
    Model.users.create(newUser);

    APIResponse(response, newUser, "User created", 201);
}

export const deleteUserById = (request, response) => {
    const id = request.params.id;

    Model.users.delete(id);

    APIResponse(response, null, "User deleted", 204);
}

export const updateUser = (request, response) => {
    const id = request.params.id;
    const user = request.body;

    Model.users.update(id, user);

    APIResponse(response, user, "User updated", 200);
}