import Link from "next/link"
import { BarChart3, Radio, Users } from "lucide-react"
import { PartnersMarquee } from "@/components/partners-marquee"


export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <PartnersMarquee /> 
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              ITFest CTF 2025
            </h1>
            <p className="text-xl text-blue-200">Добро пожаловать на платформу трансляции и статистики</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <Link
              href="/speakers"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-8 transition-all hover:scale-105 hover:border-blue-400/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all" />
              <div className="relative">
                <Users className="w-12 h-12 text-blue-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Трансляция спикеров</h2>
                <p className="text-blue-200">Смотрите выступления ведущих экспертов в области кибербезопасности</p>
              </div>
            </Link>

            <Link
              href="/polygon"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-8 transition-all hover:scale-105 hover:border-purple-400/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all" />
              <div className="relative">
                <Radio className="w-12 h-12 text-purple-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Трансляция полигона</h2>
                <p className="text-purple-200">Следите за соревнованиями участников в режиме реального времени</p>
              </div>
            </Link>

            <Link
              href="/statistics"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-500/10 to-green-500/10 border border-teal-500/20 p-8 transition-all hover:scale-105 hover:border-teal-400/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-green-500/0 group-hover:from-teal-500/10 group-hover:to-green-500/10 transition-all" />
              <div className="relative">
                <BarChart3 className="w-12 h-12 text-teal-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Статистика</h2>
                <p className="text-teal-200">Детальная статистика соревнований и рейтинг участников</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
