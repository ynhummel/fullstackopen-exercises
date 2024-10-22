import _ from 'lodash'

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

  const blogCount = _(blogs).countBy('author').entries().maxBy(_.last)
  return { author: blogCount[0], blogs: blogCount[1] }
}

const mostLikes = (blogs) => {

  const likesCount = _(blogs)
    .groupBy('author')
    .mapValues(blogs => _.sumBy(blogs, 'likes'))
    .entries()
    .maxBy(_.last)

  return { author: likesCount[0], likes: likesCount[1] }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
