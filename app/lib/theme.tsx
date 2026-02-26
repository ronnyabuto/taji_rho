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

  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  const getTimeBasedTheme = (): ResolvedTheme => {
    const hour = new Date().getHours()
    return hour >= 18 || hour < 6 ? "dark" : "light"
  }

  const resolveTheme = (currentTheme: Theme): ResolvedTheme => {
    if (currentTheme === "light" || currentTheme === "dark") {
      return currentTheme
    }

    const systemTheme = getSystemTheme()
    const timeTheme = getTimeBasedTheme()

    return systemTheme === "dark" || timeTheme === "dark" ? "dark" : "light"
  }

  const applyTheme = (resolvedTheme: ResolvedTheme) => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
    setResolvedTheme(resolvedTheme)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    const resolved = resolveTheme(newTheme)
    applyTheme(resolved)
  }

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system"
    setThemeState(savedTheme)
    const resolved = resolveTheme(savedTheme)
    applyTheme(resolved)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (savedTheme === "system") {
        const resolved = resolveTheme("system")
        applyTheme(resolved)
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    const timeInterval = setInterval(() => {
      if (savedTheme === "system") {
        const resolved = resolveTheme("system")
        if (resolved !== resolvedTheme) {
          applyTheme(resolved)
        }
      }
    }, 60000)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      clearInterval(timeInterval)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
