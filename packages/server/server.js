import express from "express";
import Middlewares from "./middlewares/index.js";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(Middlewares.logger);

app.use(routes);


app.use(Middlewares.error);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})