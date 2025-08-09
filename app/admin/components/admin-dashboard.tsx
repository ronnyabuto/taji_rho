"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../../lib/auth"
import { PostEditor } from "./post-editor"
import { PostList } from "./post-list"
import { Analytics } from "./analytics"
import { PenTool, FileText, BarChart3, Settings, LogOut, Plus } from "lucide-react"

type ActiveTab = "posts" | "editor" | "analytics" | "settings"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts")
  const [editingPost, setEditingPost] = useState<string | null>(null)
  const { logout } = useAuth()

  const tabs = [
    { id: "posts" as const, label: "Posts", icon: FileText },
    { id: "editor" as const, label: "Editor", icon: PenTool },
    { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-xl font-light text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-slate-500">Manage your blog content</p>
              </div>

              <nav className="flex items-center gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  
                  // Special handling for settings - use Link instead of button
                  if (tab.id === "settings") {
                    return (
                      <Link
                        key={tab.id}
                        href="/admin/settings"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </Link>
                    )
                  }
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          activeTab === tab.id
                            ? "bg-slate-900 text-white"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {activeTab === "posts" && (
                <button
                  onClick={() => {
                    setActiveTab("editor")
                    setEditingPost(null)
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  New Post
                </button>
              )}

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 rounded-lg text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "posts" && (
          <PostList
            onEditPost={(postId) => {
              setEditingPost(postId)
              setActiveTab("editor")
            }}
          />
        )}
        {activeTab === "editor" && (
          <PostEditor
            postId={editingPost}
            onSave={() => {
              setActiveTab("posts")
              setEditingPost(null)
            }}
          />
        )}
        {activeTab === "analytics" && <Analytics />}
      </main>
    </div>
  )
}
