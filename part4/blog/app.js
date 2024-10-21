import express from 'express'
const app = express()

import cors from 'cors'
import mongoose from 'mongoose'

import config from './utils/config.js'
import blogRouter from './controllers/blogs.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

logger.info('connecting to database...')
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB: ', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use(blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
