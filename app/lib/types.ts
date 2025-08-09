export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  createdAt: Date
  updatedAt?: Date
  readTime: number
  author: string
  tags?: string[]
  published: boolean
  slug?: string
  views?: number
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  createdAt: Date
}

export interface SearchResult {
  post: BlogPost
  score: number
  matches: string[]
}
