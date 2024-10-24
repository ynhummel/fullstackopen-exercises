import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app.js'
import Blog from '../models/blog.js'
import { initialBlogPosts } from './test_helper.js'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObj = initialBlogPosts.map(blog => new Blog(blog))
  const promiseArray = blogObj.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('there are two posts', async () => {
  const response = await api.get('/api/blogs/')

  assert.strictEqual(response.body.length, initialBlogPosts.length)
})

test('the id parameter is not underscored', async () => {
  const response = await api.get('/api/blogs/')

  assert(Object.hasOwn(response.body[0], 'id'))
  assert(!Object.hasOwn(response.body[0], '_id'))
  assert(!Object.hasOwn(response.body[0], '__v'))
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})
