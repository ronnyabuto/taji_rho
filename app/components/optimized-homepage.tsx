"use client"

import { Suspense, memo, useMemo } from "react"
import Link from "next/link"
import { Twitter, Mail, Rss } from "lucide-react"
import { OptimizedBlogPostCard } from "./optimized-blog-post-card"
import { SearchBar } from "./search-bar"
import { NewsletterSignup } from "./newsletter-signup"
import { ThemeToggle } from "./theme-toggle"
import { ErrorBoundary } from "./error-boundary"
import { BlogPostListSkeleton } from "../components/loading-states"
import type { BlogPost } from "../lib/types"

interface OptimizedHomepageProps {
  blogPosts: BlogPost[]
}

// Memoized header component
const OptimizedHeader = memo(({ blogPosts }: { blogPosts: BlogPost[] }) => (
  <header className="border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
    <div className="max-w-4xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-light tracking-tight text-slate-900 dark:text-white">
            Taji Rho
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
            Thoughts, reflections, and observations
          </p>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            About
          </Link>
          <Link
            href="/archive"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Archive
          </Link>
          <ThemeToggle />
        </nav>
      </div>

      <SearchBar posts={blogPosts} />
    </div>
  </header>
))

OptimizedHeader.displayName = "OptimizedHeader"

// Memoized blog post list
const OptimizedBlogPostsList = memo(({ posts }: { posts: BlogPost[] }) => (
  <div className="space-y-8">
    {posts.map((post, index) => (
      <OptimizedBlogPostCard key={post.id} post={post} index={index} />
    ))}
  </div>
))

OptimizedBlogPostsList.displayName = "OptimizedBlogPostsList"

// Memoized footer component
const OptimizedFooter = memo(() => (
  <footer className="border-t border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mt-24">
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-8">
          <a
            href="https://twitter.com/tajirho"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Follow on X (Twitter)"
          >
            <Twitter className="w-6 h-6" />
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Follow
            </span>
          </a>
          <a
            href="mailto:hello@tajirho.com"
            className="group flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Send email"
          >
            <Mail className="w-6 h-6" />
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Email
            </span>
          </a>
          <a
            href="/rss.xml"
            className="group flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="RSS Feed"
          >
            <Rss className="w-6 h-6" />
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              RSS
            </span>
          </a>
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>

        <p className="text-sm text-slate-400 dark:text-slate-500 font-light text-center">
          © 2024 Taji Rho. All thoughts shared with intention.
        </p>
      </div>
    </div>
  </footer>
))

OptimizedFooter.displayName = "OptimizedFooter"

// Main optimized homepage component
export const OptimizedHomepage = memo(({ blogPosts }: OptimizedHomepageProps) => {
  // Memoize posts to prevent unnecessary re-renders
  const memoizedPosts = useMemo(() => blogPosts, [blogPosts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <OptimizedHeader blogPosts={memoizedPosts} />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <ErrorBoundary>
          <Suspense fallback={<BlogPostListSkeleton />}>
            <OptimizedBlogPostsList posts={memoizedPosts} />
          </Suspense>
        </ErrorBoundary>

        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </main>

      <OptimizedFooter />
    </div>
  )
})

OptimizedHomepage.displayName = "OptimizedHomepage"