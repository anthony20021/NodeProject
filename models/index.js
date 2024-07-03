import { findAllCountry, findCountryById, createCountry, deleteCountry, updateCountry } from "./countryModel";
import { getAllLocations, findLocationById, findLocationByCountryId, createLocation, deleteLocation, updateLocation } from "./locationsModel";

export default Model = {
    "country" : {
        "get" : findAllCountry,
        "where" : findCountryById,
        "create" : createCountry,
        "delete": deleteCountry,
        "update": updateCountry,
    },
    
    "location" : {
        "get" : getAllLocations,
        "where" : findLocationById,
        "fromWhere" : findLocationByCountryId, 
        "create" : createLocation,
        "delete": deleteLocation,
        "update": updateLocation,
    },
}