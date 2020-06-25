"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("./logger"));
var requestLogger = function (request, _response, next) {
    logger_1.default.info('Method:', request.method);
    logger_1.default.info('Path:', request.path);
    logger_1.default.info('Body:', request.body);
    logger_1.default.info('---');
    next();
};
var unknownEndpoint = function (_request, response) {
    response.status(404).send({ error: 'unknown endpoint' });
};
var errorHandler = function (error, _request, response, next) {
    logger_1.default.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        });
    }
    next(error);
};
var tokenExtractor = function (request, _response, next) {
    var authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7);
    }
    next();
};
exports.default = {
    requestLogger: requestLogger,
    unknownEndpoint: unknownEndpoint,
    errorHandler: errorHandler,
    tokenExtractor: tokenExtractor
};
