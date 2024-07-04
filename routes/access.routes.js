import Controllers from "../controllers/index.js";
import { Router } from 'express';

const router = Router();

router.get("/", Controllers.accesses.get);
router.get("/:id", Controllers.accesses.where);
router.post("/", Controllers.accesses.create);
router.delete("/:id", Controllers.accesses.delete);
router.put("/", Controllers.accesses.update);
router.get("/country/:id", Controllers.accesses.whereCountry);
router.get("/location/:id", Controllers.accesses.whereLocation);
router.get("/:idLocation/:idCountry", Controllers.accesses.whereCountryLocation);