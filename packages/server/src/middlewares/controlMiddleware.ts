import { Request, Response, NextFunction } from "express";

export const validationLocationMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const { countryId, name, freeEntry, price, type } = req.body;
    if (!countryId || !name || !type || !price || typeof freeEntry !== "boolean") {
        return res.status(400).json({ message: "Formulaire incorrect" });
    }
    next();
}

export const validationCountriesMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const { name, capital, languagesSpoken, continent } = req.body;
    if (!name || !capital || !languagesSpoken || !continent) {
        return res.status(400).json({ message: "Formulaire incorrect" });
    }
    next();
}

export const validationAccessMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const { idLocation, idCountry, category } = req.body;
    if (!idLocation || !idCountry || !category || category.length === 0) {
        return res.status(400).json({ message: "Formulaire incorrect" });
    }
    next();
}

export const validationUserMiddleware = (req : Request, res : Response, next : NextFunction) => {
    const { name, firstname, email, password } = req.body;
    if (!name || !firstname || !email || !password) {
        if(password && password.length < 8){
            return res.status(400).json({ message: "Formulaire incorrect" });
        }
    }
    next();
}