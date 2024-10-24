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

test('you can post blogs', async () => {
  const getResponse = await api.get('/api/blogs/')
  const oldLength = getResponse.body.length

  const response = await api
    .post('/api/blogs/')
    .send({ title: 'post test', author: 'node:test', url: 'local.test', likes: 0 })

  const getNewResponse = await api.get('/api/blogs/')
  const newLength = getNewResponse.body.length

  assert.strictEqual(oldLength + 1, newLength)
  assert.strictEqual(response.status, 201)
  assert.strictEqual(response.body['title'], 'post test')
  assert.strictEqual(response.body['author'], 'node:test')
  assert.strictEqual(response.body['url'], 'local.test')
  assert.strictEqual(response.body['likes'], 0)
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
