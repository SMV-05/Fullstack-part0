import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useField } from './index'

describe('useField custom hook', () => {
  test('initializes with empty string value and given type', () => {
    const { result } = renderHook(() => useField('text'))
    expect(result.current.value).toBe('')
    expect(result.current.type).toBe('text')
  })

  test('onChange updates value', () => {
    const { result } = renderHook(() => useField('text'))
    act(() => {
      result.current.onChange({ target: { value: 'testing hook' } })
    })
    expect(result.current.value).toBe('testing hook')
  })

  test('reset clears value', () => {
    const { result } = renderHook(() => useField('text'))
    act(() => {
      result.current.onChange({ target: { value: 'testing hook' } })
    })
    expect(result.current.value).toBe('testing hook')

    act(() => {
      result.current.reset()
    })
    expect(result.current.value).toBe('')
  })
})
