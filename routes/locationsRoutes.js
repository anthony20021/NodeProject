import { Router } from 'express';
import Model from "../models/index";

const router = Router();

router.get("/", Model.locations.get);
router.get("/:id", Model.locations.where);
router.get("/:countryId", Model.locations.fromWhere);
router.post("/", Model.locations.create);
router.delete("/:id", Model.locations.delete);
router.put("/:id", Model.locations.update);

export default router;