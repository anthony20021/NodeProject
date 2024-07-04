import { Router } from 'express';
import Controllers from "../controllers/index.js";

const router = Router();

router.get("/", Controllers.users.get);
router.get("/:id", Controllers.users.where);
router.post("/", Controllers.users.create);
router.delete("/:id", Controllers.users.delete);
router.put("/:id", Controllers.users.update);

export default router;