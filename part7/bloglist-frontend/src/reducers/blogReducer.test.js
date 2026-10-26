import { describe, test, expect } from 'vitest'
import blogReducer, {
  setBlogs,
  appendBlog,
  updateBlog,
  deleteBlog,
} from './blogReducer'

describe('blogReducer', () => {
  test('returns initial state with unknown action', () => {
    expect(blogReducer(undefined, { type: 'unknown' })).toEqual([])
  })

  test('setBlogs sets blog list', () => {
    const blogs = [
      { id: '1', title: 'Blog 1', author: 'Author 1', likes: 10 },
      { id: '2', title: 'Blog 2', author: 'Author 2', likes: 5 },
    ]
    const state = blogReducer([], setBlogs(blogs))
    expect(state).toEqual(blogs)
  })

  test('appendBlog appends a new blog', () => {
    const initial = [{ id: '1', title: 'Blog 1', author: 'Author 1', likes: 10 }]
    const newBlog = { id: '2', title: 'Blog 2', author: 'Author 2', likes: 0 }
    const state = blogReducer(initial, appendBlog(newBlog))
    expect(state).toHaveLength(2)
    expect(state).toContainEqual(newBlog)
  })

  test('updateBlog updates a blog (likes or comments)', () => {
    const initial = [
      { id: '1', title: 'Blog 1', likes: 0, comments: [] },
      { id: '2', title: 'Blog 2', likes: 5, comments: [] },
    ]
    const updated = {
      id: '1',
      title: 'Blog 1',
      likes: 1,
      comments: ['Great post!'],
    }
    const state = blogReducer(initial, updateBlog(updated))
    expect(state[0].likes).toBe(1)
    expect(state[0].comments).toEqual(['Great post!'])
  })

  test('deleteBlog removes blog by id', () => {
    const initial = [
      { id: '1', title: 'Blog 1' },
      { id: '2', title: 'Blog 2' },
    ]
    const state = blogReducer(initial, deleteBlog('1'))
    expect(state).toHaveLength(1)
    expect(state[0].id).toBe('2')
  })
})
