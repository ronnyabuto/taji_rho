"use client"

import { BarChart3, FileText, LogOut, PenTool, Plus, Settings } from "lucide-react"
import Link from "next/link"
import { lazy, memo, Suspense, useMemo, useState } from "react"
import { useAuth } from "../../lib/auth"

const PostEditor = lazy(() =>
  import("./post-editor").then(module => ({ default: module.PostEditor }))
)
const PostList = lazy(() => import("./post-list").then(module => ({ default: module.PostList })))
const Analytics = lazy(() => import("./analytics").then(module => ({ default: module.Analytics })))

type ActiveTab = "posts" | "editor" | "analytics"

const TAB_CONFIG = [
  { id: "posts" as const, label: "Posts", icon: FileText },
  { id: "editor" as const, label: "Editor", icon: PenTool },
  { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
] as const

const AdminHeader = memo(
  ({
    activeTab,
    setActiveTab,
    showNewPost,
    setShowNewPost,
    logout,
  }: {
    activeTab: ActiveTab
    setActiveTab: (tab: ActiveTab) => void
    showNewPost: boolean
    setShowNewPost: (show: boolean) => void
    logout: () => void
  }) => (
    <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-xl font-light text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">Manage your blog content</p>
            </div>

            <nav className="flex items-center gap-1">
              {TAB_CONFIG.map(tab => {
                const Icon = tab.icon
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

              <Link
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "posts" && !showNewPost && (
              <button
                onClick={() => {
                  setShowNewPost(true)
                  setActiveTab("editor")
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
  )
)

AdminHeader.displayName = "AdminHeader"

const ComponentLoader = memo(({ type }: { type: string }) => (
  <div className="flex items-center justify-center py-12">
    <div className="flex flex-col items-center gap-3">
      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
      <div className="text-sm text-slate-500">Loading {type}...</div>
    </div>
  </div>
))

ComponentLoader.displayName = "ComponentLoader"

export const OptimizedAdminDashboard = memo(() => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts")
  const [editingPost, setEditingPost] = useState<string | null>(null)
  const [showNewPost, setShowNewPost] = useState(false)
  const { logout } = useAuth()

  const handlePostEdit = useMemo(
    () => (postId: string) => {
      setEditingPost(postId)
      setShowNewPost(false)
      setActiveTab("editor")
    },
    []
  )

  const handlePostSave = useMemo(
    () => () => {
      setActiveTab("posts")
      setEditingPost(null)
      setShowNewPost(false)
    },
    []
  )

  return (
    <div className="min-h-screen">
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showNewPost={showNewPost}
        setShowNewPost={setShowNewPost}
        logout={logout}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "posts" && (
          <Suspense fallback={<ComponentLoader type="posts" />}>
            <PostList onEditPost={handlePostEdit} />
          </Suspense>
        )}

        {activeTab === "editor" && (
          <Suspense fallback={<ComponentLoader type="editor" />}>
            <PostEditor postId={editingPost} onSave={handlePostSave} />
          </Suspense>
        )}

        {activeTab === "analytics" && (
          <Suspense fallback={<ComponentLoader type="analytics" />}>
            <Analytics />
          </Suspense>
        )}
      </main>
    </div>
  )
})

OptimizedAdminDashboard.displayName = "OptimizedAdminDashboard"
