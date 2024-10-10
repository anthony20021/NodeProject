import { accesses } from '../schemas/accesses';
import { eq, and } from "drizzle-orm";
import { db } from "../config/pool";
import { logger } from "../utils/logger";
import { Access, newAccess } from '../entities/Access';

export const getAllAccesses = () => {
    try {
        return db.query.accesses.findMany({
            columns : {
                id: true,
                locationId: true,
                countryId: true,
                type: true,
            }
        })
    } catch (error : any) {
        logger.error('Erreur lors de la récupération des accesses', error);
        throw new Error('Erreur lors de la récupération des accesses');
    }
}

export const findAccessById = (id : string) => {
    try {
        return db.query.accesses.findFirst({
            where: eq(accesses.id, id),
            columns : {
                id: true,
                locationId: true,
                countryId: true,
                type: true,
            }
        })
    } catch (error : any) {
        logger.error('Erreur lors de la récupération du access', error);
        throw new Error('Erreur lors de la récupération du access');
    }
}

export const createAccess = (access : newAccess) => {
    try {
        return db.insert(accesses).values(access).returning({ id: accesses.id }).execute();
    } catch (error : any) {
        logger.error('Erreur lors de la création du access', error);
        throw new Error('Erreur lors de la création du access');
    }
}

export const deleteAccess = (id : string) => {
    try {
        return db.delete(accesses).where(eq(accesses.id, id)).execute();
    } catch (error : any) {
        logger.error('Erreur lors de la suppression du access', error);
        throw new Error('Erreur lors de la suppression du access');
    }
}

export const updateAccess = (id : string, access : Access) => {
    try {
        return db.update(accesses).set(access).where(eq(accesses.id, id)).execute();
    } catch (error : any) {
        logger.error('erreur lors de la modification du access', error);
        throw new Error('Erreur lors de la modification du access');
    }
}

export const findAccessesByCountryId = (id : string) => {
    try {
        return db.query.accesses.findFirst({
            where: eq(accesses.countryId, id),
            columns : {
                id: true,
                locationId: true,
                countryId: true,
                type: true,
            }
        })
    } catch (error : any) {
        logger.error('Erreur lors de la récupération du access', error);
        throw new Error('Erreur lors de la récupération du access');
    }
};

export const findAccessesByLocationId = (id : string) => {
    try {
        return db.query.accesses.findFirst({
            where: eq(accesses.locationId, id),
            columns : {
                id: true,
                locationId: true,
                countryId: true,
                type: true,
            }
        })
    } catch (error : any) {
        logger.error('Erreur lors de la récupération du access', error);
        throw new Error('Erreur lors de la récupération du access');
    }
};

export const findAccessesByLocationAndCountryId = (id: string) => {
    try {
        return db.query.accesses.findFirst({
            where: and(
                eq(accesses.locationId, id),
                eq(accesses.countryId, id)
            ),
            columns: {
                id: true,
                locationId: true,
                countryId: true,
                type: true,
            },
        });
    } catch (error: any) {
        logger.error('Erreur lors de la récupération du access', error);
        throw new Error('Erreur lors de la récupération du access');
    }
};

