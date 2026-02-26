"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("admin-token"))
    setLoading(false)
  }, [])

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) return false
      const { token } = await response.json()
      localStorage.setItem("admin-token", token)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("admin-token")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
