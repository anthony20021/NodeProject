import Model from "../Models/index.js";
import { APIResponse } from "../utils/response.js";
import crypto from "crypto";

export const getAllCountries = (request , response) => {
    try {
        const countrys = Model.country.get();
        APIResponse(response, countrys, "All country", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getCountryById = (request, response) => {
    try {
        const id = request.params.id;
        const country = Model.country.where(id);
        if(country){
            APIResponse(response, country, "country", 200);
        }
        else{
            APIResponse(response, null, "not found", 404);
        }
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const createCountry = (request, response) => {
    try {
        const newCountry = request.body;
        newCountry.id = crypto.randomUUID();
        Model.country.create(newCountry);
        APIResponse(response, newCountry, "country created", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const deleteCountry = (request, response) => {
    try {
        const id = request.params.id;
        Model.country.delete(id);
        APIResponse(response, null, "country deleted", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const updateCountry = (request, response) => {
    try {
        const id = request.params.id;
        const newCountry = request.body;
        Model.country.update(id, newCountry);
        APIResponse(response, newCountry, "country updated", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}