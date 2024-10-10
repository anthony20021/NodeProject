import { Socket } from "socket.io";
import { logger } from "../../utils";
import Model from "../../models";

export const joinRoom = async (socket: Socket, roomId: string) => {
    try {
        logger.info(`Room : ${roomId} joined`);
        const messages = await Model.rooms.getMessages(roomId);

        socket.join(roomId);

        socket.emit("messages", messages);
    } catch (error: any) {
        logger.error(`Erreur : impossible de rejoindre la room ${error.message}`);
        socket.emit("error", `Erreur : impossible de rejoindre la room  ${roomId}`); 

    }
}

export const createRoom = async (socket: Socket) => {
    try {
        logger.info("Creating room");
        const [ room ] = await Model.rooms.create(); 
        socket.emit("room", room); 
    } catch (error: any) {
        logger.error(`Erreur : impossible de créer la room : ${error.message}`);
        socket.emit("error", "Erreur : impossible de créer la room "); 
    }
}