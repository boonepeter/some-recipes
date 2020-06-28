import express from 'express';
import RecipeSchema from '../models/RecipeSchema';
import UserSchema from '../models/UserSchema';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';

const recipeRouter = express.Router();

recipeRouter.get('/', async (_req, response) => {
    const recipes = await RecipeSchema.find({});
    logger.info(recipes.length);
    response.json(recipes.map(r => r.toJSON()));
})

recipeRouter.post('/', async (request, response) => {
    if (request.body?.user?.id) {
        const user = await UserSchema.findById(request.body.user.id);
        if (user) {
            const newRecipe = new RecipeSchema({ ...request.body, user: user })
            const saved = await newRecipe.save();
            response.json(saved.toJSON());
            console.log('saved', saved.toJSON())
        }
    }
    const newRecipe = new RecipeSchema({ ...request.body });
    await newRecipe.save();
    response.status(200).end();
})

recipeRouter.get('/:id', async (request, response) => {
    const recipe = await RecipeSchema.findById(request.params.id).populate('user');

    if (recipe) {
        console.log(recipe.toJSON());
        response.json(recipe.toJSON());
    } else {
        response.status(404).end()
    }
})

recipeRouter.put('/:id', async (request, response) => {
    const token = request.body.token;
    const userForToken = jwt.verify(token, process.env.SECRET as string);
    console.log(userForToken);
    
})


export default recipeRouter