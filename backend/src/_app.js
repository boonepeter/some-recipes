/*

const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogRouter')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')
import recipeRouter from './routers/recipeRouter';
import logger from '../utils/logger'
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


mongoose.set('useFindAndModify', false)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

logger.info('connecting to MongoDB')
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/login', recipeRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testingRouter')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
module.exports = app

*/