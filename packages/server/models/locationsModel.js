import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const locationFilePath = path.join(__dirname, '../data/locations.json');


export const getAllLocations = () => {
    try {
        const data = fs.readFileSync(locationFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export const findLocationById = (id) => {
    try {
        const locations = getAllLocations();
        id = parseInt(id);
        return locations.find(l => l.id === id);
    } catch (error) {
        return error.message;
    }
};

export const findLocationByCountryId = (id) => {
    try {
        const locations = getAllLocations();
        id = parseInt(id);
        return locations.filter(l => l.countryId === id)
    } catch (error) {
        return error.message;
    }
};

export const createLocation = (location) => {
    try {
        const locations = getAllLocations();
        locations.push(location);
        fs.writeFileSync(locationFilePath, JSON.stringify(locations, null, 2));
        
    } catch (error) {
        return error.message;
    }
};

export const deleteLocation = (id) => {
    try {
        const locations = getAllLocations();
        id = parseInt(id);
        const index = locations.findIndex(l => l.id === id);
        if(index !== -1)
            locations.splice(index, 1);
        fs.writeFileSync(locationFilePath, JSON.stringify(locations, null, 2));
    } catch (error) {
        return error.message;
    }
};

export const updateLocation = (id, location) => {
    try {
        id = parseInt(id);
        const locations = getAllLocations();
        const index = locations.findIndex(l => l.id === id);
    
        if(index !== -1)
            locations[index] = location;
        fs.writeFileSync(locationFilePath, JSON.stringify(locations, null, 2));
    } catch (error) {
        return error.message;
    }
};