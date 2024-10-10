import Model from "../models/index";
import { APIResponse, logger } from "../utils";
import { Request, Response} from 'express';

export const getAllCountries = async (request : Request, response : Response) => {
    try {
        logger.info("[GET] - Récupère la liste de tous les pays");

        const countrys = await Model.country.get();

        APIResponse(response, countrys, "All country", 200);
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération de la liste des pays", { error });
        APIResponse(response, error, "error", 500);
    }
};

export const getCountryById = async (request : Request, response : Response) => {
    try {
        logger.info("[GET] - Récupération d'un pays par son ID");

        const id = request.params.id;
        const country = await Model.country.where(id);

        if(country){
            logger.info("Pays récupéréré");
            APIResponse(response, country, "country", 200);
        }
        else{
            logger.warn("Pays non trouvé");
            APIResponse(response, null, "not found", 404);
        }
    } catch (error : unknown) {
        logger.error("Erreur lors de la récupération du pays");
        APIResponse(response, error, "error", 500);
    }
};

export const createCountry = async (request : Request, response : Response) => {
    try {
        logger.info("[POST] - Création d'un nouveau pays");

        const newCountry = request.body;

        await Model.country.create(newCountry);

        logger.info("Nouveau pays ajouté", { country: newCountry });
        APIResponse(response, newCountry, "country created", 200);
    } catch (error : unknown) {
        logger.error("Erreur lors de l'ajout du pays", { error });
        APIResponse(response, error, "error", 500);
    }
};

export const deleteCountry = async (request : Request, response : Response) => {
    try {
        logger.info("[DELETE]- Suppression du pays");

        const id = request.params.id;

        await Model.country.delete(id);

        logger.info("Pays supprimé");
        APIResponse(response, null, "country deleted", 200);
    } catch (error : unknown) {
        logger.error("erreur lors de la suppression du pays : ", { error });
        APIResponse(response, error, "error", 500);
    }
};

export const updateCountry = async (request : Request, response : Response) => {
    try {
        logger.info("[PUT] - Mise à jour des données du pays");

        const id = request.params.id;
        const newCountry = request.body;

        await Model.country.update(id, newCountry);

        logger.info("Données du pays mises à jour");
        APIResponse(response, newCountry, "country updated", 200);
    } catch (error : unknown) {
        logger.error("Erreur lors de la mise à jour des données du pays", {error});
        APIResponse(response, error, "error", 500);
    }
};