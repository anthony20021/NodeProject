import Model from "../models/index.js";
import Middlewares from "../middlewares/index.ts";
import { APIResponse } from "../utils/response.ts";
import crypto from 'crypto';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname, '../uploads');

export const getLocationsAll = async (request, response) => {
    try {
        const locations = await Model.locations.get();
        APIResponse(response, locations, "All locations", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getLocationById = async (request, response) => {
    try {
        const id = request.params.id;
        const location = await Model.locations.where(id);
        if (location) 
            APIResponse(response, location, "Location found", 200);
        else
            APIResponse(response, null, "Location not found", 404);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const findLocationByCountry = async (request, response) => {
    try {
        const countryId = request.params.countryId;
        const locations = await Model.locations.fromWhere(countryId);
        if (locations && locations.length > 0)
            APIResponse(response, locations, "Locations found for the given country ID", 200);
        
        else
            APIResponse(response, [], "No locations found for the given country ID", 404);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const createALocation = async (request, response) => {
    try {
        const newLocation = request.body;
        newLocation.id = crypto.randomUUID();
        await Model.locations.create(newLocation);
        APIResponse(response, newLocation, "Location created", 201);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const deleteLocationById = async (request, response) => {
    try {
        const id = request.params.id;
        await Model.locations.delete(id);
        APIResponse(response, null, "Location deleted", 204);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const updateLocation = async (request, response) => {
    try {
        const id = request.params.id;
        const location = request.body;
        await Model.locations.update(id, location);
        APIResponse(response, location, "Location updated", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getPhoto = async (request, response) => {
    try {
        const id = request.params.id;
        const location = await Model.locations.where(id);
        
        if (location) {
            const photoName = location.photoName;
            const photoType = location.photoType;
            const file = fs.readFileSync(path.join(uploadDir, photoName));
            response.writeHead(200, {"Content-Type": photoType});
            response.end(file);
        }
        else{
            APIResponse(response, null, "Location not found", 404);
        }
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}
