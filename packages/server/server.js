import express from "express";
import Middlewares from "./middlewares/index.js";
import routes from "./routes/index.js";
import fs from "fs";
import path from "path";
import cors from "cors";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(Middlewares.logger);

app.use(routes);
app.get("/photo/:id", (request, response) => {
    const id = request.params.id;
    // récupération du fichier en fonction de l'id (nom du fichier + mime type)
    const file = fs.readFileSync(path.join(__dirname, "uploads", id));
    response.writeHead(200, {"Content-Type": "image/png"});
    response.end(file);
})


app.use(Middlewares.error);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})