import { Request, Response, NextFunction } from "express";
import { userValidation, locationValidation, countriesValidation, accessesValidation } from "../validation/validation";
import { z } from "zod";

export const validationLocationMiddleware = (req : Request, res : Response, next : NextFunction) => {
    try {
        locationValidation.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Formulaire incorrect" });
        }
        else{
            console.error(error);
        }
    }
}

export const validationCountriesMiddleware = (req : Request, res : Response, next : NextFunction) => {
    try {
        countriesValidation.parse(req.body);
        next();
    } catch (error) {
        if(error instanceof z.ZodError) {
            return res.status(400).json({ message: "Formulaire incorrect" });
        }
        else{
            console.error(error);
        }
    }
}

export const validationAccessMiddleware = (req : Request, res : Response, next : NextFunction) => {
    try {
        accessesValidation.parse(req.body);
        next();
    } catch (error) {
        if(error instanceof z.ZodError) {
            return res.status(400).json({ message: "Formulaire incorrect" });
        }
        else{
            console.error(error);
        }
    }
}

export const validationUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        userValidation.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Extraire le premier message d'erreur
            const firstError = error.errors[0];
            const errorMessage = firstError.message || "Formulaire incorrect";

            return res.status(400).json({ message: errorMessage });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Erreur interne du serveur" });
        }
    }
};