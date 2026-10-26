import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ onBlogCreated }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(createBlog({ title, author, url }))
      setTitle('')
      setAuthor('')
      setUrl('')
      if (onBlogCreated) {
        onBlogCreated()
      }
    } catch {
      // Notification handled in slice
    }
  }

  const containerStyle = {
    padding: 20,
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    maxWidth: 500,
    marginBottom: 20,
  }

  const inputGroup = {
    marginBottom: 12,
  }

  const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    borderRadius: 5,
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box',
    marginTop: 4,
  }

  const submitBtn = {
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 600,
  }

  return (
    <div style={containerStyle}>
      <h3 style={{ marginTop: 0 }}>Create a new blog</h3>
      <form onSubmit={handleSubmit}>
        <div style={inputGroup}>
          <label>title:</label>
          <input
            style={inputStyle}
            type="text"
            value={title}
            placeholder="write blog title here"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div style={inputGroup}>
          <label>author:</label>
          <input
            style={inputStyle}
            type="text"
            value={author}
            placeholder="write blog author here"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div style={inputGroup}>
          <label>url:</label>
          <input
            style={inputStyle}
            type="text"
            value={url}
            placeholder="write blog url here"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button style={submitBtn} type="submit">
          create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onBlogCreated: PropTypes.func,
}

export default BlogForm
