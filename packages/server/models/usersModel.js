import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userFilePath = path.join(__dirname, '../data/users.json');


//CRUD to get all users
export const getAllUsers = () => {
    const data = fs.readFileSync(userFilePath, 'utf-8');
    return JSON.parse(data);
};

//CRUD to get a user from it's id
export const findUserById = (id) => {
    const users = getAllUsers();
    id = parseInt(id);
    return users.find(u => u.id === id);
};

//CRUD to create a new user
export const createUser = (user) => {
    const users = getAllUsers();

    users.push(user);
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
};

//CRUD to delete a user by it's id
export const deleteUser = (id) => {
    const users = getAllUsers();
    id = parseInt(id);
    const index = users.findIndex(u => u.id === id);
    if(index !== -1)
        users.splice(index, 1);
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
};

//CRUD to update a user by it's id
export const updateUser = (id, user) => {
    id = parseInt(id);
    const users = getAllUsers();
    const index = users.findIndex(u => u.id === id);
    if(index !== -1)
        users[index] = user;
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
};