import { Types } from "mongoose";
import locations from "../schemas/locations";
import { ILocation } from "../types/ILocation";

export const getAllLocations = async () => {
    try {
        return await locations.find().exec();
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};

export const findLocationById = async (id : Types.ObjectId) => {
    try {
        return await locations.findById(id).exec();
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};
export const findLocationByCountryId = async (id : Types.ObjectId) => {
    try {
        const location = await locations.find({ countryId: id }).exec();
        return location;
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};

export const createLocation = async (location : ILocation) => {
    try {
        return await locations.create(location);
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};

export const deleteLocation = (id) => {
    try {
        return locations.deleteOne({ _id: id });
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};

export const updateLocation = (id, location) => {
    try {
        return locations.findByIdAndUpdate(id, location, { new: true }).exec();;
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
};