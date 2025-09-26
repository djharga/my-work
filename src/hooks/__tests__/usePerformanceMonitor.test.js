import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePerformanceMonitor, useLazyLoad } from '../usePerformanceMonitor';

// Mock PerformanceObserver
global.PerformanceObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));

describe('usePerformanceMonitor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with empty metrics', () => {
    const { result } = renderHook(() => usePerformanceMonitor());
    
    expect(result.current.metrics).toEqual({});
    expect(typeof result.current.logMetrics).toBe('function');
  });

  it('sets up PerformanceObserver when available', () => {
    renderHook(() => usePerformanceMonitor());
    
    expect(PerformanceObserver).toHaveBeenCalledWith(expect.any(Function));
  });

  it('logs metrics in development mode', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    const { result } = renderHook(() => usePerformanceMonitor());
    result.current.logMetrics();
    
    expect(consoleSpy).toHaveBeenCalledWith('Performance Metrics:', {});
    
    process.env.NODE_ENV = originalEnv;
    consoleSpy.mockRestore();
  });
});

describe('useLazyLoad', () => {
  it('returns a ref object', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useLazyLoad(mockCallback));
    
    expect(result.current).toHaveProperty('current');
  });

  it('sets up IntersectionObserver', () => {
    const mockCallback = vi.fn();
    renderHook(() => useLazyLoad(mockCallback));
    
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        rootMargin: '50px',
      })
    );
  });

  it('accepts custom options', () => {
    const mockCallback = vi.fn();
    const customOptions = { rootMargin: '100px', threshold: 0.5 };
    
    renderHook(() => useLazyLoad(mockCallback, customOptions));
    
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        rootMargin: '100px',
        threshold: 0.5,
      })
    );
  });
});