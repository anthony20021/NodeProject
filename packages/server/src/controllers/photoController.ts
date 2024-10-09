import Middlewares from "../middlewares/index";

import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";


// Méthode pour l'upload d'un seule photo
export const uploadPhoto = async (req: Request, res: Response) => {
    try {
        if (!req.file || !req.file.filename) {
            logger.error("Aucun fichier uploadé");
            return APIResponse(res, null, "Aucun fichier uploadé", 400);
        }

        await Middlewares.storageLocation(req, res, () => {
            const filename = req.file!.filename;
            logger.info("Fichier uploadé avec succès: " + filename);
            return APIResponse(res, { filename }, "Photo téléchargée avec succès", 200);
        });

    } catch (err: any) {
        logger.error("Erreur lors de l'upload de la photo: " + err.message);
        APIResponse(res, null, err.message, 500);
    }
};

// Méthode pour l'upload de plusieurs photos
export const uploadMultipleFiles = async (req: Request, res: Response) => {
    try {
        if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
            logger.error("Aucun fichier uploadé");
            return APIResponse(res, null, "Aucun fichier uploadé", 400);
        }

        await Middlewares.storageLocation(req, res, () => {
            const filenames = (req.files as Express.Multer.File[]).map((file) => file.filename);
            logger.info("Fichiers uploadés avec succès: " + filenames.join(", "));
            APIResponse(res, { filenames }, "Fichiers téléchargés avec succès", 200);
        });

    } catch (err: any) {
        logger.error("Erreur lors de l'upload des fichiers: " + err.message);
        APIResponse(res, null, err.message, 500);
    }
};