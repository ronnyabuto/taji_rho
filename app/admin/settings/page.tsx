"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Globe, Mail, Save, Settings, Shield } from "lucide-react"
import { useState } from "react"
import { BackButton } from "../../components/back-button"
import { useAuth } from "../../lib/auth"

export default function AdminSettingsPage() {
  const { logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // General settings form
  const [generalSettings, setGeneralSettings] = useState({
    blogTitle: "Taji Rho - Thoughts & Reflections",
    blogDescription:
      "Personal blog featuring thoughtful writing about life, technology, and the human experience.",
    authorName: "Taji Rho",
    authorEmail: "hello@tajirho.com",
    twitterHandle: "@tajirho",
    baseUrl: "https://tajirho.com",
  })

  const [seoSettings, setSeoSettings] = useState({
    googleVerificationCode: "",
    googleAnalyticsId: "",
    metaKeywords: "Taji Rho, blog, thoughts, reflections, writing, philosophy",
  })

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage("New passwords do not match")
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setMessage("New password must be at least 8 characters long")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(
          "Password change initiated. Please update your environment variable and restart the server."
        )
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        setMessage(data.error || "Password change failed")
      }
    } catch {
      setMessage("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGeneralSettingsSave = async () => {
    setLoading(true)
    setMessage("")

    try {
      // In a real app, this would save to database
      // For now, just simulate the save
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage("General settings saved successfully!")
    } catch {
      setMessage("Failed to save general settings")
    } finally {
      setLoading(false)
    }
  }

  const handleSeoSettingsSave = async () => {
    setLoading(true)
    setMessage("")

    try {
      // In a real app, this would save to database
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage("SEO settings saved successfully!")
    } catch {
      setMessage("Failed to save SEO settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      { }
      <header className="border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BackButton />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-light text-slate-900 dark:text-white">Settings</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage your blog configuration and account settings
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={logout}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      { }
      <main className="max-w-6xl mx-auto px-6 py-12">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${message.includes("success") || message.includes("initiated")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
              }`}
          >
            {message}
          </div>
        )}

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              SEO & Analytics
            </TabsTrigger>
          </TabsList>

          { }
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure your blog's basic information and appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="blogTitle">Blog Title</Label>
                    <Input
                      id="blogTitle"
                      value={generalSettings.blogTitle}
                      onChange={e =>
                        setGeneralSettings(prev => ({ ...prev, blogTitle: e.target.value }))
                      }
                      placeholder="Your blog title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authorName">Author Name</Label>
                    <Input
                      id="authorName"
                      value={generalSettings.authorName}
                      onChange={e =>
                        setGeneralSettings(prev => ({ ...prev, authorName: e.target.value }))
                      }
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authorEmail">Author Email</Label>
                    <Input
                      id="authorEmail"
                      type="email"
                      value={generalSettings.authorEmail}
                      onChange={e =>
                        setGeneralSettings(prev => ({ ...prev, authorEmail: e.target.value }))
                      }
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitterHandle">Twitter Handle</Label>
                    <Input
                      id="twitterHandle"
                      value={generalSettings.twitterHandle}
                      onChange={e =>
                        setGeneralSettings(prev => ({ ...prev, twitterHandle: e.target.value }))
                      }
                      placeholder="@username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="baseUrl">Base URL</Label>
                    <Input
                      id="baseUrl"
                      value={generalSettings.baseUrl}
                      onChange={e =>
                        setGeneralSettings(prev => ({ ...prev, baseUrl: e.target.value }))
                      }
                      placeholder="https://yourblog.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blogDescription">Blog Description</Label>
                  <textarea
                    id="blogDescription"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                    rows={3}
                    value={generalSettings.blogDescription}
                    onChange={e =>
                      setGeneralSettings(prev => ({ ...prev, blogDescription: e.target.value }))
                    }
                    placeholder="A brief description of your blog"
                  />
                </div>

                <Button onClick={handleGeneralSettingsSave} disabled={loading} className="gap-2">
                  <Save className="w-4 h-4" />
                  {loading ? "Saving..." : "Save General Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          { }
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your admin password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={e =>
                            setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))
                          }
                          placeholder="Enter current password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={e =>
                            setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))
                          }
                          placeholder="Enter new password (min 8 characters)"
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={e =>
                          setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))
                        }
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="gap-2">
                    <Shield className="w-4 h-4" />
                    {loading ? "Changing Password..." : "Change Password"}
                  </Button>
                </form>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Information</h3>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <p>• Password changes require server restart to take effect</p>
                    <p>• Failed login attempts are logged for security monitoring</p>
                    <p>• Consider using a strong password with at least 12 characters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          { }
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO & Analytics</CardTitle>
                <CardDescription>
                  Configure search engine optimization and analytics tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="googleVerificationCode">Google Verification Code</Label>
                    <Input
                      id="googleVerificationCode"
                      value={seoSettings.googleVerificationCode}
                      onChange={e =>
                        setSeoSettings(prev => ({
                          ...prev,
                          googleVerificationCode: e.target.value,
                        }))
                      }
                      placeholder="google-site-verification-code"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                    <Input
                      id="googleAnalyticsId"
                      value={seoSettings.googleAnalyticsId}
                      onChange={e =>
                        setSeoSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))
                      }
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">Meta Keywords</Label>
                  <Input
                    id="metaKeywords"
                    value={seoSettings.metaKeywords}
                    onChange={e =>
                      setSeoSettings(prev => ({ ...prev, metaKeywords: e.target.value }))
                    }
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-slate-500">Comma-separated keywords for SEO</p>
                </div>

                <Button onClick={handleSeoSettingsSave} disabled={loading} className="gap-2">
                  <Save className="w-4 h-4" />
                  {loading ? "Saving..." : "Save SEO Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
