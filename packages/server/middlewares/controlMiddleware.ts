export const validationLocationMiddleware = (req : any, res : any, next : any) => {
    const { countryId, name, freeEntry, price, type } = req.body;
    if (!countryId || !name || !type || !price || typeof freeEntry !== "boolean") {
        return res.status(400).json({ message: "Formulaire incorrect" });
    }
    next();
}

export const validationCountriesMiddleware = (req : any, res : any, next : any) => {
    const { name, capital, languagesSpoken, continent } = req.body;
    if (!name || !capital || !languagesSpoken || !continent) {
        return res.status(400).json({ message: "Formulaire incorrect" });
    }
    next();
}

export const validationAccessMiddleware = (req : any, res : any, next : any) => {
    const { idLocation, idCountry, type } = req.body;
    if (!idLocation || !idCountry || !type.length > 0) {
        return res.status(400).json({ message: "Formulaire incorrect" });
    }
    next();
}

export const validationUserMiddleware = (req : any, res : any, next : any) => {
    const { name, firstname, email, password } = req.body;
    if (!name || !firstname || !email || !password) {
        return res.status(400).json({ message: "Formulaire incorrect" });
    }
    next();
}
