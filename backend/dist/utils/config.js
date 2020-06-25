"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var PORT = process.env.PORT || 3001;
var MONGODB_URI = process.env.MONGODB_URI;
console.log('mongo uri', MONGODB_URI);
exports.default = {
    MONGODB_URI: MONGODB_URI,
    PORT: PORT
};
