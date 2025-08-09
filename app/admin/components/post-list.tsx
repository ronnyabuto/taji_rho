"use client"

import { useState } from "react"
import { Edit, Trash2, Eye, Calendar, Clock } from "lucide-react"
import type { BlogPost } from "../../lib/types"

interface PostListProps {
  onEditPost: (postId: string) => void
}

// Mock data - in a real app, this would come from your database
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Digital Minimalism",
    excerpt:
      "In a world saturated with digital noise, the pursuit of simplicity becomes not just a preference, but a necessity for mental clarity and creative focus.",
    content: "Lorem ipsum...",
    createdAt: new Date("2024-01-15"),
    readTime: 8,
    author: "Taji Rho",
    published: true,
    views: 1250,
    tags: ["minimalism", "technology", "productivity"],
  },
  {
    id: "2",
    title: "Thoughts on the Future of Human Connection",
    excerpt:
      "As technology advances, we find ourselves at a crossroads between digital convenience and authentic human interaction.",
    content: "Lorem ipsum...",
    createdAt: new Date("2024-01-12"),
    readTime: 12,
    author: "Taji Rho",
    published: true,
    views: 890,
    tags: ["technology", "relationships", "society"],
  },
  {
    id: "3",
    title: "Draft: The Philosophy of Anonymous Expression",
    excerpt:
      "When we remove the weight of identity from our words, what remains is the pure essence of thought and feeling.",
    content: "Lorem ipsum...",
    createdAt: new Date("2024-01-10"),
    readTime: 6,
    author: "Taji Rho",
    published: false,
    views: 0,
    tags: ["philosophy", "writing", "identity"],
  },
]

export function PostList({ onEditPost }: PostListProps) {
  const [posts] = useState<BlogPost[]>(mockPosts)
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")

  const filteredPosts = posts.filter((post) => {
    if (filter === "published") return post.published
    if (filter === "draft") return !post.published
    return true
  })

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      // In a real app, this would delete from your database
      console.log("Deleting post:", postId)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light text-slate-900">Posts</h2>

        <div className="flex items-center gap-2">
          {["all", "published", "draft"].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as typeof filter)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
                ${
                  filter === filterOption
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }
              `}
            >
              {filterOption}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-slate-900">{post.title}</h3>
                  {!post.published && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Draft</span>
                  )}
                </div>

                <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                  {post.published && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views} views</span>
                    </div>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                {post.published && (
                  <a
                    href={`/post/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    title="View post"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => onEditPost(post.id)}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  title="Edit post"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No posts found for the selected filter.</p>
        </div>
      )}
    </div>
  )
}
