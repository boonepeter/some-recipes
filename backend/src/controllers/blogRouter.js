const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const logger = require('../../utils/logger')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({ ...request.body, user: user._id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const toReturn = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1, id: 1 })
  response.json(toReturn.toJSON())
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id).populate('user', { id: 1 })
  const jBlog = blog.toJSON()

  if (jBlog.user.id !== decodedToken.id) {
    response.status(401).json({ error: 'user is not the creator of that entry' })
  } else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
   }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog.toJSON())
})

blogRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const oldBlog = await Blog.findById(request.params.id)
  oldBlog.comments = oldBlog.comments.concat(body.comment)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, oldBlog, { new: true }).populate('user', { username: 1, name: 1})
  response.json(updatedBlog.toJSON())
})

module.exports = blogRouter