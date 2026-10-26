// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((prev, current) => {
    return (current.likes || 0) > (prev.likes || 0) ? current : prev
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const counts = {}
  blogs.forEach(blog => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })

  let maxAuthor = ''
  let maxCount = 0

  for (const author in counts) {
    if (counts[author] > maxCount) {
      maxCount = counts[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: maxCount
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesCount = {}
  blogs.forEach(blog => {
    likesCount[blog.author] = (likesCount[blog.author] || 0) + (blog.likes || 0)
  })

  let maxAuthor = ''
  let maxLikes = 0

  for (const author in likesCount) {
    if (likesCount[author] > maxLikes) {
      maxLikes = likesCount[author]
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
