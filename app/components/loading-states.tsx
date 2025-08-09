import { Skeleton } from "@/components/ui/skeleton"

export function BlogPostSkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-1 w-1 rounded-full" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-1 w-1 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
      
      {/* Title skeleton */}
      <Skeleton className="h-8 w-4/5 mb-4" />
      
      {/* Content skeleton */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Read more skeleton */}
      <Skeleton className="h-4 w-32" />
    </div>
  )
}

export function BlogPostListSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </div>
  )
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      {/* Header skeleton */}
      <header className="border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-6">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <BlogPostListSkeleton />
      </main>
    </div>
  )
}

export function AdminLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-8 h-8 border-2 border-slate-200 rounded-full"></div>
          <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-sm text-slate-600">Loading...</p>
      </div>
    </div>
  )
}