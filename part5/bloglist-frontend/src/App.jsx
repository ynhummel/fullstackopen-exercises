import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs.js'
import loginService from './services/login.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getByUser(user.username)
      setBlogs(blogs)
    })()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong Credentials', username, password)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
                    username <input type='text'
            value={username} name='Username'
            onChange={(event) => { setUsername(event.target.value) }} />
        </div>
        <div>
                    password <input type='text'
            value={password} name='Password'
            onChange={(event) => { setPassword(event.target.value) }} />
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  const blogView = () => {
    return (
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }

  return (
    < div >
      <h2>blogs</h2>
      {user === null ? loginForm() : blogView()}
    </div >
  )
}

export default App
