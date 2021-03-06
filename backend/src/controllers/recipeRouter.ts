import { saveRecipePicture } from './../services/pictureService';
import express from 'express';
import RecipeSchema from '../models/RecipeSchema';
import UserSchema from '../models/UserSchema';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';
import { getRecipe, deleteRecipe, updateRecipe, createRecipe, getAllRecipes } from '../services/recipeService';
import { isAuthorized } from '../services/authentication';

const recipeRouter = express.Router();

recipeRouter.get('/', async (_req, response) => {
    response.json(await getAllRecipes());
})

recipeRouter.post('/', async (request, response) => {
    //console.log(request.file);
    //console.log(request.body.file);
    const recipe = await createRecipe(request.body, request.body.user.id);
    if (recipe) {
        //if (request.file) {
        //    const url = await saveRecipePicture(recipe.recipeId, "recipe-container", request.file.buffer);
        //    recipe.imageURL = url;
        //    const updated = await updateRecipe(recipe.recipeId, recipe, request.body.user?.userId);
        //    response.json(updated);
        //    return;
        //}
        response.json(recipe);
    } else {
        response.status(500).end();
    }
})

recipeRouter.get('/:id', async (request, response) => {
    response.json(await getRecipe(request.params.id));
})

recipeRouter.put('/:id', async (request, response) => {
    const recipe = await getRecipe(request.params.id);
    //console.log(request.file);
    //console.log(request.body.file);
    if (recipe && recipe.user?.userId) {
        const authorized = await isAuthorized(request, recipe.user.userId);
        console.log(authorized);
        if (authorized && recipe.user?.userId) {
            //if (request.file) {
            //    const url = await saveRecipePicture(recipe.recipeId, "recipe-container", request.file.buffer);
            //    recipe.imageURL = url;
            //}
            const updated = await updateRecipe(recipe.recipeId, request.body.recipe, recipe.user?.userId);
            response.json(updated);
        }
    }
})

recipeRouter.delete('/:id', async (request, response) => {
    const recipe = await getRecipe(request.params.id);
    if (recipe && recipe.user?.userId) {
        const authorized = await isAuthorized(request, recipe.user.userId);
        if (authorized) {
            await deleteRecipe(recipe.recipeId);
            response.json({ message: "deleted recipe" });
        } else {
            response.status(401).json({ error: "not authorized"}).end();
        }
    } else {
        response.status(401).end();
    }
});


export default recipeRouter