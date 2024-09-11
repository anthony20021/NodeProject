import { Request, Response, NextFunction } from 'express';

export const errorModule = (err : Request, req : any, res : Response, next : NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Erreur 500');
}