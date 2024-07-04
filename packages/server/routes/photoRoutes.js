import { Router } from 'express';
import Controllers from "../controllers/index.js";
import Middlewares from '../middlewares/index.js';


const router = Router();

router.post('/upload/:id', Middlewares.storage.single('photo'), Controllers.photos.upload);

export default router;