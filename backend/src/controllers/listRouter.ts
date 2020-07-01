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
    let list = await RecipeListSchema.findById(request.params.id);
    if (!list) {
        response.status(404).end()
    }

    const newList = {
        ...list?.toJSON(),
        recipes: request.body.recipes.map((r: any) => r.id)
    }
    const returned = await RecipeListSchema.findByIdAndUpdate(request.params.id, newList, { new: true });

    response.json(returned?.toJSON());
})

export default listRouter