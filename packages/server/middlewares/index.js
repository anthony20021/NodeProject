import { loggerMiddleware } from "./loggerMiddleware.js";
import { errorModule } from "./errorMiddleware.js";

export default {
    "error" : errorModule,
    "logger" : loggerMiddleware,
}