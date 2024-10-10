import { db } from "../config/pool";
import { users, messages, rooms } from "../schemas";
import { logger } from "../utils";
import { eq } from "drizzle-orm";

export const newRoom = () => {
    try {
        return db.insert(rooms).values({}).returning({ id: rooms.id }).execute();
    } catch (error: any) {
        logger.error(`Impossible de créer une nouvelle room: ${error.message}`);
        throw new Error(`Impossible de créer une nouvelle room: ${error.message}`);
    }
};


export const getAllMessagesRoom = (roomId: string) => {
    try {
        return db.select({
            id: messages.id,
            content: messages.content,
            author: {
                id: users.id,
                firstname: users.firstname,
                name: users.name,
            },
            createdAt: messages.createdAt
        }).from(messages)
        .leftJoin(users, eq(users.id, messages.authorId))
        .where(eq(messages.roomId, roomId))
        .execute();
    } catch (error: any) {
        logger.error(`Impossible de récupérer les messages de la room: ${error.message}`);
        throw new Error(`Impossible de récupérer les messages de la room: ${error.message}`);
    }
}