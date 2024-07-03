import { findAllCountry, findCountryById, createCountry, deleteCountry, updateCountry } from "./countryModel";

export default Model = {
    "country" : {
        "get" : findAllCountry,
        "where" : findCountryById,
        "create" : createCountry,
        "delete": deleteCountry,
        "update": updateCountry,
    },
    
}