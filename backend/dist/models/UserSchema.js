"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    lists: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'RecipeList'
        }
    ]
});
UserSchema.plugin(mongoose_unique_validator_1.default);
UserSchema.set('toJSON', {
    transform: function (_document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});
var UserModel = mongoose_1.model('User', UserSchema);
exports.default = UserModel;
