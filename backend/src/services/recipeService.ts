import { Recipe } from "../types";
import RecipeSchema from '../models/RecipeSchema';
import UserSchema from '../models/UserSchema';
import { addRecipeToList } from "./listService";
import RecipeList from "../models/RecipeListSchema";

export const getAllRecipes = async () : Promise<Recipe[]> => {
    const recipe = await RecipeSchema.find({}).limit(50);
    return recipe.map(r => r.toJSON());
}

export const getRecipe = async (id: string) : Promise<Recipe | undefined> => {
    const recipe = await RecipeSchema.findById(id).populate('user');
    if (!recipe) {
        return undefined;
    }
    return recipe.toJSON();
}

export const deleteRecipe = async (id: string) => {
    const reply = await RecipeSchema.findByIdAndDelete(id);
}

export const updateRecipe = async (recipeId: string, recipe: Recipe, userId: string) => {
    const user = await UserSchema.findById(userId);
    if (user) {
        const updated = await RecipeSchema.findByIdAndUpdate(
            recipeId, 
            { ...recipe, user: user}, 
            { new: true}).populate('user');
        return updated?.toJSON();
    }
}

export const createRecipe = async (recipe: Recipe, userId: string) : Promise<Recipe | undefined> => {
    const user = await UserSchema.findById(userId);
    if (user) {
        recipe.user = user;
        const newRecipe = new RecipeSchema(recipe).populate('user');
        const saved = await newRecipe.save();
        const uploads = await RecipeList.findOne({'user': user._id, 'title': 'Uploads'});
        console.log(uploads);
        if (uploads) {
            addRecipeToList(saved._id, uploads._id);
        }
        return saved.toJSON();
    } else {
        return undefined;
    }
}