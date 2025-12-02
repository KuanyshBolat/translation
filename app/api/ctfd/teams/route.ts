import { NextResponse } from "next/server"

const CTFD_URL = "https://ctf.itfest.kz"
const CTFD_TOKEN = "ctfd_45cdaa5f2e8f79c5f0a767bae7aa5ac64bd69b549060dc607872e7ba625b3a0d"

export async function GET() {
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
