import { Types } from "mongoose";
import countries from '../schemas/countries';
import { ICountry } from '../types/ICountry';

export const findAllCountry = async () => {
    try {
        return await countries.find().exec();
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

export const findCountryById = async (id : Types.ObjectId) => {
    try {
        return countries.findById(id).exec();
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

export const createCountry = async (country : ICountry) => {
    try {
        return await countries.create(country);
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

export const deleteCountry = async (id : Types.ObjectId ) => {
    try {
        return await countries.deleteOne({ _id: id });
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}

export const updateCountry = (id : Types.ObjectId, country : ICountry) => {
    try {
        return countries.findByIdAndUpdate(id, country, { new: true }).exec();
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
}