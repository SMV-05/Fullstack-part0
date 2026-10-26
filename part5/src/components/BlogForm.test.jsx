import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  // Ejercicio 5.16
  test('calls createBlog with the right details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write blog title here')
    const authorInput = screen.getByPlaceholderText('write blog author here')
    const urlInput = screen.getByPlaceholderText('write blog url here')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Canonical string reduction')
    await user.type(authorInput, 'Edsger W. Dijkstra')
    await user.type(urlInput, 'http://www.cs.utexas.edu')
    await user.click(sendButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu',
    })
  })
})
