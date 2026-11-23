'use client'

import { useState, useEffect } from 'react'
import CoffeeBeans from './CoffeeBeans'
import IcedFoam from './MatchaPowder'
import ChocolateDrip from './ChocolateDrip'

type Item = {
  id: number
  name: string
  category: string
  price: number
}


const POS = [
  "top-0 left-0 w-1/2 -rotate-6 z-10",
  "top-0 right-0 w-1/2 rotate-3 z-30",
  "top-[39%] left-[15%] w-[56%] rotate-6 z-20",
]

const videos_hot = [
  { src: "/coffee.mp4", brightness: "brightness-[1.019]" },
  { src: "/Tea.mp4", brightness: "brightness-[1.029]" },
  { src: "/latte.mp4", brightness: "brightness-100" },
]

const videos_iced = [
  { src: "/iced.mp4", brightness: "brightness-[1.019]" },
  { src: "/iced2.mp4", brightness: "brightness-[1.029]" },
  { src: "/iced3.mp4", brightness: "brightness-100" },
]

const videos_cake = [
  { src: "/cake.mp4", brightness: "brightness-[1.019]" },
  { src: "/cake2.mp4", brightness: "brightness-[1.029]" },
  { src: "/cake3.mp4", brightness: "brightness-100" },
]

type Video = { src: string; brightness: string }

function MenuList({ items }: { items: Item[] }) {
  return (
    <ul className="flex flex-col gap-4 text-lg sm:text-xl md:gap-5 md:text-2xl">
      {items.map((item) => (
        <li key={item.id} className="flex items-end gap-2">
          <span>{item.name}</span>
          <span className="mb-1.5 flex-1 border-b-2 border-dotted border-black/40 md:mb-2" />
          <span>{item.price}</span>
        </li>
      ))}
    </ul>
  )
}

function VideoStack({ videos }: { videos: Video[] }) {
  return (
    <div className="relative mx-auto aspect-[20/23] w-full max-w-[20rem] shrink-0 md:mx-0 md:w-[20rem]">
      {videos.map((video, i) => (
        <div
          key={video.src}
          className={`absolute aspect-square overflow-hidden rounded-2xl bg-[#e0dcd4] shadow-lg shadow-black/20 transition-transform duration-300 hover:z-40 hover:rotate-0 hover:scale-105 md:rounded-3xl md:shadow-xl ${POS[i]}`}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`block h-full w-full object-cover ${video.brightness}`}
            src={video.src}
          />
        </div>
      ))}
    </div>
  )
}

function MenuSection({
  title,
  items,
  videos,
}: {
  title: string
  items: Item[]
  videos: Video[]
}) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
      <div className="w-full md:max-w-md">
        <h2 className="mb-6 text-2xl sm:text-3xl md:mb-8">{title}</h2>
        <MenuList items={items} />
      </div>

      <VideoStack videos={videos} />
    </section>
  )
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([])

useEffect(() => {
  fetch(process.env.NEXT_PUBLIC_API_URL ?? 'https://menu-backend-grr7.onrender.com')
    .then((res) => res.json())
    .then((data) => setItems(data))
    .catch((err) => console.error('Failed to load menu:', err))
}, []) 
  const by = (category: string) => items.filter((i) => i.category === category)

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#e0dcd1]">
      
      <div className="relative overflow-hidden text-pink-950 bg-[#e0dcd1] px-5 pb-10 md:px-6 md:pb-20">
        <CoffeeBeans />

        <div className="relative z-10">
          <h1 className="mb-6 w-full px-4 py-6 text-center text-5xl md:mb-10 md:p-6 md:text-6xl">
            Layali
          </h1>

          <MenuSection
            title="Hot Favorites"
            items={by('hot')}
            videos={videos_hot}
          />
        </div>
      </div>

    
      <div className="relative z-10 bg-[#f0e0ea] text-[#577665]  px-5 pb-16 pt-[max(13rem,14.5vw)] md:px-6">
        <IcedFoam />

        <div className="relative z-10">
          <MenuSection
            title="Iced Favorites"
            items={by('cold')}
            videos={videos_iced}
          />
        </div>
      </div>

      
      <div className="relative overflow-hidden text-amber-950 bg-[#e0dcd1] px-5 pb-16 pt-[max(15rem,17vw)] md:px-6">
        <ChocolateDrip />

        <div className="relative z-10">
          <MenuSection title="Cakes" items={by('cake')} videos={videos_cake} />
        </div>
      </div>
    </main>
  )
}