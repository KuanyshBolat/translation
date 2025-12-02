"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface ChallengeStat {
  id: number
  name: string
  solves: number
  percentage: number
}

export function ChallengeStats() {
  const [challenges, setChallenges] = useState<ChallengeStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchChallenges() {
      try {
        console.log("[v0] Fetching challenges from API route")
        const response = await fetch("/api/ctfd/challenges")
        const data = await response.json()
        console.log("[v0] Challenges response:", data)

        if (data.success && data.data) {
          const stats = data.data
            .map((c: any) => ({
              id: c.id,
              name: c.name,
              solves: c.solves || 0,
              percentage: 0,
            }))
            .sort((a: ChallengeStat, b: ChallengeStat) => b.solves - a.solves)
            .slice(0, 10)

          setChallenges(stats)
        }
      } catch (error) {
        console.error("[v0] Error fetching challenges:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()

    const interval = setInterval(fetchChallenges, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Топ челленджи по решениям</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-slate-400">Загрузка...</p>
          </div>
        ) : challenges.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={challenges}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="solves" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-slate-400">Нет данных</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
