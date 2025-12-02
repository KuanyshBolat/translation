import { NextResponse } from "next/server"

const CTFD_URL = process.env.CTFD_URL || "https://ctf.itfest.kz"
const CTFD_TOKEN = process.env.CTFD_TOKEN

export async function GET() {
  if (!CTFD_TOKEN) {
    console.error("[v0] CTFD_TOKEN environment variable is not set")
    return NextResponse.json({ success: false, error: "CTFd token not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(`${CTFD_URL}/api/v1/teams`, {
      headers: {
        Authorization: `Token ${CTFD_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching teams:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch teams" }, { status: 500 })
  }
}
