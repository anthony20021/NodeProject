import { Router } from 'express';

import Controllers from "../controllers";
import Middlewares from '../middlewares';

const router = Router();

router.get("/", Controllers.users.get);
router.get("/:id", Controllers.users.where);
router.post("/register", Middlewares.validationUser, Controllers.users.create);
router.delete("/:id", Controllers.users.delete);
router.put("/:id", Middlewares.validationUser, Controllers.users.update);
router.post("/login", Controllers.users.login);
router.post("/logout", Controllers.users.logout);

export default router;