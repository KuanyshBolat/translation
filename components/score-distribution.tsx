"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface ScoreData {
  bracket: string
  count: number
}

export function ScoreDistribution() {
  const [distribution, setDistribution] = useState<ScoreData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDistribution() {
      try {
        console.log("[v0] Fetching score distribution from API route")
        const response = await fetch("/api/ctfd/scores")
        const data = await response.json()
        console.log("[v0] Score distribution response:", data)

        if (data.success && data.data?.brackets) {
          const formattedData = Object.entries(data.data.brackets).map(([bracket, count]) => ({
            bracket,
            count: count as number,
          }))

          setDistribution(formattedData)
        }
      } catch (error) {
        console.error("[v0] Error fetching score distribution:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDistribution()

    const interval = setInterval(fetchDistribution, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Распределение баллов</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-slate-400">Загрузка...</p>
          </div>
        ) : distribution.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={distribution}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="bracket" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Area type="monotone" dataKey="count" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
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
