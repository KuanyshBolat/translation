"use client"

import { useState, useEffect } from "react"
import {
  Share2,
  Linkedin,
  Send,
  MessageCircle,
  X,
  FileText,
  Download,
  MessageSquare,
  Map,
  UsersIcon,
} from "lucide-react"
import Image from "next/image"
import { PartnersMarquee } from "@/components/partners-marquee"

interface Speaker {
  id: number
  name: string
  position: string
  company: string
  image: string
}

interface Moderator {
  id: number
  name: string
  role: string
  image: string
  location: string
}

interface ScheduleEvent {
  id: number
  startTime: string
  endTime: string
  title: string
  speaker?: string
}

interface ModalData {
  name: string
  position?: string
  company?: string
  role?: string
  image: string
}

export default function SpeakersPage() {
  const [currentEvent, setCurrentEvent] = useState<number | null>(null)
  const [modalData, setModalData] = useState<ModalData | null>(null)
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [moderatorsAstana, setModeratorsAstana] = useState<Moderator[]>([])
  const [moderatorsAlmaty, setModeratorsAlmaty] = useState<Moderator[]>([])
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([])
  const [videoId, setVideoId] = useState("sulgD9TQsTk")

  const defaultSpeakers: Speaker[] = [
    {
      id: 1,
      name: "Анна Иванова",
      position: "Генеральный директор",
      company: "ТехноЛаб",
      image: "/professional-woman-tech-executive.png",
    },
    {
      id: 2,
      name: "Петр Сидоров",
      position: "Главный инженер",
      company: "Квантовые системы",
      image: "/professional-engineer.png",
    },
    {
      id: 3,
      name: "Мария Козлова",
      position: "Профессор компьютерных наук",
      company: "MIT University",
      image: "/professional-woman-professor.png",
    },
    {
      id: 4,
      name: "Алексей Петров",
      position: "CTO и сооснователь",
      company: "NeuroTech AI",
      image: "/professional-man-cto.png",
    },
  ]

  const defaultModeratorsAstana: Moderator[] = [
    {
      id: 1,
      name: "Нурлан Садыков",
      role: "Координатор площадки",
      image: "/professional-man-coordinator.jpg",
      location: "astana",
    },
    {
      id: 2,
      name: "Айгуль Жумабаева",
      role: "Технический модератор",
      image: "/professional-woman-moderator.jpg",
      location: "astana",
    },
  ]

  const defaultModeratorsAlmaty: Moderator[] = [
    {
      id: 3,
      name: "Арман Куанов",
      role: "Координатор площадки",
      image: "/professional-man-coordinator-kazakhstan.jpg",
      location: "almaty",
    },
    {
      id: 4,
      name: "Диана Темирханова",
      role: "Технический модератор",
      image: "/professional-woman-moderator-kazakhstan.jpg",
      location: "almaty",
    },
  ]

  const defaultSchedule: ScheduleEvent[] = [
    { id: 1, startTime: "10:00", endTime: "10:30", title: "Открытие конференции" },
    {
      id: 2,
      startTime: "10:30",
      endTime: "11:45",
      title: "Будущее искусственного интеллекта",
      speaker: "Анна Иванова",
    },
    { id: 3, startTime: "11:45", endTime: "13:00", title: "Квантовые вычисления", speaker: "Петр Сидоров" },
    { id: 4, startTime: "13:00", endTime: "14:30", title: "Обеденный перерыв" },
    { id: 5, startTime: "14:30", endTime: "16:00", title: "Нейросети в медицине", speaker: "Мария Козлова" },
    { id: 6, startTime: "16:00", endTime: "17:30", title: "Инновации в робототехнике", speaker: "Алексей Петров" },
  ]

  useEffect(() => {
    const savedSpeakers = localStorage.getItem("itfest_speakers")
    const savedModerators = localStorage.getItem("itfest_moderators")
    const savedSchedule = localStorage.getItem("itfest_schedule")
    const savedVideos = localStorage.getItem("itfest_videos")

    setSpeakers(savedSpeakers ? JSON.parse(savedSpeakers) : defaultSpeakers)
    setSchedule(savedSchedule ? JSON.parse(savedSchedule) : defaultSchedule)

    if (savedModerators) {
      const mods = JSON.parse(savedModerators)
      setModeratorsAstana(mods.filter((m: any) => m.location === "astana"))
      setModeratorsAlmaty(mods.filter((m: any) => m.location === "almaty"))
    } else {
      setModeratorsAstana(defaultModeratorsAstana)
      setModeratorsAlmaty(defaultModeratorsAlmaty)
    }

    if (savedVideos) {
      const videos = JSON.parse(savedVideos)
      setVideoId(videos.speakers || "sulgD9TQsTk")
    }
  }, [])

  const links = [
    { title: "Программа мероприятия", href: "#", icon: FileText },
    { title: "Материалы спикеров", href: "#", icon: Download },
    { title: "Задать вопрос спикерам", href: "#", icon: MessageSquare },
    { title: "Схема площадок", href: "#", icon: Map },
    { title: "Чат участников", href: "#", icon: UsersIcon },
  ]

  useEffect(() => {
    const checkCurrentEvent = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const currentTimeInMinutes = currentHour * 60 + currentMinute

      let activeEvent: number | null = null

      schedule.forEach((event) => {
        const [startHour, startMinute] = event.startTime.split(":").map(Number)
        const [endHour, endMinute] = event.endTime.split(":").map(Number)

        const startTimeInMinutes = startHour * 60 + startMinute
        const endTimeInMinutes = endHour * 60 + endMinute

        if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
          activeEvent = event.id
        }
      })

      setCurrentEvent(activeEvent)
    }

    checkCurrentEvent()
    const interval = setInterval(checkCurrentEvent, 10000)

    return () => clearInterval(interval)
  }, [schedule])

  const openModal = (data: ModalData) => {
    setModalData(data)
  }

  const closeModal = () => {
    setModalData(null)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }

    if (modalData) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [modalData])

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <PartnersMarquee />
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">CTF ITFest 2025</h1>
            <p className="text-xl text-blue-200">Прямая трансляция конференции</p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Left Column - Main Content */}
            <div className="space-y-6">
              {/* Video Player */}
              <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Главная сцена: Выступление спикеров</h2>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-white text-sm font-bold">LIVE</span>
                  </div>
                </div>
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                </div>
              </div>

              {/* Info Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Moderators Astana */}
                <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Модераторы оффлайн площадки Астана (AITU)</h3>
                  <div className="space-y-4">
                    {moderatorsAstana.map((mod) => (
                      <div key={mod.id} className="flex items-center gap-3">
                        <div
                          className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                          onClick={() => openModal({ name: mod.name, role: mod.role, image: mod.image })}
                        >
                          <Image src={mod.image || "/placeholder.svg"} alt={mod.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{mod.name}</p>
                          <p className="text-blue-300 text-sm">{mod.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Moderators Almaty */}
                <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Модераторы оффлайн площадки Алматы (Атакент)
                  </h3>
                  <div className="space-y-4">
                    {moderatorsAlmaty.map((mod) => (
                      <div key={mod.id} className="flex items-center gap-3">
                        <div
                          className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                          onClick={() => openModal({ name: mod.name, role: mod.role, image: mod.image })}
                        >
                          <Image src={mod.image || "/placeholder.svg"} alt={mod.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{mod.name}</p>
                          <p className="text-blue-300 text-sm">{mod.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Useful Links */}
                <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Полезные ссылки</h3>
                  <div className="space-y-2">
                    {links.map((link, index) => {
                      const IconComponent = link.icon
                      return (
                        <a
                          key={index}
                          href={link.href}
                          className="flex items-center gap-2 text-blue-300 hover:text-blue-200 hover:underline transition-colors group"
                        >
                          <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>{link.title}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Speakers */}
              <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Спикеры</h3>
                <div className="space-y-4">
                  {speakers.map((speaker) => (
                    <div key={speaker.id} className="flex items-center gap-3">
                      <div
                        className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all flex-shrink-0"
                        onClick={() =>
                          openModal({
                            name: speaker.name,
                            position: speaker.position,
                            company: speaker.company,
                            image: speaker.image,
                          })
                        }
                      >
                        <Image
                          src={speaker.image || "/placeholder.svg"}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">{speaker.name}</p>
                        <p className="text-blue-300 text-sm truncate">{speaker.position}</p>
                        <p className="text-blue-200 text-xs truncate">{speaker.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">Расписание</h3>
                <div className="space-y-3">
                  {schedule.map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg transition-all ${
                        currentEvent === event.id ? "bg-blue-500/30 border border-blue-400" : "bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-blue-300 font-mono font-semibold text-sm whitespace-nowrap">
                          {event.startTime}-{event.endTime}
                        </span>
                        <div>
                          <p className="text-white font-medium text-sm">{event.title}</p>
                          {event.speaker && <p className="text-blue-200 text-xs mt-1">{event.speaker}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Share */}
              <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Поделиться
                </h3>
                <div className="flex gap-3">
                  
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=CTF ITFest 2025`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-sm">Telegram</span>
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`CTF ITFest 2025 ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-700 text-center">
            <p className="text-blue-200 mb-2">© 2025 ITFest CTF. Все права защищены.</p>
            <p className="text-blue-300 text-sm">Контакты: info@itfest.kz | +7 (XXX) XXX-XX-XX</p>
          </footer>
        </div>

        {/* Modal */}
        {modalData && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in"
            onClick={closeModal}
          >
            <div
              className="bg-slate-900 rounded-xl p-6 max-w-md w-full border border-slate-700 animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{modalData.name}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                <Image src={modalData.image || "/placeholder.svg"} alt={modalData.name} fill className="object-cover" />
              </div>
              {modalData.position && <p className="text-blue-300 mb-2">{modalData.position}</p>}
              {modalData.company && <p className="text-blue-200 mb-2">{modalData.company}</p>}
              {modalData.role && <p className="text-blue-300">{modalData.role}</p>}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
