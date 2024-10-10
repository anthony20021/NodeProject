import { eq } from "drizzle-orm";
import { db } from "../config/pool"; 
import { NewUser, User } from "../entities/User"; 
import { logger } from "../utils";
import { users } from "../schemas"; 

// CRUD pour récupérer tous les utilisateurs
export const getAllUsers = (): Promise<Partial<User>[]> => {
    try {
        return db.query.users.findMany({
            columns: {
                id: true,
                name: true,
                firstname: true,
            }
        });
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs: ${err.message}`);
        throw new Error("Erreur lors de la récupération des utilisateurs");
    }
};

// CRUD pour récupérer un utilisateur par son ID
export const findUserById = (id: string, withRefreshToken?: boolean) => {
    try {
        return db.query.users.findFirst({
            where: eq(users.id, id),
            columns: {
                id: true,
                name: true,
                firstname: true,
                refreshToken: withRefreshToken
            }
        });
    } catch (error: any) {
        logger.error(`Erreur lors de récupération de l'utilisateur: ${error.message}`);
        throw new Error("Erreur lors de l'ajout de l'utilisateur");
    }
};

export const createUser = (user: NewUser) => {
    try {
        return db.insert(users).values(user).returning({ id: users.id }).execute();
    } catch (error : any) {
        logger.error(`Erreur lors de l'ajout de l'utilisateur: ${error.message}`);
        throw new Error("Erreur lors de l'ajout de l'utilisateur");
    }
};

export const deleteUser = (id: string) => {
    try {
        return db.delete(users).where(eq(users.id, id)).execute()
    } catch (error : any) {
        logger.error(`Erreur lors de la suppression de l'utilisateur: ${error.message}`);
        throw new Error("Erreur lors de la suppression de l'utilisateur");
    }
};

export const updateUser = (user: Partial<User> & { id: string }) => {
    try {
        return db.update(users).set(user).where(
            eq(users.id, user.id)
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la modification de l'utilisateur: ${err.message}`);
        throw new Error("Erreur lors de la modification de l'utilisateur");
    }
}


export const findByCredentials = (email: string) => {
    try {
        return db.query.users.findFirst({
            where: eq(users.email, email),
            columns: {
                id: true,
                name: true,
                firstname: true,
                email: true,
                password: true,
                role: true,
                refreshToken: true
            }
        });
    } catch(err: any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur: ${err.message}`);
        throw new Error("Erreur lors de la récupération de l'utilisateur");
    }
}
