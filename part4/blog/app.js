import express from 'express'
const app = express()

import cors from 'cors'
import mongoose from 'mongoose'

import blogRouter from './controllers/blogs.js'
import userRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'

import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

logger.info('connecting to database...')
try {
  await mongoose.connect(config.MONGODB_URI)
  logger.info('connected to MongoDB')
} catch (error) {
  logger.error('error connecting to MongoDB: ', error.message)
}

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
