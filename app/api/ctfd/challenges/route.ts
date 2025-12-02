import { NextResponse } from "next/server"

const CTFD_URL = process.env.CTFD_URL || "https://ctf.itfest.kz"
const CTFD_TOKEN = process.env.CTFD_TOKEN

export async function GET() {
  if (!CTFD_TOKEN) {
    console.error("[v0] CTFD_TOKEN environment variable is not set")
    return NextResponse.json({ success: false, error: "CTFd token not configured" }, { status: 500 })
  }

  try {
    console.log("[v0] Fetching challenges from CTFd API")
    const challengesResponse = await fetch(`${CTFD_URL}/api/v1/challenges`, {
      headers: {
        Authorization: `Token ${CTFD_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    console.log("[v0] CTFd challenges response status:", challengesResponse.status)
    const challengesData = await challengesResponse.json()

    if (!challengesData.success || !challengesData.data) {
      console.log("[v0] Failed to fetch challenges list")
      return NextResponse.json(challengesData)
    }

    const detailedChallenges = await Promise.all(
      challengesData.data.map(async (challenge: any) => {
        try {
          const detailResponse = await fetch(`${CTFD_URL}/api/v1/challenges/${challenge.id}`, {
            headers: {
              Authorization: `Token ${CTFD_TOKEN}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          })

          if (detailResponse.ok) {
            const detailData = await detailResponse.json()
            return {
              ...challenge,
              solves: detailData.data?.solves || 0,
            }
          }
        } catch (err) {
          console.error(`[v0] Error fetching challenge ${challenge.id}:`, err)
        }
        return challenge
      }),
    )

    console.log("[v0] Detailed challenges data:", JSON.stringify(detailedChallenges))

    return NextResponse.json({ success: true, data: detailedChallenges })
  } catch (error) {
    console.error("[v0] Error fetching challenges:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch challenges" }, { status: 500 })
  }
}
