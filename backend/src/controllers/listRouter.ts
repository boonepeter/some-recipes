import express from 'express';
import RecipeListSchema from '../models/RecipeListSchema';
import RecipeSchema from '../models/RecipeSchema'

const listRouter = express.Router();

listRouter.get('/', async (_request, response) => {
    const lists = await RecipeListSchema.find({});
    response.json(lists.map(l => l.toJSON()));
})

listRouter.post('/', async (request, response) => {
    const newRecipe = new RecipeListSchema({ ...request.body });
    await newRecipe.save();
    response.status(200).end();
})

listRouter.get('/:id', async (request, response) => {
    const recipe = await RecipeListSchema.findById(request.params.id).populate('recipes');
    if (recipe) {
        response.json(recipe.toJSON());
    } else {
        response.status(404).end()
    }
})

listRouter.put('/:id', async (request, response) => {
    const list = await RecipeListSchema.findById(request.params.id);
    if (!list) {
        response.status(404).end()
    }
    const recipeId = request.body.recipeId as string;
    const recipe = await RecipeSchema.findById(recipeId);
    if (!recipe) {
        response.status(404).end();
    }

    const newRecipes = list?.toJSON().recipes.concat(recipe?._id);
    const newList = {
        title: list?.toJSON().title,
        recipes: newRecipes
    };
    const returned = await RecipeListSchema.findByIdAndUpdate(list?.toJSON().id, newList, { new: true })
    response.json(returned?.toJSON());
})

export default listRouter