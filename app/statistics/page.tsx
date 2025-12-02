import { PartnersMarquee } from "@/components/partners-marquee"
import { StatsOverview } from "@/components/stats-overview"
import { ChallengeStats } from "@/components/challenge-stats"
import { TeamStats } from "@/components/team-stats"
import { UserStats } from "@/components/user-stats"
import { ScoreDistribution } from "@/components/score-distribution"

export default function StatisticsPage() {
  return (
    <>
      
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <PartnersMarquee /> 
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">ITFest CTF Статистика</h1>
            <p className="text-blue-200">Живая статистика с платформы CTFd</p>
          </div>

          {/* Stats Grid */}
          <div className="space-y-6">
            <StatsOverview />

            <div className="grid gap-6 lg:grid-cols-2">
              <ChallengeStats />
              <ScoreDistribution />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <TeamStats />
              <UserStats />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
