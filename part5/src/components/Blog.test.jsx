import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      id: '5a422aa71b54a676234d17f8',
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  }

  const currentUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    id: '5a422aa71b54a676234d17f8',
  }

  // Ejercicio 5.13
  test('renders title and author, but does not render url or likes by default', () => {
    const { container } = render(
      <Blog
        blog={blog}
        handleLike={vi.fn()}
        handleDelete={vi.fn()}
        currentUser={currentUser}
      />
    )

    expect(screen.getByText('React patterns')).toBeInTheDocument()
    expect(screen.getByText('Michael Chan')).toBeInTheDocument()

    const details = container.querySelector('.blog-details')
    expect(details).toBeNull()
  })

  // Ejercicio 5.14
  test('renders url and number of likes when the view button has been clicked', async () => {
    const user = userEvent.setup()

    render(
      <Blog
        blog={blog}
        handleLike={vi.fn()}
        handleDelete={vi.fn()}
        currentUser={currentUser}
      />
    )

    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('https://reactpatterns.com/')).toBeInTheDocument()
    expect(screen.getByText('likes 7')).toBeInTheDocument()
  })

  // Ejercicio 5.15
  test('clicking the like button twice calls the event handler twice', async () => {
    const mockLikeHandler = vi.fn()
    const user = userEvent.setup()

    render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={vi.fn()}
        currentUser={currentUser}
      />
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })
})
