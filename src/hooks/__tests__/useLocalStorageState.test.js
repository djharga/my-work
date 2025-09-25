import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorageState from '../useLocalStorageState';

describe('useLocalStorageState', () => {
  const KEY = 'test_key_v1';

  beforeEach(() => {
    window.localStorage.removeItem(KEY);
  });

  afterEach(() => {
    window.localStorage.removeItem(KEY);
  });

  it('initializes with default and persists changes', () => {
    const { result } = renderHook(() => useLocalStorageState(KEY, { a: 1 }));

    // initial state
    expect(result.current[0]).toEqual({ a: 1 });

    // update state
    act(() => {
      result.current[1]({ a: 2 });
    });

    // localStorage should have been updated
    const raw = window.localStorage.getItem(KEY);
    expect(JSON.parse(raw)).toEqual({ a: 2 });
  });
}); 