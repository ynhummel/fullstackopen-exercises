import { test, after, beforeEach, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app.js'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import { authToken, initialBlogPosts } from './test_helper.js'

const api = supertest(app)

describe('when there are some blogs in database', async () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObj = initialBlogPosts.map(blog => new Blog(blog))
    const promiseArray = blogObj.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  afterEach(async () => {
    await Blog.deleteMany({})
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
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
})

describe('POST blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await api
      .post('/api/users/')
      .send({ username: 'test-user', name: 'Tester User', password: 'testpassword' })
      .expect(201)
  })

  afterEach(async () => {
    await Blog.deleteMany({})
  })

  test('you can post blogs', async () => {
    const token = await authToken()
    const getResponse = await api.get('/api/blogs/')
    const oldLength = getResponse.body.length

    const response = await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'post test', author: 'node:test', url: 'local.test', likes: 1 })

    const getNewResponse = await api.get('/api/blogs/')
    const newLength = getNewResponse.body.length

    assert.strictEqual(oldLength + 1, newLength)
    assert.strictEqual(response.status, 201)
    assert.strictEqual(response.body['title'], 'post test')
    assert.strictEqual(response.body['author'], 'node:test')
    assert.strictEqual(response.body['url'], 'local.test')
    assert.strictEqual(response.body['likes'], 1)
  })

  test('request without title or url should return 400', async () => {
    const token = await authToken()
    await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${token}`)
      .send({ author: 'node:test', url: 'local.test' })
      .expect(400)

    await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'post test', author: 'node:test' })
      .expect(400)
  })

  test('likes default to zero', async () => {
    const token = await authToken()
    const response = await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'post test', author: 'node:test', url: 'local.test' })

    assert.strictEqual(response.body['likes'], 0)
  })
})

describe('DELETE blog', () => {
  beforeEach(async () => {
    const token = await authToken()
    await Blog.deleteMany({})
    await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'post test', author: 'node:test', url: 'local.test', likes: 1 })
  })

  test('can delete blog posts', async () => {
    const token = await authToken()
    const response = await api.get('/api/blogs/')

    await api
      .delete(`/api/blogs/${response.body[0]['id']}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })
})

describe('PUT blog', () => {
  beforeEach(async () => {
    const token = await authToken()
    await Blog.deleteMany({})
    await api
      .post('/api/blogs/')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'post test', author: 'node:test', url: 'local.test', likes: 1 })
  })

  afterEach(async () => {
    await Blog.deleteMany({})
  })

  test('can update blog posts', async () => {
    const token = await authToken()
    const responseCreate = await api.get('/api/blogs/')
    const response = await api
      .put(`/api/blogs/${responseCreate.body[0]['id']}`)
      .send({ title: 'updated title', likes: 1 })
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    assert.strictEqual(response.body['title'], 'updated title')
    assert.strictEqual(response.body['likes'], 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
