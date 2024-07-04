import { Router } from 'express';
import Controllers from '../controllers/index.js';


const router = Router();

router.get("/", Controllers.countries.get);
router.get("/:id", Controllers.countries.where);
router.post("/", Controllers.countries.create);
router.delete("/:id", Controllers.countries.delete);
router.put("/:id", Controllers.countries.update);

export default router;