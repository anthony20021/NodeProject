import fs, { access } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessFilePath = path.join(__dirname, '../data/access.json');

// CRUD to get all accesses
export const getAllAccesses = () => {
    const data = fs.readFileSync(accessFilePath, 'utf-8');
    return JSON.parse(data);
};

// CRUD to get an access from its id
export const findAccessById = (id) => {
    const accesses = getAllAccesses();
    id = parseInt(id);
    const access = accesses.find(a => a.id === id);
    return access
};

// CRUD to get accesses from their country id
export const findAccessesByCountryId = (id) => {
    id = parseInt(id)
    const accesses = getAllAccesses();
    return accesses.filter(a => a.idCountry === id);
};

export const findAccessesByLocationId = (id) => {
    id = parseInt(id)
    const accesses = getAllAccesses();
    return accesses.filter(a => a.idLocation === id);
};

export const findAccessesByLocationAndCountryId = (idLocation, idCountry) => {
    idCountry = parseInt(idCountry);
    idLocation = parseInt(idLocation);
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
    id = parseInt(id)
    const accesses = getAllAccesses();
    const index = accesses.findIndex(a => a.id === id);
    if (index !== -1) {
        accesses.splice(index, 1);
        fs.writeFileSync(accessFilePath, JSON.stringify(accesses, null, 2));
    }
};

// CRUD to update an access by its id
export const updateAccess = (id, updatedAccess) => {
    id = parseInt(id)
    const accesses = getAllAccesses();
    const index = accesses.findIndex(a => a.id === id);
    if (index !== -1) {
        accesses[index] = { ...accesses[index], ...updatedAccess };
        fs.writeFileSync(accessFilePath, JSON.stringify(accesses, null, 2));
    }
};