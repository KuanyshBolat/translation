"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Activity, TrendingUp } from "lucide-react"

interface UserStat {
  registered: number
  confirmed: number
  banned: number
}

export function UserStats() {
  const [stats, setStats] = useState<UserStat | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserStats() {
      try {
        console.log("[v0] Fetching user stats from API route")
        const response = await fetch("/api/ctfd/users")
        const data = await response.json()
        console.log("[v0] User stats response:", data)

        if (data.success && data.data) {
          setStats({
            registered: data.data.registered || 0,
            confirmed: data.data.confirmed || 0,
            banned: data.data.banned || 0,
          })
        }
      } catch (error) {
        console.error("[v0] Error fetching user stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserStats()

    const interval = setInterval(fetchUserStats, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Статистика пользователей</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-slate-400">Загрузка...</p>
          </div>
        ) : stats ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-sm text-slate-400">Зарегистрировано</p>
                    <p className="text-2xl font-bold text-white">{stats.registered}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-sm text-slate-400">Подтверждено</p>
                    <p className="text-2xl font-bold text-white">{stats.confirmed}</p>
                  </div>
                </div>
              </div>

              {stats.banned > 0 && (
                <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Заблокировано</p>
                      <p className="text-2xl font-bold text-white">{stats.banned}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Активность</span>
                <span className="text-sm font-medium text-green-400">
                  {stats.registered > 0
                    ? `${((stats.confirmed / stats.registered) * 100).toFixed(1)}% активных`
                    : "0% активных"}
                </span>
              </div>
              <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                  style={{
                    width: stats.registered > 0 ? `${(stats.confirmed / stats.registered) * 100}%` : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-slate-400">Нет данных</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
