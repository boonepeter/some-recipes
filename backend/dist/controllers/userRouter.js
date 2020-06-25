"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserSchema_1 = __importDefault(require("../models/UserSchema"));
var logger_1 = __importDefault(require("../utils/logger"));
var RecipeListSchema_1 = __importDefault(require("../models/RecipeListSchema"));
var userRouter = express_1.default.Router();
userRouter.get('/', function (_req, response) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserSchema_1.default.find({}).populate({ path: 'lists', populate: { path: 'recipes' } })];
            case 1:
                users = _a.sent();
                logger_1.default.info(users.length);
                response.json(users.map(function (u) { return u.toJSON(); }));
                return [2 /*return*/];
        }
    });
}); });
userRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var body, saltRounds, passwordHash, user, savedUser, newList, savedList, found;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = request.body;
                if (body.password.length < 3) {
                    response.status(400).send({ error: 'password must be at least 3 characters long' });
                }
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1.default.hash(body.password, saltRounds)];
            case 1:
                passwordHash = _a.sent();
                user = new UserSchema_1.default({
                    username: body.username,
                    name: body.name,
                    email: body.email,
                    passwordHash: passwordHash,
                });
                return [4 /*yield*/, user.save()];
            case 2:
                savedUser = _a.sent();
                logger_1.default.info('savedUser', savedUser);
                newList = new RecipeListSchema_1.default({
                    title: "Favorites",
                    user: savedUser._id
                });
                logger_1.default.info('newList', newList);
                return [4 /*yield*/, newList.save()];
            case 3:
                savedList = _a.sent();
                logger_1.default.info('savedList', savedList);
                return [4 /*yield*/, UserSchema_1.default.findByIdAndUpdate(savedUser._id, { lists: [savedList._id] }, { new: true })];
            case 4:
                found = _a.sent();
                logger_1.default.info('found', found);
                if (!found) {
                    response.status(404).end();
                }
                response.json(found === null || found === void 0 ? void 0 : found.toJSON());
                return [2 /*return*/];
        }
    });
}); });
userRouter.get('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserSchema_1.default.findOne({ username: request.params.id }).populate({
                    path: 'lists',
                    populate: { path: 'recipes' }
                })];
            case 1:
                user = _a.sent();
                if (user) {
                    response.json(user.toJSON());
                }
                else {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
userRouter.put('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserSchema_1.default.findById(request.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    response.status(404).end();
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = userRouter;
