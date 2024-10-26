import { Router } from 'express'
const userRouter = Router()

import bcrypt from 'bcrypt'
import User from '../models/user.js'

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

export default userRouter
