import { Router } from 'express'
const blogRouter = Router()

import Blog from '../models/blog.js'

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog({ user: request.user.id, ...request.body })

    const result = await blog.save()
    request.user.blogPosts = request.user.blogPosts.concat(result._id)
    await request.user.save()

    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === request.user.id) {
      await Blog.findByIdAndDelete(blog.id)
    } else {
      return response.status(401).json({ error: 'unable to delete another user blog' })
    }

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
