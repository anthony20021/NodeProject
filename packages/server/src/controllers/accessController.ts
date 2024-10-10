import { APIResponse, logger } from "../utils";
import { Request, Response} from 'express';
import Model from "../models/index";

export const getAllAccesses = async (request : Request, response : Response) => {
    try {
        logger.info("[GET] - Récupère la liste de tous les pays");

        const access = await Model.access.get();

        logger.info("Liste de tous les pays récupérée");
        APIResponse(response, access, "All access", 200);
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération de la liste des accès", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessById = async (request : Request, response : Response) => {
    try {
        logger.info("[GET] - Récupération d'un accès par son ID");

        const id = request.params.id;
        const access = await Model.access.where(id);

        if(access){
            logger.info("Accès récupéréré");
            APIResponse(response, access, "Access", 200);
        }

        else{
            logger.warn("Accès non trouvé");
            APIResponse(response, null, "Access not found", 404);
        }
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération de l'accès");
        APIResponse(response, error, "error", 500);
    }
}

export const createAccess = async (request : Request, response: Response) => {
    try {
        logger.info("[POST] - Création d'un nouvel accès");

        const newAccess = request.body;

        await Model.access.create(newAccess);

        logger.info("Nouvel accès ajouté", { access: newAccess });
        APIResponse(response, newAccess, "Access created", 200);
    } catch (error : unknown) {
        logger.error("Erreur lors de l'ajout de l'accès", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const deleteAccess = async (request : Request, response : Response) => {
    try {
        logger.info("[DELETE]- Suppression de l'accès");

        const id = request.params.id;

        await Model.access.delete(id);

        logger.info("Accès supprimé");
        APIResponse(response, null, "Access deleted", 200);
    } catch (error : unknown) {
        logger.error("erreur lors de la suppression de l'accès : ", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const updateAccess = async (request : Request, response : Response) => {
    try {
        logger.info("[PUT] - Mise à jour des données de l'accès");

        const id = request.params.id;
        const newAccess = request.body;

        await Model.access.update(id, newAccess);

        logger.info("Données de l'accès mises à jour");
        APIResponse(response, newAccess, "Access updated", 200);
    } catch (error : unknown) {
        logger.error("Erreur lors de la mise à jour des données de l'accès", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessByLocationIdAndCountryId = async (request : Request, response : Response) => {
    try {
        logger.info("[GET] - Récupération des accès par ID de localisation et ID de pays");

        const idLocation = request.params.idLocation;
        const idCountry = request.params.idCountry;
        const access = await Model.access.whereCountryLocation(idLocation, idCountry);

        if(access) {
            logger.info("Accès trouvés");
            APIResponse(response, access, "Access found", 200);
        }
        else{
            logger.warn("Accès non trouvés");
            APIResponse(response, null, "Access not found", 404);
        }
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération des accès", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessByLocationId = async (request : Request, response :  Response) => {
    try {
        logger.info("[GET] - Récupération des accès par ID de localisation");

        const idLocation = request.params.id;
        const access = await Model.access.whereLocation(idLocation);

        if(access) {
            logger.info("Accès trouvés");
            APIResponse(response, access, "Access found", 200);
        }
        else{
            logger.warn("Accès non trouvés");
            APIResponse(response, null, "Access not found", 404);
        }
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération des accès", { error });
        APIResponse(response, error, "error", 500);
    }
}

export const getAccessByCountryId = async (request : Request, response : Response) => {
    try {
        logger.info("[GET] - Récupération des accès par ID de pays");

        const idCountry = request.params.id;
        const access = await Model.access.whereCountry(idCountry);

        if(access) {
            logger.info("Accès trouvés");
            APIResponse(response, access, "Access found", 200);
        }
        else{
            logger.warn("Accès non trouvés");
            APIResponse(response, null, "Access not found", 404);
        }
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération des accès", { error });
        APIResponse(response, error, "error", 500);
    }
}