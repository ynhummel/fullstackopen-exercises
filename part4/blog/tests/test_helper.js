import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const initialBlogPosts = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const authToken = async () => {
  const user = await User.find({})
  const userForToken = {
    username: user[0].username,
    id: user[0]._id,
  }
  return jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 5 })
}

export { initialBlogPosts, authToken }
