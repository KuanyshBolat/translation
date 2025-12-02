import { NextResponse } from "next/server"

const CTFD_URL = "https://ctf.itfest.kz"
const CTFD_TOKEN = "ctfd_ac70f5530943ea5941b37eeca6d276175cf40c3e1adf757a6f477ead26f70e8b"

export async function GET() {
  try {
    console.log("[v0] Fetching scoreboard from CTFd API")

    // Try top 10 endpoint first
    const response = await fetch(`${CTFD_URL}/api/v1/scoreboard/top/10`, {
      headers: {
        Authorization: `Token ${CTFD_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    console.log("[v0] CTFd scoreboard response status:", response.status)
    const data = await response.json()
    console.log("[v0] CTFd scoreboard data:", JSON.stringify(data))

    // Check if data is valid and is an array
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      console.log("[v0] Returning scoreboard top 10 data")
      return NextResponse.json(data)
    }

    // Try regular scoreboard endpoint
    console.log("[v0] Trying alternative scoreboard endpoint")
    const altResponse = await fetch(`${CTFD_URL}/api/v1/scoreboard`, {
      headers: {
        Authorization: `Token ${CTFD_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    const altData = await altResponse.json()
    console.log("[v0] Alternative scoreboard data:", JSON.stringify(altData))

    if (altData.success && Array.isArray(altData.data) && altData.data.length > 0) {
      console.log("[v0] Returning regular scoreboard data")
      return NextResponse.json(altData)
    }

    // Try teams endpoint
    console.log("[v0] Trying teams endpoint")
    const teamsResponse = await fetch(`${CTFD_URL}/api/v1/teams`, {
      headers: {
        Authorization: `Token ${CTFD_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    const teamsData = await teamsResponse.json()
    console.log("[v0] Teams data:", JSON.stringify(teamsData))

    if (teamsData.success && Array.isArray(teamsData.data) && teamsData.data.length > 0) {
      // Sort teams by score and get top 10
      const sortedTeams = teamsData.data
        .filter((team: any) => team.score && team.score > 0)
        .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
        .slice(0, 10)

      console.log("[v0] Returning sorted teams data")
      return NextResponse.json({ success: true, data: sortedTeams })
    }

    // Try users endpoint as last resort
    console.log("[v0] Trying users endpoint")
    const usersResponse = await fetch(`${CTFD_URL}/api/v1/users`, {
      headers: {
        Authorization: `Token ${CTFD_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    const usersData = await usersResponse.json()
    console.log("[v0] Users data:", JSON.stringify(usersData))

    if (usersData.success && Array.isArray(usersData.data) && usersData.data.length > 0) {
      const sortedUsers = usersData.data
        .filter((user: any) => user.score && user.score > 0)
        .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
        .slice(0, 10)

      console.log("[v0] Returning sorted users data")
      return NextResponse.json({ success: true, data: sortedUsers })
    }

    // If all endpoints fail, return empty array
    console.log("[v0] All endpoints returned empty data")
    return NextResponse.json({ success: true, data: [] })
  } catch (error) {
    console.error("[v0] Error fetching scoreboard:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch scoreboard", data: [] }, { status: 500 })
  }
}
