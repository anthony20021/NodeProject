import { Server } from "socket.io";
import http from 'http';

import { setupSocketEvents } from "./events";
import { env } from "../config/env";

const { ORIGIN } = env;

export function initializeSocketServer(server: http.Server): Server {
    const io = new Server(server, {
        cors: {
            origin: ORIGIN,
            credentials: true
        }
    });

    setupSocketEvents(io);

    return io;
}