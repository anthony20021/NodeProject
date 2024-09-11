import { Types } from "mongoose";

import User from "../schemas/users";
import { IUser } from "../types/IUser";

//CRUD to get all users
export const getAllUsers = async (): Promise<IUser[]> => {
    try {
        return User.find().select("name email").exec();
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};

//CRUD to get a user from it's id
export const findUserById = (id) => {
    try {

    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};

//CRUD to create a new user
export const createUser = (user) => {
    try {
        
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};

//CRUD to delete a user by it's id
export const deleteUser = (id) => {
    try {

    } catch (error) {
        console.error(error.message);
        return [];
    }
};

//CRUD to update a user by it's id
export const updateUser = (id, user) => {
    try {

    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};