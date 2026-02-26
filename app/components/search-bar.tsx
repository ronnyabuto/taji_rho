"use client"

import { Search, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { IntelligentSearch } from "../lib/search"
import type { BlogPost } from "../lib/types"

interface SearchBarProps {
  posts: BlogPost[]
}

export function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<{ post: BlogPost; score: number; matches: string[] }[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchEngine = useRef<IntelligentSearch | null>(null)

  useEffect(() => {
    searchEngine.current = new IntelligentSearch(posts)
  }, [posts])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
      if (event.key === "Escape") {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)

    if (!searchEngine.current || !searchQuery.trim()) {
      setResults([])
      setSuggestions([])
      return
    }

    const searchResults = searchEngine.current.search(searchQuery)
    const searchSuggestions = searchEngine.current.getSuggestions(searchQuery)

    setResults(searchResults.slice(0, 6))
    setSuggestions(searchSuggestions)
  }

  const highlightMatch = (text: string, matches: string[]) => {
    if (!matches.length) return text

    let highlightedText = text
    matches.forEach(match => {
      const regex = new RegExp(`(${match})`, "gi")
      highlightedText = highlightedText.replace(
        regex,
        '<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">$1</mark>'
      )
    })

    return highlightedText
  }

  return (
    <div ref={searchRef} className="relative">
      {}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search thoughts... (⌘K)"
          className="
            w-full pl-10 pr-10 py-2.5 rounded-full border border-slate-200
            bg-white/70 backdrop-blur-sm
            focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400
            transition-all duration-300
            text-sm
          "
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setResults([])
              setSuggestions([])
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {}
      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {}
          {suggestions.length > 0 && (
            <div className="p-4 border-b border-slate-100">
              <p className="text-xs text-slate-500 mb-2">Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {}
          {results.length > 0 ? (
            <div className="p-2">
              {results.map(result => (
                <Link
                  key={result.post.id}
                  href={`/post/${result.post.id}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="p-4 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                    <h3
                      className="font-medium text-slate-900 mb-1"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(result.post.title, result.matches),
                      }}
                    />
                    <p
                      className="text-sm text-slate-600 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(result.post.excerpt, result.matches),
                      }}
                    />
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                      <span>{result.post.readTime} min read</span>
                      <span>•</span>
                      <span>Score: {result.score}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            query && (
              <div className="p-8 text-center text-slate-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No posts found for "{query}"</p>
                <p className="text-xs mt-1">Try different keywords or check for typos</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
