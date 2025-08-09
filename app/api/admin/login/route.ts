import { NextRequest, NextResponse } from "next/server"
import { env } from "../../../../lib/env"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Rate limiting check (basic implementation)
    const headersList = await headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    const realIP = headersList.get("x-real-ip")
    const clientIP = forwardedFor?.split(",")[0] || realIP || "unknown"

    // In production, implement proper rate limiting with Redis/database
    // For now, just basic validation

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      )
    }

    // Check against environment variable
    if (password === env.ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT with proper signing)
      const token = Buffer.from(`authenticated-${Date.now()}`).toString("base64")
      
      // Log successful authentication (for security monitoring)
      console.log(`Admin login successful from IP: ${clientIP} at ${new Date().toISOString()}`)
      
      return NextResponse.json(
        { 
          success: true, 
          token,
          message: "Authentication successful" 
        },
        { status: 200 }
      )
    } else {
      // Log failed authentication attempt
      console.warn(`Failed admin login attempt from IP: ${clientIP} at ${new Date().toISOString()}`)
      
      // Add a small delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error("Admin login API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Disable other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  )
}