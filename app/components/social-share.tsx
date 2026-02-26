"use client"

import { LinkIcon, Mail, Share2, Twitter } from "lucide-react"
import { useState } from "react"
import type { BlogPost } from "../lib/types"

interface SocialShareProps {
  post: BlogPost
  className?: string
}

export function SocialShare({ post, className = "" }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = `${post.title} by Taji Rho`

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: shareUrl,
        })
      } catch {
        // User cancelled or error occurred
      }
    }
  }

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, "_blank", "noopener,noreferrer")
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareText)
    const body = encodeURIComponent(
      `I thought you might find this interesting:\n\n${shareText}\n${shareUrl}`
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="text-sm text-slate-500 dark:text-slate-400">Share this post:</span>
      <div className="flex items-center gap-2">
        {}
        {typeof navigator !== "undefined" && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        )}

        {}
        <button
          onClick={handleTwitterShare}
          className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm transition-colors"
          title="Share on X"
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">X</span>
        </button>

        {}
        <button
          onClick={handleEmailShare}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 transition-colors"
          title="Share via email"
        >
          <Mail className="w-4 h-4" />
          <span className="hidden sm:inline">Email</span>
        </button>

        {}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 transition-colors"
          title="Copy link"
        >
          <LinkIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
    </div>
  )
}
