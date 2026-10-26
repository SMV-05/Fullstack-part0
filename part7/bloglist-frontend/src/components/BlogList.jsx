import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 15,
  }

  const itemStyle = {
    padding: '14px 18px',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    textDecoration: 'none',
    color: '#1e293b',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  }

  return (
    <div style={listStyle}>
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          to={`/blogs/${blog.id}`}
          style={itemStyle}
          className="blog-link"
        >
          <span>
            <strong>{blog.title}</strong>{' '}
            <span style={{ color: '#64748b' }}>by {blog.author}</span>
          </span>
          <span style={{ fontSize: 13, color: '#0284c7', fontWeight: 600 }}>
            {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default BlogList
