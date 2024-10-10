import { Socket, Server } from "socket.io";
import { logger } from "../../utils";
import Model from "../../models";
import { NewMessage } from "../../entities/Message";

export const postMessage = async (socket: Socket, io: Server, data: { roomId: string, content: string }, authorId: string) => {
    try {
        const [ message ] = await Model.messages.send({...data, authorId});

        if (!message) 
            throw new Error("Impossible d'envoyer le message");

        io.in(data.roomId).emit("message", {
            id: message.id,
            message: message.content,
            author: message.authorId,
            createdAt: message.createdAt
        });
    } catch (error: any) {
        logger.error(`Impossible d'envoyer le message: ${error.message}`);
        socket.emit("error", `Impossible d'envoyer le message: ${error.message}`);
    }
};

export const removeMessage = async (socket: Socket, io: Server, data: { id: string, roomId: string }, userId: string) => {
    try {
        await Model.messages.delete(data.id, userId);

        io.in(data.roomId).emit("deletedMessage", data.id);
    } catch (error: any) {
        logger.error(`Impossible de supprimer le message: ${error.message}`);
        socket.emit("error", `Impossible de supprimer le message: ${error.message}`);
    }
};

export const updateMessage = async (socket: Socket, io: Server, userId: string, updatedMessage: NewMessage) => {
    try {
        await Model.messages.change(updatedMessage.id as string, userId, updatedMessage);

        io.in(updatedMessage.roomId).emit("updatedMessage", updatedMessage);
    } catch (error: any) {
        logger.error(`Impossible de modifier le message: ${error.message}`);
        socket.emit("error", `Impossible de modifier le message: ${error.message}`);
    }
}