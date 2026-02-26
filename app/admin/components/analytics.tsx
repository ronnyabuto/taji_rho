"use client"

import { BarChart3, Clock, Eye, TrendingUp } from "lucide-react"

export function Analytics() {
  const stats = {
    totalViews: 15420,
    totalPosts: 12,
    avgReadTime: 8.5,
    topPost: "The Art of Digital Minimalism",
  }

  const recentViews = [
    { date: "2024-01-15", views: 245 },
    { date: "2024-01-14", views: 189 },
    { date: "2024-01-13", views: 312 },
    { date: "2024-01-12", views: 156 },
    { date: "2024-01-11", views: 203 },
  ]

  const topPosts = [
    { title: "The Art of Digital Minimalism", views: 1250, readTime: 8 },
    { title: "Thoughts on the Future of Human Connection", views: 890, readTime: 12 },
    { title: "The Philosophy of Anonymous Expression", views: 654, readTime: 6 },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-light text-slate-900">Analytics</h2>

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-600">Total Views</span>
          </div>
          <p className="text-2xl font-light text-slate-900">{stats.totalViews.toLocaleString()}</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-600">Total Posts</span>
          </div>
          <p className="text-2xl font-light text-slate-900">{stats.totalPosts}</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-600">Avg Read Time</span>
          </div>
          <p className="text-2xl font-light text-slate-900">{stats.avgReadTime} min</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-600">Top Post</span>
          </div>
          <p className="text-sm font-medium text-slate-900 line-clamp-2">{stats.topPost}</p>
        </div>
      </div>

      {}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
        <h3 className="text-lg font-medium text-slate-900 mb-6">Recent Views</h3>
        <div className="space-y-4">
          {recentViews.map((day, index) => (
            <div key={day.date} className="flex items-center gap-4">
              <span className="text-sm text-slate-600 w-20">
                {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              <div className="flex-1 bg-slate-100 rounded-full h-2 relative">
                <div
                  className="bg-slate-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(day.views / Math.max(...recentViews.map(d => d.views))) * 100}%`,
                    animationDelay: `${index * 100}ms`,
                  }}
                />
              </div>
              <span className="text-sm font-medium text-slate-900 w-12 text-right">
                {day.views}
              </span>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60">
        <h3 className="text-lg font-medium text-slate-900 mb-6">Top Posts</h3>
        <div className="space-y-4">
          {topPosts.map((post, index) => (
            <div
              key={post.title}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 mb-1">{post.title}</h4>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>{post.views} views</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              <div className="text-2xl font-light text-slate-400">#{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
