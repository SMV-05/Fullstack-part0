import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 8,
    paddingBottom: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 4,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const onLike = () => {
    handleLike(blog)
  }

  const onDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id)
    }
  }

  const isCreator =
    !blog.user ||
    !currentUser ||
    blog.user.username === currentUser.username ||
    blog.user === currentUser.id

  return (
    <div style={blogStyle} className="blog" data-testid="blog-item">
      <div className="blog-header">
        <span className="blog-title">{blog.title}</span>{' '}
        <span className="blog-author">{blog.author}</span>
        <button onClick={toggleVisibility} style={{ marginLeft: 8 }} className="view-button">
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div className="blog-details" style={{ marginTop: 6 }}>
          <div className="blog-url">
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </div>
          <div className="blog-likes">
            <span>likes {blog.likes}</span>
            <button onClick={onLike} style={{ marginLeft: 8 }} className="like-button">
              like
            </button>
          </div>
          <div className="blog-user">
            {blog.user?.name || blog.user?.username || 'anonymous'}
          </div>
          {isCreator && (
            <button
              onClick={onDelete}
              style={{
                backgroundColor: '#008CBA',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                padding: '4px 8px',
                marginTop: 6,
                cursor: 'pointer',
              }}
              className="remove-button"
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        name: PropTypes.string,
      }),
    ]),
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  }),
}

export default Blog
