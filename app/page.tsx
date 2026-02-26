import { Suspense } from "react"
import { BlogPostListSkeleton } from "./components/loading-states"
import { OptimizedHomepage } from "./components/optimized-homepage"
import { generateSEOMetadata, StructuredData } from "./components/seo-head"
import type { BlogPost } from "./lib/types"

if (typeof window !== "undefined") {
  import("./components/optimized-homepage")
  import("./components/optimized-blog-post-card")
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Digital Minimalism",
    excerpt:
      "In a world saturated with digital noise, the pursuit of simplicity becomes not just a preference, but a necessity for mental clarity and creative focus.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date("2024-01-15"),
    readTime: 8,
    author: "Taji Rho",
    published: true,
    tags: ["minimalism", "technology", "productivity"],
  },
  {
    id: "2",
    title: "Thoughts on the Future of Human Connection",
    excerpt:
      "As technology advances, we find ourselves at a crossroads between digital convenience and authentic human interaction.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date("2024-01-12"),
    readTime: 12,
    author: "Taji Rho",
    published: true,
    tags: ["technology", "relationships", "society"],
  },
  {
    id: "3",
    title: "The Philosophy of Anonymous Expression",
    excerpt:
      "When we remove the weight of identity from our words, what remains is the pure essence of thought and feeling.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date("2024-01-10"),
    readTime: 6,
    author: "Taji Rho",
    published: true,
    tags: ["philosophy", "writing", "identity"],
  },
]

export const metadata = generateSEOMetadata({})

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Suspense fallback={<BlogPostListSkeleton />}>
        <OptimizedHomepage blogPosts={blogPosts} />
      </Suspense>
    </>
  )
}
