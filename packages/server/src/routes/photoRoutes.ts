import { Router } from 'express';

import Controllers from "../controllers/index(error : Error";
import Middlewares from '../middlewares/index(error : Error';


const router = Router();

router.post('/upload/:id', Middlewares.storage.single('photo'), Controllers.photos.upload);
router.get("/photo/:id", Controllers.locations.photo);

export default router;