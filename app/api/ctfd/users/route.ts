import { NextResponse } from "next/server"

const CTFD_URL = "https://ctf.itfest.kz"
const CTFD_TOKEN = "ctfd_45cdaa5f2e8f79c5f0a767bae7aa5ac64bd69b549060dc607872e7ba625b3a0d"

export async function GET() {
  try {
    console.log("[v0] Fetching user statistics from CTFd API")
    const response = await fetch(`${CTFD_URL}/api/v1/statistics/users`, {
      headers: {
        Authorization: `Token ${CTFD_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    console.log("[v0] CTFd user stats response status:", response.status)
    const data = await response.json()
    console.log("[v0] CTFd user stats data:", JSON.stringify(data))

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching user statistics:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch user statistics" }, { status: 500 })
  }
}
