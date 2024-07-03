import {Router} from "express";
import countryRoutes from "./countryRoutes.js"

const router = Router();

router.use("/country", countryRoutes);

export default router;