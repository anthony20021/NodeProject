import { Router } from 'express';
import countryRoutes from "./countryRoutes.js";
import locationsRoutes from "./locationsRoutes.js";
import usersRoutes from "./usersRoutes.js";
import accessesRoutes from "./accessRoutes.js";
import photoRoutes from "./photoRoutes.js";

const router = Router();

router.use("/country", countryRoutes);
router.use("/locations", locationsRoutes);
router.use("/users", usersRoutes);
router.use("/accesses", accessesRoutes);
router.use("/locations", photoRoutes);

export default router;