import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog, commentOnBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [commentText, setCommentText] = useState('')

  const blog = useSelector((state) =>
    state.blogs.find((b) => b.id === id)
  )
  const currentUser = useSelector((state) => state.user)

  if (!blog) {
    return <div>Blog not found</div>
  }

  const isCreator =
    !blog.user ||
    !currentUser ||
    blog.user.username === currentUser.username ||
    blog.user === currentUser.id

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      navigate('/')
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    dispatch(commentOnBlog(blog.id, commentText))
    setCommentText('')
  }

  const containerStyle = {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 8,
    border: '1px solid #e2e8f0',
  }

  const likeBtn = {
    backgroundColor: '#0284c7',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 6,
    marginLeft: 10,
    cursor: 'pointer',
    fontWeight: 600,
  }

  const deleteBtn = {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    marginTop: 12,
  }

  const commentBtn = {
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 600,
    marginLeft: 8,
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ marginTop: 0 }}>
        {blog.title} <span style={{ color: '#64748b' }}>by {blog.author}</span>
      </h2>

      <p>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>

      <p>
        <span>
          <strong>{blog.likes}</strong> likes
        </span>
        <button style={likeBtn} onClick={handleLike}>
          like
        </button>
      </p>

      <p style={{ color: '#64748b' }}>
        added by {blog.user?.name || blog.user?.username || 'anonymous'}
      </p>

      {isCreator && (
        <button style={deleteBtn} onClick={handleDelete}>
          remove blog
        </button>
      )}

      {/* Ejercicio 7.18 y 7.19: Sección de comentarios */}
      <div style={{ marginTop: 35, borderTop: '1px solid #e2e8f0', paddingTop: 20 }}>
        <h3>comments</h3>
        <form onSubmit={handleAddComment}>
          <input
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #cbd5e1',
              width: 250,
            }}
            value={commentText}
            placeholder="write a comment..."
            onChange={({ target }) => setCommentText(target.value)}
          />
          <button style={commentBtn} type="submit">
            add comment
          </button>
        </form>

        {blog.comments && blog.comments.length > 0 ? (
          <ul style={{ marginTop: 15, paddingLeft: 20 }}>
            {blog.comments.map((c, index) => (
              <li key={index} style={{ marginBottom: 6 }}>
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#94a3b8', fontStyle: 'italic', marginTop: 15 }}>
            No comments yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default BlogView
