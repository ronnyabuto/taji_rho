class PerformanceCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000

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

export const perfCache = new PerformanceCache()

export const perf = {
  measureRender: (componentName: string, fn: () => any) => {
    if (process.env.NODE_ENV === "development") {
      const start = performance.now()
      const result = fn()
      const end = performance.now()
      console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`)
      return result
    }
    return fn()
  },

  mark: (name: string) => {
    if (typeof window !== "undefined" && window.performance) {
      performance.mark(name)
    }
  },

  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof window !== "undefined" && window.performance) {
      try {
        performance.measure(name, startMark, endMark)
        const measure = performance.getEntriesByName(name)[0] as PerformanceMeasure
        if (process.env.NODE_ENV === "development") {
          console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
        }
        return measure.duration
      } catch (error) {
        console.warn("Performance measurement failed:", error)
      }
    }
    return 0
  },

  getPageMetrics: () => {
    if (typeof window === "undefined") return null

    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    if (!navigation) return null

    return {
      ttfb: navigation.responseStart - navigation.fetchStart,

      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,

      loadComplete: navigation.loadEventEnd - navigation.fetchStart,

      firstPaint: (() => {
        const paintEntries = performance.getEntriesByType("paint")
        const fp = paintEntries.find(entry => entry.name === "first-paint")
        return fp ? fp.startTime : null
      })(),

      firstContentfulPaint: (() => {
        const paintEntries = performance.getEntriesByType("paint")
        const fcp = paintEntries.find(entry => entry.name === "first-contentful-paint")
        return fcp ? fcp.startTime : null
      })(),
    }
  },

  logMetrics: () => {
    if (process.env.NODE_ENV !== "development") return

    setTimeout(() => {
      const metrics = perf.getPageMetrics()
      if (metrics) {
        console.group("Performance Metrics")
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
  },
}

export const usePerformanceMonitor = (componentName: string) => {
  if (process.env.NODE_ENV === "development") {
    perf.mark(`${componentName}-start`)

    return {
      end: () => {
        perf.mark(`${componentName}-end`)
        perf.measure(`${componentName}-duration`, `${componentName}-start`, `${componentName}-end`)
      },
    }
  }

  return { end: () => { } }
}

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

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
