const dummy = (blogs) => { return 1 }

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + Number(curr.likes), 0)
}

export default { dummy, totalLikes }
