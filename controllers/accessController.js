import { APIResponse } from "../utils/response.js";
import crypto from "crypto";
import Model from "../models/index";

export const getAllAccesses = (request, response) => {
    const access = Model.access.get();
    APIResponse(response, access, "All access", 200);
}

export const getAccessById = (request, response) => {
    const id = request.params.id;
    const access = Model.access.where(id);
    if(access){
        APIResponse(response, access, "Access", 200);
    }
    else{
        APIResponse(response, null, "Access not found", 404);
    }
}

export const createAccess = (request, response) => {
    const newAccess = request.body;
    newAccess.id = crypto.randomUUID();
    Model.access.create(newAccess);
    APIResponse(response, newAccess, "Access created", 200);
}

export const deleteAccess = (request, response) => {
    const id = request.params.id;
    Model.access.delete(id);
    APIResponse(response, null, "Access deleted", 200);
}

export const updateAccess = (request, response) => {
    const id = request.params.id;
    const newAccess = request.body;
    Model.access.update(id, newAccess);
    APIResponse(response, newAccess, "Access updated", 200);
}

export const getAccessByLocationIdAndCountryId = (request, response) => {
    const idLocation = request.params.idLocation;
    const idCountry = request.params.idCountry;
    const access = Model.access.whereCountryLocation(idLocation, idCountry);
    APIResponse(response, access, "Access", 200);
}

export const getAccessByLocationId = (request, response) => {
    const idLocation = request.params.idLocation;
    const access = Model.access.whereLocation(idLocation);
    APIResponse(response, access, "Access", 200);
}

export const getAccessByCountryId = (request, response) => {
    const idCountry = request.params.idCountry;
    const access = Model.access.whereCountry(idCountry);
    APIResponse(response, access, "Access", 200);
}