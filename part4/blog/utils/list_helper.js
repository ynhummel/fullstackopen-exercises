import pkg from 'lodash'
const { countBy, maxBy, entries } = pkg

const dummy = (blogs) => { return 1 }

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + Number(curr.likes), 0)
}

const favoriteBlog = (blogs) => {
  let mostLiked = { title: '', author: '', likes: 0 }

  blogs.forEach((blog) => {
    if (blog.likes >= mostLiked.likes) {
      mostLiked = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      }
    }
  })

  return mostLiked
}

const mostBlogs = (blogs) => {

  const blogCount = pkg(blogs).countBy('author').entries().maxBy(pkg.last)
  return { author: blogCount[0], blogs: blogCount[1] }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs }
