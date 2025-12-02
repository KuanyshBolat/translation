"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Trophy, Target, Award } from "lucide-react"
import { useEffect, useState } from "react"

interface OverviewStats {
  totalUsers: number
  totalTeams: number
  totalChallenges: number
  totalSolves: number
}

export function StatsOverview() {
  const [stats, setStats] = useState<OverviewStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/ctfd/stats")
        const data = await response.json()

        if (data.success) {
          setStats(data.data)
        }
      } catch (error) {
        console.error("[v0] Error fetching overview stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    const interval = setInterval(fetchStats, 10000)

    return () => clearInterval(interval)
  }, [])

  const cards = [
    {
      title: "Всего пользователей",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Всего команд",
      value: stats?.totalTeams || 0,
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Челленджи",
      value: stats?.totalChallenges || 0,
      icon: Target,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Решений",
      value: stats?.totalSolves || 0,
      icon: Award,
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-white">{loading ? "..." : card.value.toLocaleString()}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
