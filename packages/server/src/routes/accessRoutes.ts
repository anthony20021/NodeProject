import { Router } from 'express';

import Controllers from "../controllers";
import Middlewares from '../middlewares';

const router = Router();

router.get("/", Controllers.accesses.get);
router.get("/:id", Controllers.accesses.where);
router.post("/", Middlewares.validationAccess, Controllers.accesses.create);
router.delete("/:id", Controllers.accesses.delete);
router.put("/", Middlewares.validationAccess, Controllers.accesses.update);
router.get("/country/:id", Controllers.accesses.whereCountry);
router.get("/location/:id", Controllers.accesses.whereLocation);
router.get("/:idLocation/:idCountry", Controllers.accesses.whereCountryLocation);

export default router;