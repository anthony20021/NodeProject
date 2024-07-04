import fs from 'fs';
import { get } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postFilePath = path.join(__dirname, '../data/posts.json');


//CRUD to get all locations
export const getAllLocations = () => {
    const data = fs.readFileSync(locationFilePath, 'utf-8');

    return JSON.parse(data);
};

//CRUD to get a location from it's id
export const findLocationById = (id) => {
    const locations = getAllLocations();

    return locations.find(l => l.id === id);
};

//CRUD to get a location from it's country id
export const findLocationByCountryId = (id) => {
    const locations = getAllLocations();

    return locations.filter(l => l.countryId === id)
};

//CRUD to create a new location
export const createLocation = (location) => {
    const locations = getAllLocations();

    locations.push(location);
    fs.writeFileSync(locationFilePath, JSON.stringify(locations, null, 2));
};

//CRUD to delete a location by it's id
export const deleteLocation = (id) => {
    const locations = getAllLocations();
    const index = locations.findIndex(l => l.id === id);

    if(index !== -1)
        locations.splice(index, 1);
    fs.writeFileSync(locationFilePath, JSON.stringify(locations, null, 2));
};

//CRUD to update a location by it's id
export const updateLocation = (id, location) => {
    const locations = getAllLocations();
    const index = locations.findIndex(l => l.id === id);

    if(index !== -1)
        locations[index] = location;
    fs.writeFileSync(locationFilePath, JSON.stringify(locations, null, 2));
};