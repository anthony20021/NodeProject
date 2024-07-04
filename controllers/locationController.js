import { getAllLocations, findLocationById, findLocationByCountryId, createLocation, deleteLocation, updateLocationById } from "./locationsModel";
import { APIResponse } from "../utils/response.js";
import crypto from 'crypto';

export const getAllLocations = (request, response) => {
    const locations = getAllLocations();
    
    APIResponse(response, locations, "All locations", 200);
}

export const getLocationById = (request, response) => {
    const id = request.params.id;
    const location = findLocationById(id);

    if (location) 
        APIResponse(response, location, "Location found", 200);

    else
        APIResponse(response, null, "Location not found", 404);
}

export const findLocationByCountryId = (request, response) => {
    const countryId = request.params.countryId;
    const locations = findLocationByCountryId(countryId);

    if (locations && locations.length > 0)
        APIResponse(response, locations, "Locations found for the given country ID", 200);
    
    else
        APIResponse(response, [], "No locations found for the given country ID", 404);
}

export const createLocation = (request, response) => {
    const newLocation = request.body;

    newLocation.id = crypto.randomUUID();
    createLocation(newLocation);

    APIResponse(response, newLocation, "Location created", 201);
}

export const deleteLocationById = (request, response) => {
    const id = request.params.id;

    deleteLocation(id);

    APIResponse(response, null, "Location deleted", 204);
}

export const updateLocationById = (request, response) => {
    const id = request.params.id;
    const location = request.body;

    updateLocationById(id, location);

    APIResponse(response, location, "Location updated", 200);
}