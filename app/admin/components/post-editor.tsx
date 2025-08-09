"use client"

import { useState, useEffect } from "react"
import { Save, Eye, ArrowLeft } from "lucide-react"
import type { BlogPost } from "../../lib/types"

interface PostEditorProps {
  postId?: string | null
  onSave: () => void
}

export function PostEditor({ postId, onSave }: PostEditorProps) {
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    tags: [],
    published: false,
  })
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (postId) {
      // Load existing post for editing
      // In a real app, this would fetch from your database
      console.log("Loading post:", postId)
    }
  }, [postId])

  const handleSave = async (publish = false) => {
    setSaving(true)

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = post.content?.split(/\s+/).length || 0
    const readTime = Math.max(1, Math.ceil(wordCount / 200))

    const postData = {
      ...post,
      readTime,
      published: publish,
      createdAt: postId ? post.createdAt : new Date(),
      updatedAt: new Date(),
    }

    // In a real app, this would save to your database
    console.log("Saving post:", postData)

    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    setSaving(false)
    onSave()
  }

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    setPost((prev) => ({ ...prev, tags }))
  }

  if (preview) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setPreview(false)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Editor
          </button>
        </div>

        <article className="prose prose-lg prose-slate max-w-none">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-light text-slate-900 leading-tight mb-6">{post.title || "Untitled Post"}</h1>
            <p className="text-xl text-slate-600 font-light leading-relaxed">{post.excerpt || "No excerpt provided"}</p>
          </header>

          <div className="text-slate-700 leading-relaxed space-y-6 font-light text-lg">
            {post.content?.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light text-slate-900">{postId ? "Edit Post" : "Create New Post"}</h2>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setPreview(true)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>

          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
          <input
            type="text"
            value={post.title || ""}
            onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Enter post title..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all duration-300 text-lg"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Excerpt</label>
          <textarea
            value={post.excerpt || ""}
            onChange={(e) => setPost((prev) => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Brief summary of your post..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all duration-300 resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={post.tags?.join(", ") || ""}
            onChange={(e) => handleTagsChange(e.target.value)}
            placeholder="technology, philosophy, life..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all duration-300"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
          <textarea
            value={post.content || ""}
            onChange={(e) => setPost((prev) => ({ ...prev, content: e.target.value }))}
            placeholder="Write your thoughts here..."
            rows={20}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all duration-300 resize-none font-serif leading-relaxed"
          />
        </div>
      </div>
    </div>
  )
}
