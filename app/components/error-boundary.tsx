"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
}

interface ErrorFallbackProps {
  error?: Error
  resetError: () => void
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => (
  <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
    <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-3 mb-4">
      <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
    </div>
    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
      Something went wrong
    </h2>
    <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
      {error?.message || "An unexpected error occurred. Please try again."}
    </p>
    <Button onClick={resetError} variant="outline" className="gap-2">
      <RefreshCw className="w-4 h-4" />
      Try again
    </Button>
    {process.env.NODE_ENV === "development" && error && (
      <details className="mt-6 text-left max-w-2xl">
        <summary className="text-sm text-slate-500 cursor-pointer">
          Error details (dev only)
        </summary>
        <pre className="mt-2 text-xs bg-slate-100 dark:bg-slate-800 p-4 rounded overflow-auto">
          {error.stack}
        </pre>
      </details>
    )}
  </div>
)

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)

    if (process.env.NODE_ENV === "production") {
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}
