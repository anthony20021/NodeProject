import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const countryFilePath = path.join(__dirname, '../data/countries.json');

export const findAllCountry = () => {
    try {
        const data = fs.readFileSync(countryFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export const findCountryById = (id) => {
    try {
        const countrys = findAllCountry();
        id = parseInt(id);
        return countrys.find(c => c.id === id);
    } catch (error) {
        return error.message;
    }
}

export const createCountry = (country) => {
    try {
        const countrys = findAllCountry();
        countrys.push(country);
        fs.writeFileSync(countryFilePath, JSON.stringify(countrys, null, 2));
    } catch (error) {
        return error.message;
    }
}

export const deleteCountry = (id) => {
    try {
        id = parseInt(id);
        const countrys = findAllCountry();
        const index = countrys.findIndex(c = c.id === id);
        if(index !== -1){
            countrys.splice(index, 1);
        }
        fs.writeFileSync(countryFilePath, JSON.stringify(countrys, null, 2))
    } catch (error) {
        return error.message;
    }
}

export const updateCountry = (id, country) => {
    try {
        id = parseInt(id);
        const countrys = findAllCountry();
        const index = countrys.findIndex(c => c.index === id);
        if(index !== -1){
            countrys[index] = country;
        }
        fs.writeFileSync(countryFilePath, JSON.stringify(countrys, null, 2));
    } catch (error) {
        return error.message;
    }
}