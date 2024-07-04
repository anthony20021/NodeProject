import { Router } from 'express';
import Model from "../models/index";

const router = Router();

router.get("/", Model.users.get);
router.get("/:id", Model.users.where);
router.post("/", Model.users.create);
router.delete("/:id", Model.users.delete);
router.put("/:id", Model.users.update);

export default router;