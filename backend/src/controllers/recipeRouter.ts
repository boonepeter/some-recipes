import express from 'express';
import RecipeSchema from '../models/RecipeSchema';
import logger from '../utils/logger';

const recipeRouter = express.Router();

recipeRouter.get('/', async (_req, response) => {
    const recipes = await RecipeSchema.find({});
    logger.info(recipes.length);
    response.json(recipes.map(r => r.toJSON()));
})

recipeRouter.post('/', async (request, response) => {
    const newRecipe = new RecipeSchema({ ...request.body });
    await newRecipe.save();
    response.status(200).end();
})

recipeRouter.get('/:id', async (request, response) => {
    const recipe = await RecipeSchema.findById(request.params.id);
    if (recipe) {
        response.json(recipe.toJSON());
    } else {
        response.status(404).end()
    }
})


export default recipeRouter