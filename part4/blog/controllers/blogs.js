import { Router } from 'express'
const blogRouter = Router()

import Blog from '../models/blog.js'

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const result = await blog.save()
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
