"use client"

import { useTheme } from "../lib/theme"
import { Sun, Moon, Monitor } from "lucide-react"
import { useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ]

  const currentTheme = themes.find((t) => t.value === theme) || themes[2]
  const CurrentIcon = currentTheme.icon

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-20 min-w-[140px]">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors
                    hover:bg-slate-50 dark:hover:bg-slate-700
                    ${
                      theme === themeOption.value
                        ? "text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700"
                        : "text-slate-600 dark:text-slate-400"
                    }
                    first:rounded-t-xl last:rounded-b-xl
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {themeOption.label}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
