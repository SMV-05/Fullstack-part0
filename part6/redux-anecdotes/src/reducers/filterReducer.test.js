import deepFreeze from 'deep-freeze'
import { describe, test, expect } from 'vitest'
import filterReducer, { filterChange } from './filterReducer'

describe('filterReducer', () => {
  test('updates filter state correctly', () => {
    const state = ''
    deepFreeze(state)
    const newState = filterReducer(state, filterChange('react'))
    expect(newState).toBe('react')
  })
})
