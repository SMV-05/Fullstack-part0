import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useField } from './index'

describe('country-hook useField', () => {
  test('updates value on onChange', () => {
    const { result } = renderHook(() => useField('text'))
    act(() => {
      result.current.onChange({ target: { value: 'colombia' } })
    })
    expect(result.current.value).toBe('colombia')
  })
})
