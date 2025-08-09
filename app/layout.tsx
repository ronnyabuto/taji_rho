import type React from "react"
import type { Metadata } from "next"
import { Inter, Crimson_Text } from "next/font/google"
import { AuthProvider } from "./lib/auth"
import { ThemeProvider } from "./lib/theme"
import { env, getBaseUrl } from "../lib/env"
import "./globals.css"

// Performance monitoring script
const performanceScript = `
  (function() {
    if (typeof window !== 'undefined' && window.performance) {
      // Mark initial load
      performance.mark('app-start');
      
      // Log performance metrics after load
      window.addEventListener('load', function() {
        setTimeout(function() {
          const metrics = {
            ttfb: performance.getEntriesByType('navigation')[0]?.responseStart - performance.getEntriesByType('navigation')[0]?.fetchStart,
            domContentLoaded: performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd - performance.getEntriesByType('navigation')[0]?.fetchStart,
            loadComplete: performance.getEntriesByType('navigation')[0]?.loadEventEnd - performance.getEntriesByType('navigation')[0]?.fetchStart
          };
          
          if (${process.env.NODE_ENV === 'development'}) {
            console.log('⚡ Page Performance:', metrics);
          }
        }, 100);
      });
    }
  })();
`

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const crimsonText = Crimson_Text({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Taji Rho - Thoughts & Reflections",
    template: "%s | Taji Rho",
  },
  description:
    "Personal blog by Taji Rho. Thoughts, reflections, and observations about life, technology, creativity, and the human experience.",
  keywords: ["Taji Rho", "blog", "thoughts", "reflections", "writing", "philosophy"],
  authors: [{ name: "Taji Rho" }],
  creator: "Taji Rho",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Taji Rho",
    title: "Taji Rho - Thoughts & Reflections",
    description:
      "Personal blog by Taji Rho featuring thoughtful writing about life, technology, and the human experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taji Rho - Thoughts & Reflections",
    description:
      "Personal blog by Taji Rho featuring thoughtful writing about life, technology, and the human experience.",
    creator: "@tajirho",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: env.GOOGLE_VERIFICATION_CODE,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonText.variable}`}>
      <head>
        <link rel="canonical" href={getBaseUrl()} />
        <link rel="alternate" type="application/rss+xml" title="Taji Rho RSS Feed" href="/rss.xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: performanceScript }} />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
