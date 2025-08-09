"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function BackButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={() => router.back()}
      className={`
        group flex items-center gap-2 text-slate-600 hover:text-slate-900
        transition-all duration-300 ease-out
        transform hover:-translate-x-1
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ArrowLeft
        className={`
        w-4 h-4 transition-transform duration-300
        ${isHovered ? "-translate-x-0.5" : ""}
      `}
      />
      <span className="font-medium text-sm">Back to thoughts</span>
    </button>
  )
}
