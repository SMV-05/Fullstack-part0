import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useField } from './index'

describe('ultimate-hooks useField', () => {
  test('updates value on onChange and resets on reset', () => {
    const { result } = renderHook(() => useField('text'))
    act(() => {
      result.current.onChange({ target: { value: 'some content' } })
    })
    expect(result.current.value).toBe('some content')

    act(() => {
      result.current.reset()
    })
    expect(result.current.value).toBe('')
  })
})
