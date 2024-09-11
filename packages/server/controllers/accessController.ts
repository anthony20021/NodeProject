import { APIResponse } from "../utils/response.js";
import crypto from "crypto";
import Model from "../models/index.js";
import { Types } from "mongoose";

export const getAllAccesses = (request, response) => {
    try {
        const access = Model.access.get();
        APIResponse(response, access, "All access", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessById = (request, response) => {
    try {
        const id : Types.ObjectId = request.params.id;
        const access = Model.access.where(id);
        if(access){
            APIResponse(response, access, "Access", 200);
        }
        else{
            APIResponse(response, null, "Access not found", 404);
        }
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const createAccess = (request, response) => {
    try {
        const newAccess = request.body;
        newAccess.id = crypto.randomUUID();
        Model.access.create(newAccess);
        APIResponse(response, newAccess, "Access created", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const deleteAccess = (request, response) => {
    try {
        const id = request.params.id;
        Model.access.delete(id);
        APIResponse(response, null, "Access deleted", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const updateAccess = (request, response) => {
    try {
        const id = request.params.id;
        const newAccess = request.body;
        Model.access.update(id, newAccess);
        APIResponse(response, newAccess, "Access updated", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessByLocationIdAndCountryId = (request, response) => {
    try {
        const idLocation = request.params.idLocation;
        const idCountry = request.params.idCountry;
        const access = Model.access.whereCountryLocation(idLocation, idCountry);
        if(access.length > 0) {
            APIResponse(response, access, "Access found", 200);
        }
        else{
            APIResponse(response, null, "Access not found", 404);
        }
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessByLocationId = (request, response) => {
    try {
        const idLocation = request.params.id;
        const access = Model.access.whereLocation(idLocation);
        if(access.length > 0) {
            APIResponse(response, access, "Access found", 200);
        }
        else{
            APIResponse(response, null, "Access not found", 404);
        }
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessByCountryId = (request, response) => {
    try {
        const idCountry = request.params.id;
        const access = Model.access.whereCountry(idCountry);
        if(access.length > 0) {
            APIResponse(response, access, "Access found", 200);
        }
        else{
            APIResponse(response, null, "Access not found", 404);
        }
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}