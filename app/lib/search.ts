import type { BlogPost } from "./types"

// Fuzzy search implementation
export class IntelligentSearch {
  private posts: BlogPost[]
  private searchIndex: Map<string, Set<string>> = new Map()

  constructor(posts: BlogPost[]) {
    this.posts = posts
    this.buildSearchIndex()
  }

  private buildSearchIndex() {
    this.posts.forEach((post) => {
      const searchableText = [post.title, post.excerpt, post.content, ...(post.tags || [])].join(" ").toLowerCase()

      const words = this.extractWords(searchableText)
      words.forEach((word) => {
        if (!this.searchIndex.has(word)) {
          this.searchIndex.set(word, new Set())
        }
        this.searchIndex.get(word)!.add(post.id)
      })
    })
  }

  private extractWords(text: string): string[] {
    return text
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2)
  }

  private calculateLevenshteinDistance(a: string, b: string): number {
    const matrix = Array(b.length + 1)
      .fill(null)
      .map(() => Array(a.length + 1).fill(null))

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + indicator)
      }
    }

    return matrix[b.length][a.length]
  }

  private fuzzyMatch(query: string, word: string, threshold = 2): boolean {
    if (word.includes(query) || query.includes(word)) return true
    return this.calculateLevenshteinDistance(query, word) <= threshold
  }

  search(query: string): { post: BlogPost; score: number; matches: string[] }[] {
    if (!query.trim()) return []

    const queryWords = this.extractWords(query.toLowerCase())
    const postScores = new Map<string, { score: number; matches: Set<string> }>()

    // Initialize all posts with 0 score
    this.posts.forEach((post) => {
      postScores.set(post.id, { score: 0, matches: new Set() })
    })

    queryWords.forEach((queryWord) => {
      // Exact matches
      if (this.searchIndex.has(queryWord)) {
        this.searchIndex.get(queryWord)!.forEach((postId) => {
          const current = postScores.get(postId)!
          current.score += 10
          current.matches.add(queryWord)
        })
      }

      // Fuzzy matches
      this.searchIndex.forEach((postIds, indexWord) => {
        if (this.fuzzyMatch(queryWord, indexWord)) {
          postIds.forEach((postId) => {
            const current = postScores.get(postId)!
            current.score += 5
            current.matches.add(indexWord)
          })
        }
      })

      // Partial matches
      this.searchIndex.forEach((postIds, indexWord) => {
        if (indexWord.includes(queryWord) && indexWord !== queryWord) {
          postIds.forEach((postId) => {
            const current = postScores.get(postId)!
            current.score += 3
            current.matches.add(indexWord)
          })
        }
      })
    })

    // Boost scores for title and excerpt matches
    this.posts.forEach((post) => {
      const titleWords = this.extractWords(post.title.toLowerCase())
      const excerptWords = this.extractWords(post.excerpt.toLowerCase())

      queryWords.forEach((queryWord) => {
        titleWords.forEach((titleWord) => {
          if (this.fuzzyMatch(queryWord, titleWord)) {
            const current = postScores.get(post.id)!
            current.score += 15 // Higher boost for title matches
          }
        })

        excerptWords.forEach((excerptWord) => {
          if (this.fuzzyMatch(queryWord, excerptWord)) {
            const current = postScores.get(post.id)!
            current.score += 8 // Medium boost for excerpt matches
          }
        })
      })
    })

    // Convert to results and sort by score
    const results = Array.from(postScores.entries())
      .filter(([, data]) => data.score > 0)
      .map(([postId, data]) => ({
        post: this.posts.find((p) => p.id === postId)!,
        score: data.score,
        matches: Array.from(data.matches),
      }))
      .sort((a, b) => b.score - a.score)

    return results
  }

  getSuggestions(query: string): string[] {
    const queryWords = this.extractWords(query.toLowerCase())
    const suggestions = new Set<string>()

    queryWords.forEach((queryWord) => {
      this.searchIndex.forEach((_, indexWord) => {
        if (indexWord.startsWith(queryWord) && indexWord !== queryWord) {
          suggestions.add(indexWord)
        }
      })
    })

    return Array.from(suggestions).slice(0, 5)
  }
}
