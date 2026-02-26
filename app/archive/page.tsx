import { Clock } from "lucide-react"
import Link from "next/link"
import { BackButton } from "../components/back-button"
import type { BlogPost } from "../lib/types"

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
  },

  {
    id: "4",
    title: "On Solitude and Creativity",
    excerpt:
      "The relationship between being alone and creating something meaningful is more complex than we often realize.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date("2023-12-20"),
    readTime: 7,
    author: "Taji Rho",
    published: true,
  },
  {
    id: "5",
    title: "The Rhythm of Seasons",
    excerpt: "How the changing seasons mirror our internal cycles of growth, rest, and renewal.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date("2023-11-15"),
    readTime: 5,
    author: "Taji Rho",
    published: true,
  },
  {
    id: "6",
    title: "Digital Wellness in Practice",
    excerpt:
      "Moving beyond theory to practical steps for maintaining mental health in our connected world.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    createdAt: new Date("2023-10-08"),
    readTime: 9,
    author: "Taji Rho",
    published: true,
  },
]

function groupPostsByYear(posts: BlogPost[]) {
  const grouped = posts.reduce(
    (acc, post) => {
      const year = post.createdAt.getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {} as Record<number, BlogPost[]>
  )

  const sortedYears = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)

  sortedYears.forEach(year => {
    grouped[year].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  })

  return { grouped, sortedYears }
}

export default function ArchivePage() {
  const { grouped, sortedYears } = groupPostsByYear(blogPosts)
  const totalPosts = blogPosts.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <BackButton />
        </div>
      </header>

      {}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-slate-900 mb-4">Archive</h1>
          <p className="text-lg text-slate-600 font-light mb-2">
            A chronological collection of thoughts and reflections
          </p>
          <p className="text-sm text-slate-500">
            {totalPosts} {totalPosts === 1 ? "post" : "posts"} across {sortedYears.length}{" "}
            {sortedYears.length === 1 ? "year" : "years"}
          </p>
        </div>

        {}
        <div className="space-y-16">
          {sortedYears.map((year, yearIndex) => (
            <section key={year} className="relative">
              {}
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-light text-slate-900 mr-4">{year}</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
                <span className="text-sm text-slate-500 ml-4">
                  {grouped[year].length} {grouped[year].length === 1 ? "post" : "posts"}
                </span>
              </div>

              {}
              <div className="space-y-6">
                {grouped[year].map((post, postIndex) => (
                  <Link key={post.id} href={`/post/${post.id}`}>
                    <article
                      className="group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5"
                      style={{
                        animationDelay: `${yearIndex * 100 + postIndex * 50}ms`,
                      }}
                    >
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
                        {}
                        <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
                          <time dateTime={post.createdAt.toISOString()}>
                            {post.createdAt.toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>

                        {}
                        <h3 className="text-xl font-light text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                          {post.title}
                        </h3>

                        {}
                        <p className="text-slate-600 leading-relaxed font-light line-clamp-2">
                          {post.excerpt}
                        </p>

                        {}
                        <div className="flex items-center mt-4 text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                          <span>Read more</span>
                          <svg
                            className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {}
        <div className="mt-20 pt-8 border-t border-slate-200/60 text-center">
          <p className="text-slate-500 font-light">
            This is the complete archive of thoughts shared on this blog.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to latest posts
          </Link>
        </div>
      </main>
    </div>
  )
}
