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

export default { dummy, totalLikes, favoriteBlog }
