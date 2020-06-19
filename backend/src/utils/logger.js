"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var info = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    if (process.env.NODE_ENV !== 'test') {
        console.log.apply(console, params);
    }
};
var error = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    if (process.env.NODE_ENV !== 'test') {
        console.error.apply(console, params);
    }
};
exports.default = {
    info: info,
    error: error
};
