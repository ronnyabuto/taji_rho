import type { Metadata } from "next"
import type { BlogPost } from "../lib/types"

interface SEOHeadProps {
  post?: BlogPost
  title?: string
  description?: string
  path?: string
}

export function generateSEOMetadata({ post, title, description, path = "" }: SEOHeadProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tajirho.com"
  const fullUrl = `${baseUrl}${path}`

  const seoTitle = post
    ? `${post.title} | Taji Rho`
    : title
      ? `${title} | Taji Rho`
      : "Taji Rho - Thoughts & Reflections"

  const seoDescription = post
    ? post.excerpt
    : description ||
      "Personal blog by Taji Rho. Thoughts, reflections, and observations about life, technology, creativity, and the human experience."

  const publishedTime = post?.createdAt.toISOString()
  const modifiedTime = post?.updatedAt?.toISOString() || publishedTime

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: post?.tags || ["Taji Rho", "blog", "thoughts", "reflections", "writing"],
    authors: [{ name: "Taji Rho", url: baseUrl }],
    creator: "Taji Rho",
    publisher: "Taji Rho",
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
    openGraph: {
      type: post ? "article" : "website",
      locale: "en_US",
      url: fullUrl,
      title: seoTitle,
      description: seoDescription,
      siteName: "Taji Rho",
      images: [
        {
          url: `${baseUrl}/api/og${post ? `?title=${encodeURIComponent(post.title)}` : ""}`,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      ...(post && {
        publishedTime,
        modifiedTime,
        authors: ["Taji Rho"],
        tags: post.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      creator: "@tajirho",
      images: [`${baseUrl}/api/og${post ? `?title=${encodeURIComponent(post.title)}` : ""}`],
    },
    alternates: {
      canonical: fullUrl,
      types: {
        "application/rss+xml": `${baseUrl}/rss.xml`,
      },
    },
  }
}

export function StructuredData({ post }: { post?: BlogPost }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tajirho.com"

  const personSchema = {
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Taji Rho",
    url: baseUrl,
    sameAs: [],
  }

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Taji Rho",
    description: "Personal blog by Taji Rho featuring thoughts, reflections, and observations.",
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  }

  const blogSchema = {
    "@type": "Blog",
    "@id": `${baseUrl}/#blog`,
    url: baseUrl,
    name: "Taji Rho",
    description: "Personal blog by Taji Rho featuring thoughts, reflections, and observations.",
    author: {
      "@id": `${baseUrl}/#person`,
    },
  }

  const schemas = [personSchema, websiteSchema, blogSchema]

  if (post) {
    const articleSchema = {
      "@type": "BlogPosting",
      "@id": `${baseUrl}/post/${post.id}/#article`,
      url: `${baseUrl}/post/${post.id}`,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.createdAt.toISOString(),
      dateModified: post.updatedAt?.toISOString() || post.createdAt.toISOString(),
      author: {
        "@id": `${baseUrl}/#person`,
      },
      publisher: {
        "@id": `${baseUrl}/#person`,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/post/${post.id}`,
      },
      wordCount: post.content.split(" ").length,
      timeRequired: `PT${post.readTime}M`,
      keywords: post.tags?.join(", "),
    }

    schemas.push(articleSchema)
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": schemas,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
