const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  if (blog.user && blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body

  const blogData = {
    title,
    author,
    url,
    likes,
    user: user ? (user.id || user) : undefined
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogData,
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  if (!comment || comment.trim() === '') {
    return response.status(400).json({ error: 'comment cannot be empty' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  blog.comments = blog.comments ? blog.comments.concat(comment) : [comment]
  const savedBlog = await blog.save()
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })

  response.status(201).json(populatedBlog)
})

module.exports = blogsRouter
