import express from "express";
import Middlewares from "./middlewares";
import routes from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import http from "http";
import { initializeSocketServer } from "./sockets/server";

const { PORT, ORIGIN } = env;
const app = express();
const server = http.createServer(app);
initializeSocketServer(server);

app.use(cors({
    origin: ORIGIN,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
}));


app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Middlewares.logger);

app.use(Middlewares.refreshTokenMiddleware);

app.use(routes);

app.use(Middlewares.error);

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}

export default app;