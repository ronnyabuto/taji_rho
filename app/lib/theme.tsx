"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")

  // Get system theme
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  // Get time-based theme (dark mode from 6 PM to 6 AM)
  const getTimeBasedTheme = (): ResolvedTheme => {
    const hour = new Date().getHours()
    return hour >= 18 || hour < 6 ? "dark" : "light"
  }

  // Resolve the actual theme to apply
  const resolveTheme = (currentTheme: Theme): ResolvedTheme => {
    if (currentTheme === "light" || currentTheme === "dark") {
      return currentTheme
    }

    // For system theme, consider both system preference and time
    const systemTheme = getSystemTheme()
    const timeTheme = getTimeBasedTheme()

    // If system is dark or it's night time, use dark theme
    return systemTheme === "dark" || timeTheme === "dark" ? "dark" : "light"
  }

  // Apply theme to document
  const applyTheme = (resolvedTheme: ResolvedTheme) => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
    setResolvedTheme(resolvedTheme)
  }

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    const resolved = resolveTheme(newTheme)
    applyTheme(resolved)
  }

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system"
    setThemeState(savedTheme)
    const resolved = resolveTheme(savedTheme)
    applyTheme(resolved)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (savedTheme === "system") {
        const resolved = resolveTheme("system")
        applyTheme(resolved)
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    // Check time every minute for automatic night mode
    const timeInterval = setInterval(() => {
      if (savedTheme === "system") {
        const resolved = resolveTheme("system")
        if (resolved !== resolvedTheme) {
          applyTheme(resolved)
        }
      }
    }, 60000) // Check every minute

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      clearInterval(timeInterval)
    }
  }, [])

  return <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
