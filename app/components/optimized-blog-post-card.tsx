"use client"

import Link from "next/link"
import { memo, useState, useCallback } from "react"
import type { BlogPost } from "../lib/types"
import { Clock, User } from "lucide-react"

interface BlogPostCardProps {
  post: BlogPost
  index: number
}

// Optimized BlogPostCard with memoization
export const OptimizedBlogPostCard = memo(({ post, index }: BlogPostCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  // Memoized handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  // Memoized date formatting
  const formattedDate = post.createdAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link href={`/post/${post.id}`} className="block">
      <article
        className="group cursor-pointer transition-all duration-500 ease-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          animationDelay: `${index * 50}ms`, // Reduced delay for faster perceived loading
        }}
      >
        <div
          className={`
          bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60
          shadow-sm hover:shadow-xl hover:shadow-slate-200/50
          transform transition-all duration-500 ease-out
          hover:-translate-y-1 hover:scale-[1.02]
          ${isHovered ? "bg-white/90" : ""}
        `}
        >
          {/* Optimized Post Header */}
          <header className="flex items-center gap-3 mb-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span className="font-medium">Taji Rho</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <time dateTime={post.createdAt.toISOString()}>
              {formattedDate}
            </time>
          </header>

          {/* Post Title */}
          <h2 className="text-2xl font-light text-slate-900 mb-4 leading-tight transition-colors duration-300 group-hover:text-slate-700">
            {post.title}
          </h2>

          {/* Post Excerpt */}
          <p className="text-slate-600 leading-relaxed font-light text-lg mb-6">
            {post.excerpt}
          </p>

          {/* Optimized Read More */}
          <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
            <span>Continue reading</span>
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
})

OptimizedBlogPostCard.displayName = "OptimizedBlogPostCard"