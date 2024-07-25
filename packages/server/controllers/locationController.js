import Model from "../models/index.js";
import Middlewares from "../middlewares/index.js";
import { APIResponse } from "../utils/response.js";
import crypto from 'crypto';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname, '../uploads');

export const getLocationsAll = (request, response) => {
    try {
        const locations = Model.locations.get();
        APIResponse(response, locations, "All locations", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getLocationById = (request, response) => {
    try {
        const id = request.params.id;
        const location = Model.locations.where(id);
        if (location) 
            APIResponse(response, location, "Location found", 200);
        else
            APIResponse(response, null, "Location not found", 404);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const findLocationByCountry = (request, response) => {
    try {
        const countryId = request.params.countryId;
        const locations = Model.locations.fromWhere(countryId);
        if (locations && locations.length > 0)
            APIResponse(response, locations, "Locations found for the given country ID", 200);
        
        else
            APIResponse(response, [], "No locations found for the given country ID", 404);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const createALocation = (request, response) => {
    try {
        const newLocation = request.body;
        newLocation.id = crypto.randomUUID();
        Model.locations.create(newLocation);
        APIResponse(response, newLocation, "Location created", 201);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const deleteLocationById = (request, response) => {
    try {
        const id = request.params.id;
        Model.locations.delete(id);
        APIResponse(response, null, "Location deleted", 204);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const updateLocation = (request, response) => {
    try {
        const id = request.params.id;
        const location = request.body;
        Model.locations.update(id, location);
        APIResponse(response, location, "Location updated", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getPhoto = (request, response) => {
    try {
        const id = request.params.id;
        const location = Model.locations.where(id);
        
        if (location) {
            const photoName = location.photoName;
            const photoType = location.photoType;
            const file = fs.readFileSync(path.join(uploadDir, photoName));
            response.writeHead(200, {"Content-Type": photoType});
            response.end(file);
            APIResponse(response, location, "Location found", 200);
        }
        else{
            APIResponse(response, null, "Location not found", 404);
        }
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}
