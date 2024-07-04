import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessFilePath = path.join(__dirname, '../data/posts.json');

// CRUD to get all accesses
export const getAllAccesses = () => {
    const data = fs.readFileSync(accessFilePath, 'utf-8');
    return JSON.parse(data);
};

// CRUD to get an access from its id
export const findAccessById = (id) => {
    const accesses = getAllAccesses();
    return accesses.find(a => a.id === id);
};

// CRUD to get accesses from their country id
export const findAccessesByCountryId = (id) => {
    const accesses = getAllAccesses();
    return accesses.filter(a => a.idCountry === id);
};

export const findAccessesByLocationId = (id) => {
    const accesses = getAllAccesses();
    return accesses.filter(a => a.idLocation === id);
};

export const findAccessesByLocationAndCountryId = (idLocation, idCountry) => {
    const accesses = getAllAccesses();
    return accesses.filter(a => a.idLocation === idLocation && a.idCountry === idCountry );
};

// CRUD to create a new access
export const createAccess = (access) => {
    const accesses = getAllAccesses();
    accesses.push(access);
    fs.writeFileSync(accessFilePath, JSON.stringify(accesses, null, 2));
};

// CRUD to delete an access by its id
export const deleteAccess = (id) => {
    const accesses = getAllAccesses();
    const index = accesses.findIndex(a => a.id === id);
    if (index !== -1) {
        accesses.splice(index, 1);
        fs.writeFileSync(accessFilePath, JSON.stringify(accesses, null, 2));
    }
};

// CRUD to update an access by its id
export const updateAccess = (id, updatedAccess) => {
    const accesses = getAllAccesses();
    const index = accesses.findIndex(a => a.id === id);
    if (index !== -1) {
        accesses[index] = { ...accesses[index], ...updatedAccess };
        fs.writeFileSync(accessFilePath, JSON.stringify(accesses, null, 2));
    }
};