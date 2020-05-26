import express from 'express';
import cors from 'cors';
import recipeRouter from './routers/recipeRouter';

require('express-async-errors')
const app = express();

import middleware from '../utils/middleware';

/*
import mongoose from 'mongoose';
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
*/


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/recipes', recipeRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testingRouter')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
export default app
