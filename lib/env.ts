import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url().optional().default("https://tajirho.com"),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),

  GOOGLE_VERIFICATION_CODE: z.string().optional().default("your-google-verification-code"),
  ADMIN_PASSWORD: z.string().optional().default("admin123"),
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  DATABASE_URL: z.string().optional(),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
})

function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error("Invalid environment variables:", error)
    throw new Error("Invalid environment variables")
  }
}

export const env = validateEnv()

export const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

export const clientEnv = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://tajirho.com",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
}
