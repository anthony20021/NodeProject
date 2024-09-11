import { Router } from 'express';

import Controllers from "../controllers/index.ts";
import Middlewares from '../middlewares/index.ts';

const router = Router();

router.get("/", Controllers.users.get);
router.get("/:id", Controllers.users.where);
router.post("/", Middlewares.validationUser, Controllers.users.create);
router.delete("/:id", Controllers.users.delete);
router.put("/:id", Middlewares.validationUser, Controllers.users.update);

export default router;