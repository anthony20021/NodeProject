import { APIResponse } from "../utils/response.ts";
import crypto from "crypto";
import Model from "../models/index.ts";

export const getAllAccesses = async (request, response) => {
    try {
        const access = await Model.access.get();
        APIResponse(response, access, "All access", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessById = async (request, response) => {
    try {
        const id = request.params.id;
        const access = await Model.access.where(id);
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

export const createAccess = async (request, response) => {
    try {
        const newAccess = request.body;
        newAccess.id = crypto.randomUUID();
        await Model.access.create(newAccess);
        APIResponse(response, newAccess, "Access created", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const deleteAccess = async (request, response) => {
    try {
        const id = request.params.id;
        await Model.access.delete(id);
        APIResponse(response, null, "Access deleted", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const updateAccess = async (request, response) => {
    try {
        const id = request.params.id;
        const newAccess = request.body;
        await Model.access.update(id, newAccess);
        APIResponse(response, newAccess, "Access updated", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessByLocationIdAndCountryId = async (request, response) => {
    try {
        const idLocation = request.params.idLocation;
        const idCountry = request.params.idCountry;
        const access = await Model.access.whereCountryLocation(idLocation, idCountry);
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

export const getAccessByLocationId = async (request, response) => {
    try {
        const idLocation = request.params.id;
        const access = await Model.access.whereLocation(idLocation);
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

export const getAccessByCountryId = async (request, response) => {
    try {
        const idCountry = request.params.id;
        const access = await Model.access.whereCountry(idCountry);
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