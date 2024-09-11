import { loggerMiddleware } from "./loggerMiddleware.ts";
import { errorModule } from "./errorMiddleware.ts";
import { upload, updateLocationWithPhotoInfo } from "./photoMiddleware.ts";
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