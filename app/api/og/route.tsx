import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || "Taji Rho - Thoughts & Reflections"

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        backgroundImage: "linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%, #f1f5f9 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "900px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "300",
            color: "#0f172a",
            lineHeight: "1.2",
            marginBottom: "20px",
            fontFamily: "Inter",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "#64748b",
            fontWeight: "300",
            marginBottom: "40px",
            fontFamily: "Inter",
          }}
        >
          by Taji Rho
        </p>
        <div
          style={{
            width: "100px",
            height: "2px",
            backgroundColor: "#cbd5e1",
            borderRadius: "1px",
          }}
        />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
