# Taji Rho Blog

## Mission
A platform for personal writing.

## Architecture
- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: Tailwind CSS + Radix UI Primitives 
- **Typography**: Inter (Sans-serif) & Crimson Text (Serif) via `next/font`
- **Search**: Client-side Levenshtein distance fuzzy matching
- **State**: React Hooks + Context API (`AuthProvider`)
- **Metrics**: Native Performance API (TTFB, FCP, LCP) captured securely in development

## Quick Start
```bash
npm install
npm run dev
```
The application runs on `http://localhost:3000`.

## Key Constraints & Contracts
- **Environment Variables**: Requires `NEXT_PUBLIC_BASE_URL` (default: `https://vercel.tajirho.app`) and `ADMIN_PASSWORD` (default: `admin123`) for administrative access.
- **Data Structure**: `BlogPost` interface dictates strict schema requirements (`id`, `title`, `excerpt`, `content`, `createdAt`, `readTime`, `author`, `published`, `tags`).
- **Static Generation**: Dynamic routes such as `/post/[id]` are server-rendered on demand. Root routes are statically built.
- **Zero-Fluff Standard**: The codebase strictly enforces a signal-to-noise ratio. All docs, inline comments, and redundant abstractions have been purged. Maintain this standard in future commits.
- **Admin Routing**: `/admin` is guarded by an authenticated context token (`admin-token` in `localStorage`).

## Build & Verify
```bash
npm run type-check
npm run lint
npm run build
```
