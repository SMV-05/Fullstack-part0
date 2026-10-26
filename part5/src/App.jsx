import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      return user
    }
    return null
  })
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
      } catch (exception) {
        console.error('Error fetching blogs:', exception)
      }
    }
    fetchBlogs()
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      notify(`Welcome back, ${loggedUser.name}!`)
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    notify('Logged out successfully')
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs((prevBlogs) =>
        prevBlogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes)
      )
      if (blogFormRef.current) {
        blogFormRef.current.toggleVisibility()
      }
      notify(`a new blog '${returnedBlog.title}' by ${returnedBlog.author} added`)
    } catch {
      notify('failed to create blog, please check the fields', 'error')
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: (blog.likes || 0) + 1,
        user: blog.user?.id || blog.user,
      }
      const returnedBlog = await blogService.update(blog.id, updatedObject)
      setBlogs((prevBlogs) =>
        prevBlogs
          .map((b) => (b.id === blog.id ? { ...b, likes: returnedBlog.likes } : b))
          .sort((a, b) => b.likes - a.likes)
      )
    } catch {
      notify('error updating likes', 'error')
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== id))
      notify('blog removed successfully')
    } catch {
      notify('error deleting blog', 'error')
    }
  }

  if (user === null) {
    return (
      <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'sans-serif' }}>
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 650, margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>blogs</h2>
      <Notification notification={notification} />

      <p style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout} id="logout-button">
          logout
        </button>
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <div style={{ marginTop: 20 }} className="blog-list">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            currentUser={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
