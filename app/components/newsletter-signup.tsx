"use client"

import type React from "react"

import { Mail } from "lucide-react"
import { useState } from "react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsSubmitting(false)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <p className="text-green-800 font-medium">Thank you for subscribing!</p>
        <p className="text-green-600 text-sm mt-1">
          You'll receive new posts directly in your inbox.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6">
      <div className="text-center mb-4">
        <Mail className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Stay Updated</h3>
        <p className="text-slate-600 text-sm">
          Get notified when I publish new thoughts and reflections.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="
            w-full px-4 py-3 rounded-xl border border-slate-200
            bg-white/70 backdrop-blur-sm
            focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400
            transition-all duration-300
            text-center
          "
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full px-4 py-3 rounded-xl
            bg-slate-900 hover:bg-slate-800 text-white
            font-medium text-sm
            transition-all duration-300 ease-out
            transform hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          "
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  )
}
