import { getAllLocations, getLocationById, findLocationByCountryId, createLocation, deleteLocationById, updateLocationById } from "./locationController";
import { getAllUsers, getUsersById, createUser, deleteUserById, updateUserById } from "./userController";

export default Controller = {
    "locations" : {
        "get" : getAllLocations,
        "where" : getLocationById,
        "fromWhere" : findLocationByCountryId, 
        "create" : createLocation,
        "delete": deleteLocationById,
        "update": updateLocationById,
    },

    "users" : {
        "get" : getAllUsers,
        "where" : getUsersById,
        "create" : createUser,
        "delete": deleteUserById,
        "update": updateUserById,
    }
}