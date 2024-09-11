import { Document, Types } from "mongoose";
import { ICountry } from "./ILocation";

export interface ICountry extends Document {
    id: Types.ObjectId;
    countryId: ICountry["id"];
    name: string;
    freeEntry: boolean;
    price: number;
    type: string; 
    photoName: string;
    photoType: string;
}