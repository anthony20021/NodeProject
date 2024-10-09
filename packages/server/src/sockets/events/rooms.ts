import { Socket } from "socket.io";
import { logger } from "../../utils";

export const joinRoom = async (socket : Socket, roomId : string) => {
    try {
        logger.info('Joining room ' + roomId);
        const messages = await getAllMessagesRoom(roomId);

    } catch (error) {
        
    }
}