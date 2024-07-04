import { getLocationsAll, getLocationById, findLocationByCountry, createALocation, deleteLocationById, updateLocation, getPhoto } from "./locationController.js";
import { getUsers, getUsersById, createAUser, deleteUserById, updateUser } from "./userController.js";
import { getAllCountries, getCountryById, createCountry, deleteCountry, updateCountry } from "./countryController.js";
import { getAllAccesses, getAccessById, createAccess, deleteAccess, updateAccess, getAccessByCountryId, getAccessByLocationId, getAccessByLocationIdAndCountryId } from "./accessController.js";
import { uploadPhoto } from "./photoController.js";

export default {
    "locations" : {
        "get" : getLocationsAll,
        "where" : getLocationById,
        "fromWhere" : findLocationByCountry, 
        "create" : createALocation,
        "delete": deleteLocationById,
        "update": updateLocation,
        "photo" : getPhoto,
    },

    "users" : {
        "get" : getUsers,
        "where" : getUsersById,
        "create" : createAUser,
        "delete": deleteUserById,
        "update": updateUser,
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
    },

    "photos" : {
        "upload" : uploadPhoto,
    }
}