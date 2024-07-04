import path from 'path';
import multer from 'multer';
import Models from '../models/index.js';

const generateRandomFileName = () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    return `${timestamp}-${randomString}`;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const randomFileName = generateRandomFileName();
        const extension = path.extname(file.originalname);
        cb(null, randomFileName + extension);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 15 }, // Limite de 5 Mo
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .jpeg, .jpg and .png files are allowed!'));
        }
    }
});

export const updateLocationWithPhotoInfo = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const locationId = parseInt(req.params.id);

        const locationToUpdate = Models.locations.where(locationId);
        if (!locationToUpdate) {
            return res.status(404).json({ message: 'Location not found' });
        }

        locationToUpdate.photoName = req.file.filename;
        locationToUpdate.photoType = req.file.mimetype;

        Models.locations.update(locationId, locationToUpdate);

        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { upload };
