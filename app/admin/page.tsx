"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "../components/error-boundary"
import { useAuth } from "../lib/auth"
import { AdminSkeleton, InstantLoader } from "./components/admin-loader"
import { LoginForm } from "./components/login-form"
import { OptimizedAdminDashboard } from "./components/optimized-admin-dashboard"

if (typeof window !== "undefined") {
  import("./components/optimized-admin-dashboard")

  import("./components/post-list")
}

export default function AdminPage() {
  const { isAuthenticated, loading } = useAuth()

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
