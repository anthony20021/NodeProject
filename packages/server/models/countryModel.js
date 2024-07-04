import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const countryFilePath = path.join(__dirname, '../data/countries.json');

export const findAllCountry = () => {
    const data = fs.readFileSync(countryFilePath, 'utf-8');
    return JSON.parse(data);
}

export const findCountryById = (id) => {
    const countrys = findAllCountry();
    return countrys.find(c => c.id === id);
}

export const createCountry = (country) => {
    const countrys = findAllCountry();
    countrys.push(country);
    fs.writeFileSync(countryFilePath, JSON.stringify(countrys, null, 2));
}

export const deleteCountry = (id) => {
    const countrys = findAllCountry();
    const index = countrys.findIndex(c = c.id === id);
    if(index !== -1){
        countrys.splice(index, 1);
    }
    fs.writeFileSync(countryFilePath, JSON.stringify(countrys, null, 2))
}

export const updateCountry = (id, country) => {
    const countrys = findAllCountry();
    const index = countrys.findIndex(c => c.index === id);
    if(index !== -1){
        countrys[index] = country;
    }
    fs.writeFileSync(countryFilePath, JSON.stringify(countrys, null, 2));
}