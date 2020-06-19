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
    const recipe = await RecipeListSchema.findById(request.params.id).populate('recipes', {
        ingredients: 1,
        directions: 1,
        reviews: 1,
        tags: 1,
        title: 1,
        description: 1, 
        link: 1,
        id: 1
    });
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
    console.log(list);
    const recipeId = request.body.recipeId as string;
    const recipe = await RecipeSchema.findById(recipeId);
    if (!recipe) {
        response.status(404).end();
    }

    console.log(recipe);
    console.log(list?.toJSON().recipes);
    const newRecipes = list?.toJSON().recipes.concat(recipe?._id);
    console.log(newRecipes);
    const newList = {
        title: list?.toJSON().title,
        recipes: newRecipes
    };
    console.log(newList);
    const returned = await RecipeListSchema.findByIdAndUpdate(list?.toJSON().id, newList, { new: true })
    response.json(returned?.toJSON());
})

/*
blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id).populate('user', { id: 1 })
  const jBlog = blog.toJSON()

  if (jBlog.user.id !== decodedToken.id) {
    response.status(401).json({ error: 'user is not the creator of that entry' })
  } else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
   }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog.toJSON())
})

blogRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const oldBlog = await Blog.findById(request.params.id)
  oldBlog.comments = oldBlog.comments.concat(body.comment)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, oldBlog, { new: true }).populate('user', { username: 1, name: 1})
  response.json(updatedBlog.toJSON())
})
*/

export default listRouter