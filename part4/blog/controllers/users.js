import { Router } from 'express'
const userRouter = Router()

import bcrypt from 'bcrypt'
import User from '../models/user.js'

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogPosts', { url: 1, title: 1, author: 1 })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body
  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'password is required and must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

export default userRouter
