"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var recipeListSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    recipes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
});
recipeListSchema.plugin(mongoose_unique_validator_1.default);
recipeListSchema.set('toJSON', {
    transform: function (_document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
var RecipeList = mongoose_1.default.model('RecipeList', recipeListSchema);
exports.default = RecipeList;
