import { Document, Types } from "mongoose";

export interface IAccess extends Document {
    id: Types.ObjectId;
    idLocation: number;
    idCountry: number;
    type: string;
}