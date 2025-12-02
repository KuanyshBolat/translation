import { NextResponse } from "next/server"

const CTFD_URL = "https://ctf.itfest.kz"
const CTFD_TOKEN = "ctfd_45cdaa5f2e8f79c5f0a767bae7aa5ac64bd69b549060dc607872e7ba625b3a0d"

export async function GET() {
  try {
    console.log("[v0] Fetching overview statistics from CTFd API")

    const [userStats, teamStats, challenges] = await Promise.all([
      fetch(`${CTFD_URL}/api/v1/statistics/users`, {
        headers: {
          Authorization: `Token ${CTFD_TOKEN}`,
          "Content-Type": "application/json",
        },
      }).then((r) => {
        console.log("[v0] User stats status:", r.status)
        return r.json()
      }),
      fetch(`${CTFD_URL}/api/v1/statistics/teams`, {
        headers: {
          Authorization: `Token ${CTFD_TOKEN}`,
          "Content-Type": "application/json",
        },
      }).then((r) => {
        console.log("[v0] Team stats status:", r.status)
        return r.json()
      }),
      fetch(`${CTFD_URL}/api/v1/challenges`, {
        headers: {
          Authorization: `Token ${CTFD_TOKEN}`,
          "Content-Type": "application/json",
        },
      }).then((r) => {
        console.log("[v0] Challenges status:", r.status)
        return r.json()
      }),
    ])

    console.log("[v0] User stats data:", JSON.stringify(userStats))
    console.log("[v0] Team stats data:", JSON.stringify(teamStats))
    console.log("[v0] Challenges data:", JSON.stringify(challenges))

    const totalChallenges = challenges?.data?.length || 0
    const totalSolves = challenges?.data?.reduce((acc: number, c: any) => acc + (c.solves || 0), 0) || 0

    return NextResponse.json({
      success: true,
      data: {
        totalUsers: userStats?.data?.registered || 0,
        totalTeams: teamStats?.data?.registered || 0,
        totalChallenges,
        totalSolves,
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching overview stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 })
  }
}
