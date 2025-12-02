"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Trophy, Medal, Award } from "lucide-react"

interface Team {
  pos: number
  name: string
  score: number
}

export function TeamStats() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      try {
        console.log("[v0] Fetching teams from API route")
        const response = await fetch("/api/ctfd/scoreboard")
        const data = await response.json()
        console.log("[v0] Teams response:", data)

        if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
          const topTeams = data.data.slice(0, 10).map((item: any, index: number) => ({
            pos: index + 1,
            name: item.name || item.team_name || item.account_name || "Unknown",
            score: item.score || 0,
          }))

          setTeams(topTeams)
        } else {
          // If no data, set empty array
          setTeams([])
        }
      } catch (error) {
        console.error("[v0] Error fetching teams:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()

    const interval = setInterval(fetchTeams, 10000)

    return () => clearInterval(interval)
  }, [])

  const getMedalIcon = (pos: number) => {
    if (pos === 1) return <Trophy className="w-5 h-5 text-yellow-400" />
    if (pos === 2) return <Medal className="w-5 h-5 text-slate-300" />
    if (pos === 3) return <Award className="w-5 h-5 text-amber-600" />
    return <span className="text-sm text-slate-400 w-5 text-center">{pos}</span>
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Player Progression (Top 10)</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-slate-400">Загрузка...</p>
          </div>
        ) : teams.length > 0 ? (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {teams.map((team) => (
              <div
                key={team.pos}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getMedalIcon(team.pos)}
                  <span className="text-white font-medium">{team.name}</span>
                </div>
                <span className="text-blue-400 font-bold">{team.score} pts</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-slate-400">Нет данных о прогрессе игроков</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
