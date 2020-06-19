"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var recipeSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    ingredients: [
        {
            type: String,
            required: true,
        }
    ],
    directions: [
        {
            type: String,
            required: true,
        }
    ],
    link: {
        type: String,
        required: false,
    },
    reviews: [
        {
            type: String,
            required: false
        }
    ],
    tags: [
        {
            type: String,
            required: true
        }
    ]
});
recipeSchema.plugin(mongoose_unique_validator_1.default);
recipeSchema.set('toJSON', {
    transform: function (_document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
var Recipe = mongoose_1.default.model('Recipe', recipeSchema);
exports.default = Recipe;
