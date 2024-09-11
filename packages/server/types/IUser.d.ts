import { Document, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    firstName: string;
    email: string;
    password: string;
    role: string;
}