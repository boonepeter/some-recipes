"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var PORT = process.env.PORT;
var MONGODB_URI = process.env.MONGODB_URI;
console.log('mongo uri', MONGODB_URI);
exports.default = {
    MONGODB_URI: MONGODB_URI,
    PORT: PORT
};
