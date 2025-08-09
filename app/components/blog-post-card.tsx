"use client"

import Link from "next/link"
import type { BlogPost } from "../lib/types"
import { Clock, User } from "lucide-react"
import { useState } from "react"

interface BlogPostCardProps {
  post: BlogPost
  index: number
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/post/${post.id}`}>
      <article
        className="group cursor-pointer transition-all duration-500 ease-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animationDelay: `${index * 100}ms`,
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
          {/* Post Header */}
          <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
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
              {post.createdAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>

          {/* Post Title */}
          <h2
            className={`
            text-2xl font-light text-slate-900 mb-4 leading-tight
            transition-colors duration-300
            group-hover:text-slate-700
          `}
          >
            {post.title}
          </h2>

          {/* Post Excerpt */}
          <p className="text-slate-600 leading-relaxed font-light text-lg mb-6">{post.excerpt}</p>

          {/* Read More */}
          <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
            <span>Continue reading</span>
            <svg
              className={`
                w-4 h-4 ml-2 transition-transform duration-300
                ${isHovered ? "translate-x-1" : ""}
              `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
