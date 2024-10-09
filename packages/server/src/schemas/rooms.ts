import mongoose, { Schema } from "mongoose";
import { ICountry } from "../types/ICountry";

const countrySchema: Schema = new Schema({
    
});

export default mongoose.model<ICountry>('Country', countrySchema);