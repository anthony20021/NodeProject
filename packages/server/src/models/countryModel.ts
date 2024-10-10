import { countries } from '../schemas';
import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { logger } from "../utils/logger";
import { Country, newCountry } from "../entities/Country"


export const findAllCountry = () => {
    try {
        return db.query.countries.findMany({
            columns : {
                id: true,
                name: true,
                capital: true,
                languagesSpoken: true,
                continent: true
            }
        })
    } catch (error : any) {
        logger.error('Erreur lors de la récupération des countries', error);
        throw new Error('Erreur lors de la récupération des countries');
    }
}

export const findCountryById = (id : string) => {
    try {
        return db.query.countries.findFirst({
            where: eq(countries.id, id),
            columns : {
                id: true,
                name: true,
                capital: true,
                languagesSpoken: true,
                continent: true
            }
        })
    } catch (error : any) {
        logger.error('Erreur lors de la récupération du country', error);
        throw new Error('Erreur lors de la récupération du country');
    }
}

export const createCountry = (country : newCountry) => {
    try {
        return db.insert(countries).values(country).returning({ id: countries.id }).execute();
    } catch (error : any) {
        logger.error('Erreur lors de la création du country', error);
        throw new Error('Erreur lors de la création du country');
    }
}

export const deleteCountry = (id : string) => {
    try {
        return db.delete(countries).where(eq(countries.id, id)).execute();
    } catch (error : any) {
        logger.error('Erreur lors de la suppression du country', error);
        throw new Error('Erreur lors de la suppression du country');
    }
}

export const updateCountry = (id : string, country : Country) => {
    try {
        return db.update(countries).set(country).where(eq(countries.id, id)).execute();
    } catch (error : any) {
        logger.error('erreur lors de la modification du country', error);
        throw new Error('Erreur lors de la modification du country');
    }
}