import Model from "../models/index.js";
import { APIResponse } from "../utils/response.js";
import crypto from "crypto";

export const getAllCountries = async (request , response) => {
    try {
        const countrys = await Model.country.get();
        APIResponse(response, countrys, "All country", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const getCountryById = async (request, response) => {
    try {
        const id = request.params.id;
        const country = await Model.country.where(id);
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

export const createCountry = async (request, response) => {
    try {
        const newCountry = request.body;
        newCountry.id = crypto.randomUUID();
        await Model.country.create(newCountry);
        APIResponse(response, newCountry, "country created", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const deleteCountry = async (request, response) => {
    try {
        const id = request.params.id;
        await Model.country.delete(id);
        APIResponse(response, null, "country deleted", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}

export const updateCountry = async (request, response) => {
    try {
        const id = request.params.id;
        const newCountry = request.body;
        await Model.country.update(id, newCountry);
        APIResponse(response, newCountry, "country updated", 200);
    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
}