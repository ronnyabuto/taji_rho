"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../../lib/auth"
import { Lock, Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const success = await login(password)
    if (!success) {
      setError("Invalid password")
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-slate-900 mb-2">Admin Access</h1>
          <p className="text-slate-600 font-light">Enter your password to manage the blog</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
              className="
                w-full px-4 py-3 pr-12 rounded-xl border border-slate-200
                bg-white/70 backdrop-blur-sm
                focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400
                transition-all duration-300
              "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full px-4 py-3 rounded-xl
              bg-slate-900 hover:bg-slate-800 text-white
              font-medium
              transition-all duration-300 ease-out
              transform hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            "
          >
            {loading ? "Authenticating..." : "Access Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  )
}
