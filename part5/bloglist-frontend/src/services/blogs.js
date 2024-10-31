import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getByUser = async (username) => {
  const data = await getAll()
  return data.filter(b => b.user.username === username)
}

export default { getAll, getByUser }
