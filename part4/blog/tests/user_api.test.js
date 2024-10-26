import { test, after, beforeEach, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app.js'
import User from '../models/user.js'

const api = supertest(app)

describe('Creating a new user', async () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('valid user', async () => {
    await api
      .post('/api/users/')
      .send({ username: 'test-user', name: 'Tester User', password: 'testpassword' })
      .expect(201)

    const users = await User.find({})
    assert.strictEqual(users.length, 1)
  })
})

describe('Fetching users', async () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('list', async () => {
    await api
      .post('/api/users/')
      .send({ username: 'test-user', name: 'Tester User', password: 'testpassword' })

    const resp = await api
      .get('/api/users/')
      .expect(200)

    assert.strictEqual(resp.body.length, 1)
    assert.strictEqual(resp.body[0].name, 'Tester User')
  })
})

after(async () => {
  await mongoose.connection.close()
})
