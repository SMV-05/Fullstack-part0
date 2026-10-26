import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="blog-title">title:</label>
          <input
            id="blog-title"
            type="text"
            value={title}
            name="title"
            placeholder="write blog title here"
            data-testid="blog-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="blog-author">author:</label>
          <input
            id="blog-author"
            type="text"
            value={author}
            name="author"
            placeholder="write blog author here"
            data-testid="blog-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="blog-url">url:</label>
          <input
            id="blog-url"
            type="text"
            value={url}
            name="url"
            placeholder="write blog url here"
            data-testid="blog-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-blog-button">
          create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
