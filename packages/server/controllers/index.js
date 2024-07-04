import { getAllLocations, getLocationById, findLocationByCountryId, createLocation, deleteLocationById, updateLocationById } from "./locationController";
import { getAllUsers, getUsersById, createUser, deleteUserById, updateUserById } from "./userController";
import { getAllCountries, getCountryById, createCountry, deleteCountry, updateCountry } from "./countryController";
import { getAllAccesses, getAccessById, createAccess, deleteAccess, updateAccess, getAccessByCountryId, getAccessByLocationId, getAccessByLocationIdAndCountryId } from "./accessController";

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
    },

    "accesses" : {
        "get" : getAllAccesses,
        "where" : getAccessById,
        "create" : createAccess,
        "delete": deleteAccess,
        "update": updateAccess,
        "whereCountry" : getAccessByCountryId,
        "whereLocation" : getAccessByLocationId,
        "whereCountryLocation" : getAccessByLocationIdAndCountryId,
    },

    "countries" : {
        "get" : getAllCountries,
        "where" : getCountryById,
        "create" : createCountry,
        "delete": deleteCountry,
        "update": updateCountry,
    }
}