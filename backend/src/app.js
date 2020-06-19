"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var recipeRouter_1 = __importDefault(require("./controllers/recipeRouter"));
var listRouter_1 = __importDefault(require("./controllers/listRouter"));
var userRouter_1 = __importDefault(require("./controllers/userRouter"));
var loginRouter_1 = __importDefault(require("./controllers/loginRouter"));
var searchRouter_1 = __importDefault(require("./controllers/searchRouter"));
var config_1 = __importDefault(require("./utils/config"));
require('express-async-errors');
var app = express_1.default();
var middleware_1 = __importDefault(require("./utils/middleware"));
var logger_1 = __importDefault(require("./utils/logger"));
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.set('useUnifiedTopology', true);
logger_1.default.info('connecting to MongoDB');
var mongoUrl = config_1.default.MONGODB_URI;
logger_1.default.info(mongoUrl);
mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    logger_1.default.info('connected to MongoDB');
})
    .catch(function (error) {
    logger_1.default.error('error connecting to MongoDB:', error.message);
});
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(middleware_1.default.requestLogger);
app.use(middleware_1.default.tokenExtractor);
app.use('/api/recipes', recipeRouter_1.default);
app.use('/api/lists', listRouter_1.default);
app.use('/api/users', userRouter_1.default);
app.use('/api/login', loginRouter_1.default);
app.use('/api/search', searchRouter_1.default);
if (process.env.NODE_ENV === 'test') {
    var testingRouter = require('./controllers/testingRouter');
    app.use('/api/testing', testingRouter);
}
app.use(middleware_1.default.errorHandler);
app.use(middleware_1.default.unknownEndpoint);
exports.default = app;
