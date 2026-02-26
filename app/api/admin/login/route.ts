import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { env } from "../../../../lib/env"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    const headersList = await headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIP = headersList.get("x-real-ip")
    const clientIP = forwardedFor?.split(",")[0] || realIP || "unknown"

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    if (password === env.ADMIN_PASSWORD) {
      const token = Buffer.from(`authenticated-${Date.now()}`).toString("base64")

      console.log(`Admin login successful from IP: ${clientIP} at ${new Date().toISOString()}`)

      return NextResponse.json(
        {
          success: true,
          token,
          message: "Authentication successful",
        },
        { status: 200 }
      )
    } else {
      console.warn(`Failed admin login attempt from IP: ${clientIP} at ${new Date().toISOString()}`)

      await new Promise(resolve => setTimeout(resolve, 1000))

      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Admin login API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
