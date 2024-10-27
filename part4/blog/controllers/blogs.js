
import jwt from 'jsonwebtoken'
import { Router } from 'express'
const blogRouter = Router()

import Blog from '../models/blog.js'
import User from '../models/user.js'

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({ user: user.id, ...request.body })

    const result = await blog.save()
    user.blogPosts = user.blogPosts.concat(result._id)
    await user.save()

    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const { title, likes } = request.body
  try {
    const blog = await Blog.findByIdAndUpdate(request.params.id, { title, likes }, { new: true })
    response.status(200).json(blog)
  } catch (error) {
    next(error)
  }
})

export default blogRouter
