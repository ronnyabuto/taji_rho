import Link from "next/link"
import type { BlogPost } from "../lib/types"
import { Clock } from "lucide-react"

interface RelatedPostsProps {
  currentPost: BlogPost
  allPosts: BlogPost[]
}

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  // Simple content similarity algorithm
  const getRelatedPosts = (current: BlogPost, posts: BlogPost[]): BlogPost[] => {
    const currentWords = new Set([
      ...current.title.toLowerCase().split(/\s+/),
      ...current.excerpt.toLowerCase().split(/\s+/),
      ...(current.tags || []).map((tag) => tag.toLowerCase()),
    ])

    const scored = posts
      .filter((post) => post.id !== current.id)
      .map((post) => {
        const postWords = new Set([
          ...post.title.toLowerCase().split(/\s+/),
          ...post.excerpt.toLowerCase().split(/\s+/),
          ...(post.tags || []).map((tag) => tag.toLowerCase()),
        ])

        const intersection = new Set([...currentWords].filter((word) => postWords.has(word)))
        const similarity = intersection.size / Math.max(currentWords.size, postWords.size)

        return { post, similarity }
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)

    return scored.map((item) => item.post)
  }

  const relatedPosts = getRelatedPosts(currentPost, allPosts)

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t border-slate-200/60">
      <h2 className="text-2xl font-light text-slate-900 mb-8 text-center">Related Thoughts</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <article className="group cursor-pointer">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 h-full">
                <h3 className="font-medium text-slate-900 mb-2 group-hover:text-slate-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
