import { APIResponse } from "../utils/response.js";
import crypto from "crypto";
import Model from "../models/index";

export const getAll = (request, response) => {
    const access = Model.access.get();
    APIResponse(response, access, "All access", 200);
}

export const getAccessById = (request, response) => {
    const id = request.params.id;
    const access = Model.access.where(id);
    APIResponse(response, access, "Access", 200);
}

export const createAccess = (request, response) => {
    const newAccess = request.body;
    Model.access.create(newAccess);
    APIResponse(response, newAccess, "Access created", 200);
}