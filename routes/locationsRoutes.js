import { Router } from 'express';
import Controllers from "../controllers/index.js";

const router = Router();

router.get("/", Controllers.locations.get);
router.get("/:id", Controllers.locations.where);
router.get("/:countryId", Controllers.locations.fromWhere);
router.post("/", Controllers.locations.create);
router.delete("/:id", Controllers.locations.delete);
router.put("/:id", Controllers.locations.update);

export default router;