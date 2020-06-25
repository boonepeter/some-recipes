import express from 'express';
import bcrypt from 'bcrypt';
import UserSchema from '../models/UserSchema';
import logger from '../utils/logger';
import RecipeListSchema from '../models/RecipeListSchema';

const userRouter = express.Router();

userRouter.get('/', async (_req, response) => {
    const users = await UserSchema.find({}).populate({ path: 'lists', populate: { path: 'recipes' }});
    logger.info(users.length);
    response.json(users.map(u => u.toJSON()));
})

userRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.password.length < 3) {
      response.status(400).send({ error: 'password must be at least 3 characters long'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new UserSchema({
      username: body.username,
      name: body.name,
      email: body.email,
      passwordHash,
    })
    const savedUser = await user.save()
    logger.info('savedUser', savedUser);

    const newList = new RecipeListSchema({
        title: "Favorites",
        user: savedUser._id
    })
    logger.info('newList', newList);
    const savedList = await newList.save();
    logger.info('savedList', savedList);
    const found = await UserSchema.findByIdAndUpdate(savedUser._id, { lists: [ savedList._id ]}, { new: true });
    logger.info('found', found);
    if (!found) {
        response.status(404).end();
    }

    response.json(found?.toJSON())
})

userRouter.get('/:id', async (request, response) => {
    const user = await UserSchema.findOne({username: request.params.id }).populate(
        {
          path: 'lists',
          populate: { path: 'recipes'}
        }
    );
    if (user) {
        response.json(user.toJSON());
    } else {
        response.status(404).end()
    }
})

userRouter.put('/:id', async (request, response) => {
    const user = await UserSchema.findById(request.params.id);
    if (!user) {
        response.status(404).end();
    }
})


export default userRouter;