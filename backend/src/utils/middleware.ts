import logger from './logger'

const requestLogger = (request: any, _response: any, next: any) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request: any, response: any) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: any, _request: any, response: any, next: any) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

const tokenExtractor = (request: any, _response: any, next: any) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  }
  next()
}


export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}
