"use client"

import { useState, useEffect } from "react"
import { PartnersMarquee } from "@/components/partners-marquee"

interface Camera {
  id: number
  name: string
  youtubeId: string
}

export default function PolygonPage() {
  const [cameras, setCameras] = useState<Camera[]>([
    { id: 1, name: "Камера 1 - Общий план", youtubeId: "YOUR_YOUTUBE_ID_1" },
    { id: 2, name: "Камера 2 - Команда слева", youtubeId: "YOUR_YOUTUBE_ID_2" },
    { id: 3, name: "Камера 3 - Команда справа", youtubeId: "YOUR_YOUTUBE_ID_3" },
    { id: 4, name: "Камера 4 - Крупный план", youtubeId: "YOUR_YOUTUBE_ID_4" },
  ])

  useEffect(() => {
    const savedVideos = localStorage.getItem("itfest_videos")
    if (savedVideos) {
      const videos = JSON.parse(savedVideos)
      setCameras([
        { id: 1, name: "Камера 1 - Общий план", youtubeId: videos.polygon1 || "YOUR_YOUTUBE_ID_1" },
        { id: 2, name: "Камера 2 - Команда слева", youtubeId: videos.polygon2 || "YOUR_YOUTUBE_ID_2" },
        { id: 3, name: "Камера 3 - Команда справа", youtubeId: videos.polygon3 || "YOUR_YOUTUBE_ID_3" },
        { id: 4, name: "Камера 4 - Крупный план", youtubeId: videos.polygon4 || "YOUR_YOUTUBE_ID_4" },
      ])
    }
  }, [])

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <PartnersMarquee />
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Трансляция полигона</h1>
            <p className="text-xl text-purple-200">Прямая трансляция с полигона CTF соревнований</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 font-semibold">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cameras.map((camera) => (
              <div key={camera.id} className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-3">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${camera.youtubeId}?autoplay=1&mute=1`}
                    title={camera.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white text-center">{camera.name}</h3>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">О трансляции</h2>
            <p className="text-purple-200 mb-4">
              Следите за соревнованиями в режиме реального времени с четырех камер, установленных на полигоне.
              Наблюдайте за работой команд и атмосферой соревнований.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-purple-300 font-semibold mb-2">Камера 1 - Общий план</h3>
                <p className="text-purple-200 text-sm">Панорамный вид всего полигона</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-purple-300 font-semibold mb-2">Камера 2 - Команда слева</h3>
                <p className="text-purple-200 text-sm">Фокус на левую группу участников</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-purple-300 font-semibold mb-2">Камера 3 - Команда справа</h3>
                <p className="text-purple-200 text-sm">Фокус на правую группу участников</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h3 className="text-purple-300 font-semibold mb-2">Камера 4 - Крупный план</h3>
                <p className="text-purple-200 text-sm">Детальный вид рабочих мест</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
