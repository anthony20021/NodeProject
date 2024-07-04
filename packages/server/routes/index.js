import {Router} from "express";
import countryRoutes from "./countryRoutes.js"
import locationsRoutes from "./locationsRoutes.js";
import usersRoutes from "./usersRoutes.js";

const router = Router();

router.use("/country", countryRoutes);
router.use("/locations", locationsRoutes);
router.use("/users", usersRoutes);

export default router;