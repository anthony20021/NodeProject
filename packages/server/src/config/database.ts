import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken"
import { APIResponse } from "../utils";


const { MONGO_URI } = env;

export const connectDB = async () => {
    try{
        const db = await connect(MONGO_URI);
        console.log(`MongoDB connected: ${db.connection.host}`);
    }
    catch(error : any){
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

