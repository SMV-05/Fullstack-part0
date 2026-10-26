import { describe, test, expect } from 'vitest'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

describe('NotificationContext reducer', () => {
  test('handles SET action', () => {
    const state = null
    const action = { type: 'SET', payload: 'New notification' }
    const newState = notificationReducer(state, action)
    expect(newState).toBe('New notification')
  })

  test('handles CLEAR action', () => {
    const state = 'Active notification'
    const action = { type: 'CLEAR' }
    const newState = notificationReducer(state, action)
    expect(newState).toBeNull()
  })

  test('handles unknown action', () => {
    const state = 'Existing'
    const action = { type: 'UNKNOWN' }
    const newState = notificationReducer(state, action)
    expect(newState).toBe('Existing')
  })
})
