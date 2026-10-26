import deepFreeze from 'deep-freeze'
import { describe, test, expect } from 'vitest'
import anecdoteReducer, {
  appendAnecdote,
  setAnecdotes,
  voteAnecdote,
} from './anecdoteReducer'

describe('anecdoteReducer', () => {
  test('returns new state with action setAnecdotes', () => {
    const state = []
    const anecdotes = [
      { id: '1', content: 'First anecdote', votes: 0 },
      { id: '2', content: 'Second anecdote', votes: 2 },
    ]

    deepFreeze(state)
    const newState = anecdoteReducer(state, setAnecdotes(anecdotes))
    expect(newState).toEqual(anecdotes)
  })

  test('returns new state with action appendAnecdote', () => {
    const state = [{ id: '1', content: 'First anecdote', votes: 0 }]
    const newAnecdote = { id: '2', content: 'Second anecdote', votes: 0 }

    deepFreeze(state)
    const newState = anecdoteReducer(state, appendAnecdote(newAnecdote))
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(newAnecdote)
  })

  test('returns new state with action voteAnecdote', () => {
    const state = [
      { id: '1', content: 'First anecdote', votes: 0 },
      { id: '2', content: 'Second anecdote', votes: 2 },
    ]
    const updated = { id: '1', content: 'First anecdote', votes: 1 }

    deepFreeze(state)
    const newState = anecdoteReducer(state, voteAnecdote(updated))
    expect(newState).toEqual([
      { id: '1', content: 'First anecdote', votes: 1 },
      { id: '2', content: 'Second anecdote', votes: 2 },
    ])
  })
})
