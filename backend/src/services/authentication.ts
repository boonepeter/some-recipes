import express from "express";
import jwt from "jsonwebtoken";

export const isAuthorized = async (request: express.Request, id: string): Promise<boolean> => {
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === "Bearer"){
        const token = request.headers.authorization.split(' ')[1];
        const userForToken: any = jwt.verify(token, process.env.SECRET as string);
        if (userForToken?.id === id) {
            return true;
        }
    }
    return false;
}
