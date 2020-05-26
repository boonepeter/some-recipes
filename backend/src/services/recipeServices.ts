import recipeData from '../../data/recipes'
import { Recipe } from '../types';

const recipes: Array<Recipe> = recipeData;

const getRecipes = (): Array<Recipe> => {
    return recipes;
}

const addRecipe = (recipe: Recipe) => {
    return recipes.concat(recipe);
}

const findRecipe = (id: string): Recipe | undefined => {
    const recipe = recipes.find(r => r.id === id);
    return recipe;
};


export default {
    getRecipes,
    addRecipe,
    findRecipe,
};