import { Router } from 'express';
import countryRoutes from "./countryRoutes(error : Error";
import locationsRoutes from "./locationsRoutes(error : Error";
import usersRoutes from "./usersRoutes(error : Error";
import accessesRoutes from "./accessRoutes(error : Error";
import photoRoutes from "./photoRoutes(error : Error";

const router = Router();

router.use("/country", countryRoutes);
router.use("/locations", locationsRoutes);
router.use("/users", usersRoutes);
router.use("/accesses", accessesRoutes);
router.use("/locations", photoRoutes);

export default router;