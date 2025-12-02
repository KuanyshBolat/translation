import { NextResponse } from "next/server"

const CTFD_URL = "https://ctf.itfest.kz"
const CTFD_TOKEN = "ctfd_ac70f5530943ea5941b37eeca6d276175cf40c3e1adf757a6f477ead26f70e8b"

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
