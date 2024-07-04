import { findAllCountry, findCountryById, createCountry, deleteCountry, updateCountry } from "./countryModel";
import { getAllLocations, findLocationById, findLocationByCountryId, createLocation, deleteLocation, updateLocation } from "./locationsModel";
import { getAllUsers, findUserById, createUser, deleteUser, updateUser } from "./usersModel";

export default Model = {
    "country" : {
        "get" : findAllCountry,
        "where" : findCountryById,
        "create" : createCountry,
        "delete": deleteCountry,
        "update": updateCountry,
    },
    
    "locations" : {
        "get" : getAllLocations,
        "where" : findLocationById,
        "fromWhere" : findLocationByCountryId, 
        "create" : createLocation,
        "delete": deleteLocation,
        "update": updateLocation,
    },

    "users" : {
        "get" : getAllUsers,
        "where" : findUserById,
        "create" : createUser,
        "delete": deleteUser,
        "update": updateUser,
    }
}