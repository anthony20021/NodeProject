import Middlewares from "../middlewares/index.js";

export const uploadPhoto = async (req, res) => {
    try {
        await Middlewares.storageLocation(req, res, () => {
            APIResponse(response, null, "Success", 200);
        });

    } catch (error) {
        APIResponse(response, error, "error", 500);
    }
};