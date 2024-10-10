import Model from "../models/index";
import { APIResponse, logger } from "../utils";
import fs from "fs";
import path from "path";
import { Request, Response} from 'express';
import { Types } from "mongoose";


const uploadDir = path.join(__dirname, '../uploads');

export const getLocationsAll = async (request : Request, response : Response) => {
    try {
        logger.info("[GET] /users - Récupère la liste de toutes les locations");

        const locations = await Model.locations.get();

        APIResponse(response, locations, "All locations", 200);
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération des locations", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const getLocationById = async (request : Request, response : Response) => {
    try {
        logger.info("[GET] - Récupération d'une location par son ID");

        const id = request.params.id;
        const location = await Model.locations.where(new Types.ObjectId(id));

        if (location){
            logger.info("Location trouvée");
            APIResponse(response, location, "Location found", 200);
        }
        else{
            logger.warn("Location non trouvée");
            APIResponse(response, null, "Location not found", 404);
        }
    } catch (error : any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur : ${error.message}`);
        APIResponse(response, error, "error", 500);
    }
}

export const findLocationByCountry = async (request : Request, response : Response) => {
    try {
        const countryId = request.params.countryId;

        logger.info(`[GET] - Récupération des locations pour le pays ${countryId}`);

        const locations = await Model.locations.fromWhere(new Types.ObjectId(countryId));

        if (locations && locations.length > 0){
            logger.info(`Locations trouvées pour le pays ${countryId}`);
            APIResponse(response, locations, "Locations found for the given country ID", 200);
        }
        
        else{
            logger.warn(`Aucunes locations trouvées pour le pays ${countryId}`);
            APIResponse(response, [], "No locations found for the given country ID", 404);
        }
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération des locations par pays", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const createALocation = async (request : Request, response : Response) => {
    try {
        logger.info("[POST] - Création d'une nouvelle location");

        const newLocation = request.body;

        await Model.locations.create(newLocation);

        logger.info("Nouvelle location créée avec succès");
        APIResponse(response, newLocation, "Location created", 201);
    } catch (error : unknown) {
        logger.error("Erreur lors de la création de la location", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const deleteLocationById = async (request : Request, response : Response) => {
    try {
        const id = request.params.id;

        logger.info(`[DELETE] - Suppression de la location avec l'ID ${id}`);

        await Model.locations.delete(new Types.ObjectId(id));

        logger.info("Location supprimée avec l'ID");
        APIResponse(response, null, "Location supprimée", 204);
    } catch (error : unknown) {
        console.error(error);
        APIResponse(response, error, "error", 500);
    }
}

export const updateLocation = async (request : Request, response :  Response) => {
    try {
        logger.info("[PUT] - Mise à jour de la location avec l'ID");

        const id = request.params.id;
        const location = request.body;

        await Model.locations.update(new Types.ObjectId(id), location);

        logger.info("Location mise à jour avec succès");
        APIResponse(response, location, "Location updated", 200);
    } catch (error : unknown) {
        logger.error("Erreur lors de la mise à jour de la location avec l'ID", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const getPhoto = async (request : Request, response : Response) => {
    try {
        const id = request.params.id;

        logger.info(`[GET] - Récupération de la photo pour la location ${id}`);

        const location = await Model.locations.where(new Types.ObjectId(id));
        
        if (location) {
            logger.info("Photo trouvée");
            const photoName = location.photoName;
            const photoType = location.photoType;
            const file = fs.readFileSync(path.join(uploadDir, photoName));
            response.writeHead(200, {"Content-Type": photoType});
            response.end(file);
        }
        else{
            logger.warn("Aucune photo trouvée");
            APIResponse(response, null, "Location not found", 404);
        }
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération de la photo", { error });
        APIResponse(response, error, "error", 500);
    }
}
