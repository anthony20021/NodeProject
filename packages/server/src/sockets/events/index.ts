import { Server, Socket } from "socket.io";
import { joinRoom, createRoom } from "./rooms";
import { postMessage, removeMessage, updateMessage } from "./messages";

import { authenticateSocket } from "../cookies";
import { NewMessage } from "../../entities/Message";

// Configuration des events Socket.io
export function setupSocketEvents(io: Server) {
    io.on('connection', (socket: Socket) => {

        const userId = authenticateSocket(socket); 
        if (!userId) return; 


        console.info(`${socket.id} s'est connecté`);


        socket.on("createRoom", () => createRoom(socket)); 
        socket.on("joinRoom", (roomId: string) => joinRoom(socket, roomId)); 

        // Ecoute des events de messages d'envoi et de suppression
        socket.on("sendMessage", (data: { roomId: string, content: string }) => postMessage(socket, io, data, userId)); 
        socket.on("deleteMessage", (data: { id: string, roomId: string }) => removeMessage(socket, io, data, userId)); 



        socket.on("updateMessage", (data: { id?: string, roomId: string, content: string }) => updateMessage(socket, io, userId, data as NewMessage));
        socket.on("disconnect", () => {
            console.info(`${socket.id} s'est déconnecté`);
        });
    });
}