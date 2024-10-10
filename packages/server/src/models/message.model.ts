import { db } from "../config/pool";
import { NewMessage } from "../entities/Message";
import { messages } from "../schemas";
import { logger } from "../utils";
import { and, eq } from "drizzle-orm";

export const sendMessage = (newMessage: NewMessage) => {
    try {
        return db.insert(messages).values(newMessage).returning().execute();
    } catch (error: any) {
        logger.error(`Impossible d'envoyer le message: ${error.message}`);
        throw new Error(`Impossible d'envoyer le message: ${error.message}`);
    }
};

export const deleteMessage = (id: string, authorId: string) => {
    try {
        if (!id || id?.trim()?.length < 5 || !authorId || authorId?.trim()?.length < 5)
            throw new Error("L'ID message et l'ID auteur sont requis.");
        return db.delete(messages)
                .where(
                    and(
                        eq(messages.id, id),
                        eq(messages.authorId, authorId)
                    )
                ).execute();
    } catch (error: any) {
        logger.error(`Impossible de supprimer le message: ${error.message}`);
        throw new Error(`Impossible de supprimer le message: ${error.message}`);
    }
}

export const changeMessage = (id: string, authorId: string, updatedMessage: NewMessage) => {
    try {
        return db.update(messages).set(updatedMessage).where(
            and(
                eq(messages.id, id),
                eq(messages.authorId, authorId)
            )
        ).execute();
    } catch (error: any) {
        logger.error(`Impossible de modifier le message: ${error.message}`);
        throw new Error(`Impossible de modifier le message: ${error.message}`);
    }
}