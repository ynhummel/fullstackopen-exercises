import { Router } from 'express'
const blogRouter = Router()

import Blog from '../models/blog.js'
import User from '../models/user.js'

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const user = await User.find({})
  const blog = new Blog({ user: user[0].id, ...request.body })

  try {
    const result = await blog.save()
    user[0].blogPosts = user[0].blogPosts.concat(result._id)
    await user[0].save()

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
