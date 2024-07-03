import { Router } from 'express';
import Model from "../models/index";

const router = Router();

router.get("/", Model.country.get);
router.get("/:id", Model.country.where);
router.post("/", Model.country.create);
router.delete("/:id", Model.country.delete);
router.put("/:id", Model.country.update);

export default router;