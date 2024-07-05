import { loggerMiddleware } from "./loggerMiddleware.js";
import { errorModule } from "./errorMiddleware.js";
import { upload, updateLocationWithPhotoInfo } from "./photoMiddleware.js";
import { 
    validationLocationMiddleware, 
    validationUserMiddleware, 
    validationAccessMiddleware, 
    validationCountriesMiddleware,
  } from "./controlMiddleware.js";

export default {
    "error" : errorModule,
    "logger" : loggerMiddleware,
    "storage" : upload,
    "storageLocation" : updateLocationWithPhotoInfo,
    "validationLocation" : validationLocationMiddleware,
    "validationUser" : validationUserMiddleware,
    "validationAccess" : validationAccessMiddleware,
    "validationCountries" : validationCountriesMiddleware,
}