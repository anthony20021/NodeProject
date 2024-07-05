import Middlewares from "../middlewares/index.js";

export const uploadPhoto = async (req, res) => {
    try {
        await Middlewares.storageLocation(req, res, () => {
            res.status(200).json({ message: 'Location updated with photo information' });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};