import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

import UsersView from './views/UsersView'
import UserView from './views/UserView'
import BlogView from './views/BlogView'

import { initializeUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

const Home = ({ blogFormRef }) => (
  <div>
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        onBlogCreated={() => {
          if (blogFormRef.current) {
            blogFormRef.current.toggleVisibility()
          }
        }}
      />
    </Togglable>
    <BlogList />
  </div>
)

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) {
    return (
      <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '20px auto',
        fontFamily: 'sans-serif',
        padding: '0 15px',
      }}
    >
      <Navigation />
      <h2>blog app</h2>
      <Notification />

      <Routes>
        <Route path="/" element={<Home blogFormRef={blogFormRef} />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  )
}

export default App
