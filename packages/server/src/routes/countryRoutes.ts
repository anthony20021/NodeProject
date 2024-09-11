import { Router } from 'express';

import Controllers from '../controllers/index(error : Error';
import Middlewares from '../middlewares/index(error : Error';


const router = Router();

router.get("/", Controllers.countries.get);
router.get("/:id", Controllers.countries.where);
router.post("/", Middlewares.validationCountries, Controllers.countries.create);
router.delete("/:id", Controllers.countries.delete);
router.put("/:id", Middlewares.validationCountries, Controllers.countries.update);

export default router;