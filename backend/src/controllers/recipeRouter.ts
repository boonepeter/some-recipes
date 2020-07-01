import express from 'express';
import RecipeSchema from '../models/RecipeSchema';
import UserSchema from '../models/UserSchema';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';
import { UserToken, Recipe } from '../types';

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
        response.json(recipe.toJSON());
    } else {
        response.status(404).end()
    }
})

recipeRouter.put('/:id', async (request, response) => {
    const token = request.body.token;
    if (!token || !request.body.recipe) {
        response.status(401).json({ error: "No authorization token" })
    }
    try {
        const recipe = await RecipeSchema.findById(request.params.id);
        const userForToken: any = jwt.verify(token, process.env.SECRET as string);
        if (userForToken?.id == recipe?.toJSON().user) {
            const user = await UserSchema.findById(userForToken.id);
            const updated = await RecipeSchema.findByIdAndUpdate(
                request.params.id, 
                {...request.body.recipe, user: user}, 
                { new: true});
            response.json(updated?.toJSON()).end();
        }
    } catch {
        response.status(400).json({ error: "some error"})
    }
})

recipeRouter.delete('/:id', async (request, response) => {
    const token = request.body.token;
    if (!token) {
        response.status(401).json({ error: "No authorization token" }).end()
    }
    try {
        const recipe = await RecipeSchema.findById(request.params.id);
        const userForToken: any = jwt.verify(token, process.env.SECRET as string);
        if (userForToken.id && recipe && userForToken.id == recipe.toJSON().user ) {
            const reply = await RecipeSchema.findByIdAndDelete(request.params.id);
            if (reply) {
                response.json({ message: "deleted"})
            }
        }
        response.status(400).end();
    } catch {
        response.status(400).json({ error: "couldn't delete" })
    }
})


export default recipeRouter