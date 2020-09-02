import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express from 'express';
import UserModel from '../models/UserSchema';

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await UserModel.findOne({ email: body.email }).populate({ path: 'lists', populate: { path: 'recipes' }})
  if (user === null) {
    response.status(401).json({ error: 'invalid username' })
  }
  
  if (user?.passwordHash) {
    const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
      if (!(user && passwordCorrect)) {
        response.status(401).json({
          error: 'invalid username or password'
        })
      }
  
      const userForToken = {
        email: user.email,
        id: user._id
      }
  
      const token = jwt.sign(userForToken, process.env.SECRET as string)
  
      response
        .status(200)
        .json({ token, user: user?.toJSON() })
  }
})

export default loginRouter
