import { NextResponse } from "next/server"

const CTFD_URL = process.env.CTFD_URL || "https://ctf.itfest.kz"
const CTFD_TOKEN = process.env.CTFD_TOKEN

export async function GET() {
  if (!CTFD_TOKEN) {
    console.error("[v0] CTFD_TOKEN environment variable is not set")
    return NextResponse.json({ success: false, error: "CTFd token not configured" }, { status: 500 })
  }

  try {
    console.log("[v0] Fetching score distribution from CTFd API")
    const response = await fetch(`${CTFD_URL}/api/v1/statistics/scores/distribution`, {
      headers: {
        Authorization: `Token ${CTFD_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    console.log("[v0] CTFd scores response status:", response.status)
    const data = await response.json()
    console.log("[v0] CTFd scores data:", JSON.stringify(data))

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching score distribution:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch score distribution" }, { status: 500 })
  }
}
