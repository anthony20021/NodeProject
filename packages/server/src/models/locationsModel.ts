import { locations } from "../schemas";
import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { logger } from "../utils/logger";
import { newLocation, Location } from "../entities/Location";

export const getAllLocations = () => {
    try {
        return db.query.locations.findMany({
            columns: {
                id: true,
                freeEntry: true,
                price: true,
                type: true,
                name: true,
                photoName: true,
                photoType: true,
                countryId: true,
            }
        })
    } catch (error : any) {
        logger.error('erreur lors de la récupération des locations', error);
        throw new Error('Erreur lors de la récupération des locations');
    }
};

export const findLocationById = (id : string) => {
    try {
        return db.query.locations.findFirst({
            where: eq(locations.id, id),
            columns: {
                id: true,
                freeEntry: true,
                price: true,
                type: true,
                name: true,
                photoName: true,
                photoType: true,
                countryId: true,
            }
        })
    } catch (error : any) {
        logger.error('erreur lors de la récupération de la location', error);
        throw new Error('Erreur lors de la récupération de la location');
    }
};
export const findLocationByCountryId = (id : string) => {
    try {
        return db.query.locations.findMany({
            where: eq(locations.countryId, id),
            columns: {
                id: true,
                freeEntry: true,
                price: true,
                type: true,
                name: true,
                photoName: true,
                photoType: true,
                countryId: true,
            }
        })
    } catch (error : any) {
        logger.error('erreur lors de la récupération de la location', error);
        throw new Error('Erreur lors de la récupération de la location');
    }
};

export const createLocation = (location : newLocation) => {
    try {
        return db.insert(locations).values(location).returning({ id: locations.id }).execute();
    } catch (error : any) {
        logger.error('erreur lors de la création de la location', error);
        throw new Error('Erreur lors de la création de la location');
    }
};

export const deleteLocation = (id : string) => {
    try {
        return db.delete(locations).where(eq(locations.id, id)).execute();
    } catch (error : any) {
        logger.error('erreur lors de la suppression de la location', error);
        throw new Error('Erreur lors de la suppression de la location');
    }
};

export const updateLocation = (id : string, location : Partial<Location>) => {
    try {
        return db.update(locations).set(location).where(
            eq(locations.id, id)
        ).execute();
    } catch (error : any) {
        logger.error('erreur lors de la modification de la location', error);
        throw new Error('Erreur lors de la modification de la location');
    }
};