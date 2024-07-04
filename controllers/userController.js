import { getAllUsers, findUserById, createUser, deleteUser, updateUserById } from "./usersModel";
import { APIResponse } from "../utils/response.js";
import crypto from 'crypto';

export const getAllUsers = (request, response) => {
    const users = getAllUsers();
    
    APIResponse(response, users, "All users", 200);
}

export const getUsersById = (request, response) => {
    const id = request.params.id;
    const user = findUserById(id);

    if (user) 
        APIResponse(response, user, "User found", 200);

    else
        APIResponse(response, null, "User not found", 404);
}

export const createUser = (request, response) => {
    const newUser = request.body;

    newUser.id = crypto.randomUUID();
    pushUser(newUser);

    APIResponse(response, newUser, "User created", 201);
}

export const deleteUserById = (request, response) => {
    const id = request.params.id;

    deleteUser(id);

    APIResponse(response, null, "User deleted", 204);
}

export const updateUserById = (request, response) => {
    const id = request.params.id;
    const user = request.body;

    updateUsers(id, user);

    APIResponse(response, user, "User updated", 200);
}