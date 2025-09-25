import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = () => {
  const metricsRef = useRef({});

  useEffect(() => {
    // Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            metricsRef.current.fcp = entry.startTime;
          } else if (entry.name === 'largest-contentful-paint') {
            metricsRef.current.lcp = entry.startTime;
          }
        }
      });

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

      // Cleanup
      return () => observer.disconnect();
    }

    // Navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          metricsRef.current.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          metricsRef.current.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        }
      }, 0);
    });
  }, []);

  const logMetrics = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', metricsRef.current);
    }
  };

  return { metrics: metricsRef.current, logMetrics };
};

// Resource loading optimization
export const preloadCriticalResources = () => {
  const preloadLink = (href, as, type = '') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  };

  // Preload critical fonts if any
  // preloadLink('/fonts/inter.woff2', 'font', 'font/woff2');
  
  // Preload critical images
  const criticalImages = [
    '/assets/hero-800.webp',
    '/assets/hero-400.webp',
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Intersection Observer for lazy loading
export const useLazyLoad = (callback, options = {}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px',
        ...options,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [callback, options]);

  return targetRef;
};