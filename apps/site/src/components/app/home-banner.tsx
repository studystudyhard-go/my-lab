"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { withBase } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Badge } from "@my/ui/badge"
import { Button } from "@my/ui/button"

type BannerItem = {
  entryId: string
  title: string
  note: string
  src: string
  alt: string
}

export function HomeBanner({ items }: { items: BannerItem[] }) {
  const [current, setCurrent] = React.useState(0)
  const touchStartX = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (items.length <= 1) return

    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % items.length)
    }, 5000)
    return () => {
      window.clearInterval(timer)
    }
  }, [items.length])

  const goTo = React.useCallback((index: number) => {
    const total = items.length
    if (total === 0) return
    setCurrent((index + total) % total)
  }, [items.length])

  const goPrev = React.useCallback(() => {
    goTo(current - 1)
  }, [current, goTo])

  const goNext = React.useCallback(() => {
    goTo(current + 1)
  }, [current, goTo])

  const handleTouchStart = React.useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }, [])

  const handleTouchEnd = React.useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const delta = touchEndX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(delta) < 40) return

    if (delta > 0) {
      goPrev()
      return
    }

    goNext()
  }, [goNext, goPrev])

  if (items.length === 0) return null

  return (
    <section className="relative w-full">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item) => (
            <div key={item.entryId} className="min-w-full">
              <div className="relative min-h-[55vh] overflow-hidden max-md:min-h-[54vh]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/8 to-black/48" />
                <div className="relative flex min-h-[55vh] items-end px-6 pb-6 pt-24 md:px-10 md:pb-8 md:pt-20 max-md:min-h-[54vh]">
                  <div className="max-w-4xl space-y-5 text-white">
                    <Badge className="rounded-full bg-white/14 px-4 py-1.5 font-sans text-[11px] tracking-[0.28em] text-white">
                      作品展
                    </Badge>
                    <h1 className="text-6xl leading-none tracking-[-0.08em] md:text-[7rem]">
                      {item.title}
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-white/85 md:text-2xl md:leading-10">
                      {item.note}
                    </p>
                    <Button asChild size="lg" className="rounded-full px-7">
                      <a href={withBase(`/works/${item.entryId}`)}>View Project</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 1 ? (
          <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-4 md:px-8">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/85 shadow-sm"
              onClick={goPrev}
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/85 shadow-sm"
              onClick={goNext}
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        ) : null}

        {items.length > 1 ? (
          <div className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.entryId}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full bg-white/45 transition-all",
                  current === index && "w-8 bg-white"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
