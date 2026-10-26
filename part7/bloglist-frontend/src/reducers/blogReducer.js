import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updated = action.payload
      return state.map((b) => (b.id === updated.id ? updated : b))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          `a new blog '${newBlog.title}' by ${newBlog.author} added`,
          'success'
        )
      )
      return newBlog
    } catch (error) {
      dispatch(setNotification('error creating blog', 'error'))
      throw error
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updated = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user?.id || blog.user,
    }
    const returned = await blogService.update(blog.id, updated)
    dispatch(updateBlog(returned))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
    dispatch(setNotification('blog removed successfully', 'success'))
  }
}

export const commentOnBlog = (id, comment) => {
  return async (dispatch) => {
    const returned = await blogService.addComment(id, comment)
    dispatch(updateBlog(returned))
    dispatch(setNotification(`added comment: "${comment}"`, 'success'))
  }
}

export default blogSlice.reducer
