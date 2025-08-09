"use client"

import { memo } from "react"

// Ultra-fast skeleton loader that appears instantly
const AdminSkeleton = memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
    {/* Header skeleton - appears immediately */}
    <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <div className="h-6 w-32 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-40 bg-slate-100 rounded animate-pulse mt-1"></div>
            </div>
            <nav className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-9 w-20 bg-slate-100 rounded-lg animate-pulse"></div>
              ))}
            </nav>
          </div>
          <div className="h-9 w-20 bg-slate-100 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </header>

    {/* Content skeleton */}
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
            <div className="h-5 w-48 bg-slate-200 rounded mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-100 rounded"></div>
              <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
))

AdminSkeleton.displayName = "AdminSkeleton"

// Instant loading screen for perceived performance
const InstantLoader = memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="w-8 h-8 border-2 border-slate-200 rounded-full"></div>
        <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <div className="text-sm text-slate-600 animate-pulse">Loading admin...</div>
    </div>
  </div>
))

InstantLoader.displayName = "InstantLoader"

export { AdminSkeleton, InstantLoader }