import express from 'express';
import cors from 'cors';
import recipeRouter from './controllers/recipeRouter';
import listRouter from './controllers/listRouter';
import userRouter from './controllers/userRouter';
import loginRouter from './controllers/loginRouter';
import searchRouter from './controllers/searchRouter';
import uploadRouter from './controllers/uploadRouter';
import path from 'path';
import config from './utils/config';
require('express-async-errors')
const app = express();

import middleware from './utils/middleware';
import logger from './utils/logger';

import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
logger.info('connecting to MongoDB')
const mongoUrl = config.MONGODB_URI as string;
logger.info(mongoUrl);
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/recipes', recipeRouter);
app.use('/api/lists', listRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/search', searchRouter);
app.use('/api/upload', uploadRouter);

// send everything else to the frontend index
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
export default app
