import Middlewares from "../middlewares/index.ts";

import { Request, Response } from "express";

export const uploadPhoto = async (req: Request, res: Response) => {
    try {
        await Middlewares.storageLocation(req, res, () => {
            res.status(200).json({ message: 'Location updated with photo information' });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};