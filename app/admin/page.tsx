"use client"

import { useState, useEffect } from "react"
import { Lock, Save, Plus, Trash2, Eye, EyeOff, Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

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
  location: string
  image: string
}

interface ScheduleEvent {
  id: number
  startTime: string
  endTime: string
  title: string
  speaker?: string
}

interface VideoConfig {
  speakers: string
  polygon1: string
  polygon2: string
  polygon3: string
  polygon4: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [moderators, setModerators] = useState<Moderator[]>([])
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([])
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({
    speakers: "sulgD9TQsTk",
    polygon1: "YOUR_YOUTUBE_ID_1",
    polygon2: "YOUR_YOUTUBE_ID_2",
    polygon3: "YOUR_YOUTUBE_ID_3",
    polygon4: "YOUR_YOUTUBE_ID_4",
  })

  const handleLogin = () => {
    // Placeholder for login logic
    if (password === "correct_password") {
      setIsAuthenticated(true)
    } else {
      setError("Неверный код доступа")
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData()
    }
  }, [isAuthenticated])

  const loadAllData = async () => {
    try {
      const [speakersRes, moderatorsRes, scheduleRes, streamsRes] = await Promise.all([
        fetch("/api/admin/speakers"),
        fetch("/api/admin/moderators"),
        fetch("/api/admin/schedule"),
        fetch("/api/admin/streams"),
      ])

      if (speakersRes.ok) {
        const data = await speakersRes.json()
        setSpeakers(data)
      }

      if (moderatorsRes.ok) {
        const data = await moderatorsRes.json()
        setModerators(data)
      }

      if (scheduleRes.ok) {
        const data = await scheduleRes.json()
        setSchedule(data)
      }

      if (streamsRes.ok) {
        const data = await streamsRes.json()
        if (data.length > 0) {
          const streams = data[0]
          setVideoConfig({
            speakers: streams.speakers_video_id,
            polygon1: streams.polygon1_video_id,
            polygon2: streams.polygon2_video_id,
            polygon3: streams.polygon3_video_id,
            polygon4: streams.polygon4_video_id,
          })
        }
      }
    } catch (error) {
      console.error("[v0] Error loading data:", error)
    }
  }

  const saveData = async () => {
    try {
      await Promise.all([
        fetch("/api/admin/speakers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(speakers),
        }),
        fetch("/api/admin/moderators", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(moderators),
        }),
        fetch("/api/admin/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(schedule),
        }),
        fetch("/api/admin/streams", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            speakers_video_id: videoConfig.speakers,
            polygon1_video_id: videoConfig.polygon1,
            polygon2_video_id: videoConfig.polygon2,
            polygon3_video_id: videoConfig.polygon3,
            polygon4_video_id: videoConfig.polygon4,
          }),
        }),
      ])
      alert("Данные успешно сохранены и синхронизированы на всех устройствах!")
    } catch (error) {
      console.error("[v0] Error saving data:", error)
      alert("Ошибка при сохранении данных")
    }
  }

  // Speaker functions
  const addSpeaker = () => {
    const newId = speakers.length > 0 ? Math.max(...speakers.map((s) => s.id)) + 1 : 1
    setSpeakers([
      ...speakers,
      {
        id: newId,
        name: "",
        position: "",
        company: "",
        image: "/placeholder.svg",
      },
    ])
  }

  const updateSpeaker = (id: number, field: keyof Speaker, value: string) => {
    setSpeakers(speakers.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const deleteSpeaker = (id: number) => {
    setSpeakers(speakers.filter((s) => s.id !== id))
  }

  // Moderator functions
  const addModerator = () => {
    const newId = moderators.length > 0 ? Math.max(...moderators.map((m) => m.id)) + 1 : 1
    setModerators([
      ...moderators,
      {
        id: newId,
        name: "",
        role: "",
        location: "astana",
        image: "/placeholder.svg",
      },
    ])
  }

  const updateModerator = (id: number, field: keyof Moderator, value: string) => {
    setModerators(moderators.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const deleteModerator = (id: number) => {
    setModerators(moderators.filter((m) => m.id !== id))
  }

  // Schedule functions
  const addScheduleEvent = () => {
    const newId = schedule.length > 0 ? Math.max(...schedule.map((e) => e.id)) + 1 : 1
    setSchedule([
      ...schedule,
      {
        id: newId,
        startTime: "10:00",
        endTime: "11:00",
        title: "",
        speaker: "",
      },
    ])
  }

  const updateScheduleEvent = (id: number, field: keyof ScheduleEvent, value: string) => {
    setSchedule(schedule.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const deleteScheduleEvent = (id: number) => {
    setSchedule(schedule.filter((e) => e.id !== id))
  }

  // Image upload handlers
  const handleSpeakerImageUpload = (id: number, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      updateSpeaker(id, "image", reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleModeratorImageUpload = (id: number, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      updateModerator(id, "image", reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-sm border-slate-700">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-6">Административная панель</h1>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Введите код доступа"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="bg-slate-800 border-slate-600 text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
              Войти
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Административная панель ITFest CTF</h1>
          <Button onClick={saveData} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Сохранить все изменения
          </Button>
        </div>

        <div className="space-y-6">
          {/* Video Configuration */}
          <Card className="p-6 bg-slate-900/80 backdrop-blur-sm border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Настройка трансляций (YouTube Video ID)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-blue-200 text-sm mb-1 block">Трансляция спикеров</label>
                <Input
                  value={videoConfig.speakers}
                  onChange={(e) => setVideoConfig({ ...videoConfig, speakers: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="sulgD9TQsTk"
                />
              </div>
              <div>
                <label className="text-blue-200 text-sm mb-1 block">Полигон - Камера 1</label>
                <Input
                  value={videoConfig.polygon1}
                  onChange={(e) => setVideoConfig({ ...videoConfig, polygon1: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="YOUR_YOUTUBE_ID_1"
                />
              </div>
              <div>
                <label className="text-blue-200 text-sm mb-1 block">Полигон - Камера 2</label>
                <Input
                  value={videoConfig.polygon2}
                  onChange={(e) => setVideoConfig({ ...videoConfig, polygon2: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="YOUR_YOUTUBE_ID_2"
                />
              </div>
              <div>
                <label className="text-blue-200 text-sm mb-1 block">Полигон - Камера 3</label>
                <Input
                  value={videoConfig.polygon3}
                  onChange={(e) => setVideoConfig({ ...videoConfig, polygon3: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="YOUR_YOUTUBE_ID_3"
                />
              </div>
              <div>
                <label className="text-blue-200 text-sm mb-1 block">Полигон - Камера 4</label>
                <Input
                  value={videoConfig.polygon4}
                  onChange={(e) => setVideoConfig({ ...videoConfig, polygon4: e.target.value })}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="YOUR_YOUTUBE_ID_4"
                />
              </div>
            </div>
          </Card>

          {/* Speakers */}
          <Card className="p-6 bg-slate-900/80 backdrop-blur-sm border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Спикеры</h2>
              <Button onClick={addSpeaker} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Добавить спикера
              </Button>
            </div>
            <div className="space-y-4">
              {speakers.map((speaker) => (
                <div key={speaker.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-slate-800 rounded-lg">
                  {/* Image preview */}
                  <div className="flex items-center gap-2">
                    {speaker.image && speaker.image !== "/placeholder.svg" && (
                      <img
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                      />
                    )}
                    {(!speaker.image || speaker.image === "/placeholder.svg") && (
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
                        <ImageIcon className="w-6 h-6 text-slate-500" />
                      </div>
                    )}
                  </div>
                  <Input
                    placeholder="Имя"
                    value={speaker.name}
                    onChange={(e) => updateSpeaker(speaker.id, "name", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Input
                    placeholder="Должность"
                    value={speaker.position}
                    onChange={(e) => updateSpeaker(speaker.id, "position", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Input
                    placeholder="Компания"
                    value={speaker.company}
                    onChange={(e) => updateSpeaker(speaker.id, "company", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  {/* File upload button */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleSpeakerImageUpload(speaker.id, file)
                      }}
                      className="hidden"
                      id={`speaker-upload-${speaker.id}`}
                    />
                    <label
                      htmlFor={`speaker-upload-${speaker.id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Загрузить фото
                    </label>
                  </div>
                  <Button
                    onClick={() => deleteSpeaker(speaker.id)}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Moderators */}
          <Card className="p-6 bg-slate-900/80 backdrop-blur-sm border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Модераторы</h2>
              <Button onClick={addModerator} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Добавить модератора
              </Button>
            </div>
            <div className="space-y-4">
              {moderators.map((moderator) => (
                <div key={moderator.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-slate-800 rounded-lg">
                  {/* Image preview */}
                  <div className="flex items-center gap-2">
                    {moderator.image && moderator.image !== "/placeholder.svg" && (
                      <img
                        src={moderator.image || "/placeholder.svg"}
                        alt={moderator.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                      />
                    )}
                    {(!moderator.image || moderator.image === "/placeholder.svg") && (
                      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
                        <ImageIcon className="w-6 h-6 text-slate-500" />
                      </div>
                    )}
                  </div>
                  <Input
                    placeholder="Имя"
                    value={moderator.name}
                    onChange={(e) => updateModerator(moderator.id, "name", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Input
                    placeholder="Роль"
                    value={moderator.role}
                    onChange={(e) => updateModerator(moderator.id, "role", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <select
                    value={moderator.location}
                    onChange={(e) => updateModerator(moderator.id, "location", e.target.value)}
                    className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
                  >
                    <option value="astana">Астана (AITU)</option>
                    <option value="almaty">Алматы (Атакент)</option>
                  </select>
                  {/* File upload button */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleModeratorImageUpload(moderator.id, file)
                      }}
                      className="hidden"
                      id={`moderator-upload-${moderator.id}`}
                    />
                    <label
                      htmlFor={`moderator-upload-${moderator.id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Загрузить фото
                    </label>
                  </div>
                  <Button
                    onClick={() => deleteModerator(moderator.id)}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Schedule */}
          <Card className="p-6 bg-slate-900/80 backdrop-blur-sm border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Расписание</h2>
              <Button onClick={addScheduleEvent} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Добавить событие
              </Button>
            </div>
            <div className="space-y-4">
              {schedule.map((event) => (
                <div key={event.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-slate-800 rounded-lg">
                  <Input
                    type="time"
                    value={event.startTime}
                    onChange={(e) => updateScheduleEvent(event.id, "startTime", e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                  <Input
                    type="time"
                    value={event.endTime}
                    onChange={(e) => updateScheduleEvent(event.id, "endTime", e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                  <Input
                    placeholder="Название события"
                    value={event.title}
                    onChange={(e) => updateScheduleEvent(event.id, "title", e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white md:col-span-3"
                  />
                  <Input
                    placeholder="Спикер (опционально)"
                    value={event.speaker || ""}
                    onChange={(e) => updateScheduleEvent(event.id, "speaker", e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                  <Button
                    onClick={() => deleteScheduleEvent(event.id)}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
