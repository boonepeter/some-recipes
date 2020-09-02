import jwt from "express-jwt";
import express, { Request } from 'express';

const getTokenFromHeader = (req: Request) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
}

export default jwt({
    secret: process.env.SECRET || "",
    userProperty: 'token',
    getToken: getTokenFromHeader
})
