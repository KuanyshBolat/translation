"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Radio, Users, Settings } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const pathname = usePathname()

  const links = [
    {
      href: "/speakers",
      label: "Трансляция спикеров",
      icon: Users,
    },
    {
      href: "/polygon",
      label: "Трансляция полигона",
      icon: Radio,
    },
    {
      href: "/statistics",
      label: "Статистика",
      icon: BarChart3,
    },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-24 h-10">
              <Image src="/images/logo-itfest.svg" alt="ITFest Logo" fill className="object-contain" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              CTF
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              const Icon = link.icon

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-500/20 text-blue-300 font-semibold"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
