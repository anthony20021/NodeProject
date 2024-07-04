import { Router } from 'express';
import Controllers from '../controllers/index.js';


const router = Router();

router.get("/", Controllers.accesses.get);
router.get("/:id", Controllers.accesses.where);
router.post("/", Controllers.accesses.create);
router.delete("/:id", Controllers.accesses.delete);
router.put("/:id", Controllers.accesses.update);

export default router;