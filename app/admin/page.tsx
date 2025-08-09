"use client"

import { Suspense } from "react"
import { useAuth } from "../lib/auth"
import { LoginForm } from "./components/login-form"
import { OptimizedAdminDashboard } from "./components/optimized-admin-dashboard"
import { InstantLoader, AdminSkeleton } from "./components/admin-loader"
import { ErrorBoundary } from "../components/error-boundary"

// Preload critical components
if (typeof window !== 'undefined') {
  // Preload admin dashboard component
  import("./components/optimized-admin-dashboard")
  // Preload frequently used components
  import("./components/post-list")
}

export default function AdminPage() {
  const { isAuthenticated, loading } = useAuth()

  // Show instant loader for perceived performance
  if (loading) {
    return <InstantLoader />
  }

  return (
    <ErrorBoundary>
      {isAuthenticated ? (
        <Suspense fallback={<AdminSkeleton />}>
          <OptimizedAdminDashboard />
        </Suspense>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <LoginForm />
        </div>
      )}
    </ErrorBoundary>
  )
}
