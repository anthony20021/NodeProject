import { Router } from 'express';
import countryRoutes from "./countryRoutes.ts";
import locationsRoutes from "./locationsRoutes.ts";
import usersRoutes from "./usersRoutes.ts";
import accessesRoutes from "./accessRoutes.ts";
import photoRoutes from "./photoRoutes.ts";

const router = Router();

router.use("/country", countryRoutes);
router.use("/locations", locationsRoutes);
router.use("/users", usersRoutes);
router.use("/accesses", accessesRoutes);
router.use("/locations", photoRoutes);

export default router;