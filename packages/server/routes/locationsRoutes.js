import { Router } from 'express';
import Middlewares from '../middlewares/index.js';
import Controllers from "../controllers/index.js";

const router = Router();

router.get("/", Controllers.locations.get);
router.get("/:id", Controllers.locations.where);
router.get("/country/:countryId", Controllers.locations.fromWhere);
router.post("/", Middlewares.validationLocation, Controllers.locations.create);
router.delete("/:id", Controllers.locations.delete);
router.put("/:id", Controllers.locations.update);
router.get("/photo/:id", Middlewares.validationLocation, Controllers.locations.photo);

export default router;