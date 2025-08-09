// Performance monitoring and optimization utilities

// Simple performance cache for frequently accessed data
class PerformanceCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    const isExpired = Date.now() - item.timestamp > item.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

// Global performance cache instance
export const perfCache = new PerformanceCache()

// Performance measurement utilities
export const perf = {
  // Measure component render time
  measureRender: (componentName: string, fn: () => any) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now()
      const result = fn()
      const end = performance.now()
      console.log(`🚀 ${componentName} render time: ${(end - start).toFixed(2)}ms`)
      return result
    }
    return fn()
  },

  // Mark performance milestones
  mark: (name: string) => {
    if (typeof window !== 'undefined' && window.performance?.mark) {
      performance.mark(name)
    }
  },

  // Measure between two marks
  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof window !== 'undefined' && window.performance?.measure) {
      try {
        performance.measure(name, startMark, endMark)
        const measure = performance.getEntriesByName(name)[0] as PerformanceMeasure
        if (process.env.NODE_ENV === 'development') {
          console.log(`⚡ ${name}: ${measure.duration.toFixed(2)}ms`)
        }
        return measure.duration
      } catch (error) {
        console.warn('Performance measurement failed:', error)
      }
    }
    return 0
  },

  // Get page load metrics
  getPageMetrics: () => {
    if (typeof window === 'undefined') return null

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (!navigation) return null

    return {
      // Time to First Byte
      ttfb: navigation.responseStart - navigation.fetchStart,
      // DOM Content Loaded
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      // Load Complete
      loadComplete: navigation.loadEventEnd - navigation.fetchStart,
      // First Paint (if available)
      firstPaint: (() => {
        const paintEntries = performance.getEntriesByType('paint')
        const fp = paintEntries.find(entry => entry.name === 'first-paint')
        return fp ? fp.startTime : null
      })(),
      // First Contentful Paint (if available)
      firstContentfulPaint: (() => {
        const paintEntries = performance.getEntriesByType('paint')
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
        return fcp ? fcp.startTime : null
      })(),
    }
  },

  // Log performance metrics (development only)
  logMetrics: () => {
    if (process.env.NODE_ENV !== 'development') return

    setTimeout(() => {
      const metrics = perf.getPageMetrics()
      if (metrics) {
        console.group('🔥 Performance Metrics')
        console.log(`TTFB: ${metrics.ttfb?.toFixed(2)}ms`)
        console.log(`DOM Content Loaded: ${metrics.domContentLoaded?.toFixed(2)}ms`)
        console.log(`Load Complete: ${metrics.loadComplete?.toFixed(2)}ms`)
        if (metrics.firstPaint) {
          console.log(`First Paint: ${metrics.firstPaint.toFixed(2)}ms`)
        }
        if (metrics.firstContentfulPaint) {
          console.log(`First Contentful Paint: ${metrics.firstContentfulPaint.toFixed(2)}ms`)
        }
        console.groupEnd()
      }
    }, 1000)
  }
}

// React performance hooks
export const usePerformanceMonitor = (componentName: string) => {
  if (process.env.NODE_ENV === 'development') {
    perf.mark(`${componentName}-start`)
    
    return {
      end: () => {
        perf.mark(`${componentName}-end`)
        perf.measure(`${componentName}-duration`, `${componentName}-start`, `${componentName}-end`)
      }
    }
  }
  
  return { end: () => {} }
}

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}