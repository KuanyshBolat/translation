"use client"

import Image from "next/image"

export function PartnersMarquee() {
  const partners = [
    {
      id: 1,
      name: "Белая",
      logo: "/images/d0-b1-d0-b5-d0-bb-d0-b0-d1-8f.png",
    },
    {
      id: 2,
      name: "ITFest",
      logo: "/images/logo-itfest.svg",
    },
    {
      id: 3,
      name: "Friends",
      logo: "/images/d1-84-d1-80-d0-b5-d0-bd-d0-b4-d1-81-20-282-29.svg",
    },
    {
      id: 4,
      name: "Logo White",
      logo: "/images/logo-20white-20-281-29.png",
    },
    {
      id: 5,
      name: "NNEF",
      logo: "/images/logo-20white-20-281-29.png",
    },
  ]

  // Duplicate for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners]

  return (
    <div className="w-full py-8 overflow-hidden ">
      <div className="relative flex">
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicatedPartners.map((partner, index) => (
            <div key={`${partner.id}-${index}`} className="mx-12 flex items-center justify-center">
              <div className="relative w-40 h-20 opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
