import { eq } from "drizzle-orm";
import { db } from "../config/pool"; // Assure-toi que cette configuration est correcte
import { NewUser, User } from "../entities/User"; // Assure-toi que ces entités sont bien définies
import { logger } from "../utils"; // Assure-toi que ce logger est bien configuré
import { users } from "../schemas"; // Assure-toi que ce schéma est bien défini

// CRUD pour récupérer tous les utilisateurs
export const getAllUsers = (): Promise<Partial<User>[]> => {
    return db.query.users.findMany({
        columns: {
            id: true,
            name: true,
            firstname: true,
        },
    }).catch((error: any) => {
        console.error(error);
        throw new Error(error.message);
    });
};

// CRUD pour récupérer un utilisateur par son ID
export const findUserById = (id: string, withRefreshToken?: boolean): Promise<Partial<User> | null> => {
    return db.query.users.findFirst({
        where: eq(users.id, id),
        columns: {
            id: true,
            name: true,
            firstname: true,
            refreshToken: withRefreshToken,
        },
    }).catch((error: any) => {
        console.error(error);
        throw new Error(error.message);
    });
};

// CRUD pour créer un nouvel utilisateur
export const createUser = (user: NewUser): Promise<{ id: string }> => {
    return db.insert(users).values(user).returning({ id: users.id }).execute()
        .then(result => result[0]) // Renvoie l'ID du nouvel utilisateur créé
        .catch((error: any) => {
            console.error(error);
            throw new Error(error.message);
        });
};

// CRUD pour supprimer un utilisateur par son ID
export const deleteUser = (id: string): Promise<{ deletedCount: number }> => {
    return db.delete(users).where(eq(users.id, id)).execute()
        .then(result => ({ deletedCount: result.count })) // Renvoie le nombre d'utilisateurs supprimés
        .catch((error: any) => {
            console.error(error);
            throw new Error(error.message);
        });
};

// CRUD pour mettre à jour un utilisateur par son ID
export const updateUser = (id: string, userData: Partial<User>) => {
    return db.update(users)
        .set(userData)
        .where(eq(users.id, id))
        .execute()
        .then(result => {
            // Vérifie le résultat de la mise à jour
            if (result.rowCount > 0 && result.rowCount != null) {
                // Si la mise à jour a réussi, récupérer l'utilisateur mis à jour
                return db.query.users.findFirst({
                    where: eq(users.id, id),
                    columns: {
                        id: true,
                        name: true,
                        firstname: true,
                        refreshToken: true,
                    },
                });
            }
            return null; // Retourne null si aucun utilisateur n'a été trouvé
        })
        .catch((error: any) => {
            console.error(error);
            throw new Error(error.message);
        });
};

// CRUD pour récupérer un utilisateur par ses identifiants
export const findByCredentials = (email: string) => {
    return db.query.users.findFirst({
        where: eq(users.email, email), // Assure-toi que l'email est une colonne dans le schéma
        columns: {
            id: true,
            password: true, // Assure-toi que le mot de passe est bien géré (ne pas l'envoyer en clair dans la réponse)
        },
    }).catch((error: any) => {
        console.error(error);
        return null; // Renvoie null en cas d'erreur
    });
};
