import { loggerMiddleware } from "./loggerMiddleware.js";
import { errorModule } from "./errorMiddleware.js";
import { upload, updateLocationWithPhotoInfo } from "./photoMiddleware.js";

export default {
    "error" : errorModule,
    "logger" : loggerMiddleware,
    "storage" : upload,
    "storageLocation" : updateLocationWithPhotoInfo,
}