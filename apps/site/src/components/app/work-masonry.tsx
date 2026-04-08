"use client"

import { siteConfig } from "@my/config"

import { FlippableImage } from "@/components/app/flippable-image"

export function WorkMasonry({ media }: { media: any[] }) {
  if (!media.length) return null

  if (media.length === 1) {
    const item = media[0]

    return (
      <div className="mx-auto w-full">
        <div
          className="relative flex w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-secondary/20"
          style={{ height: `${siteConfig.worksDisplay.detailMinHeight * 16}px` }}
        >
          <FlippableImage
            src={item.src.src}
            alt={item.alt ?? item.caption ?? ""}
            width={item.src.width}
            height={item.src.height}
            loading="lazy"
            className="flex h-full w-full items-center justify-center"
            imageClassName="block h-full w-auto max-w-full object-contain"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl columns-1 gap-4 md:columns-2 xl:columns-3">
      {media.map((item, index) => (
        <div key={`${item.src.src}-${index}`} className="mb-4 break-inside-avoid overflow-hidden rounded-[1.5rem]">
          <FlippableImage
            src={item.src.src}
            alt={item.alt ?? item.caption ?? ""}
            width={item.src.width}
            height={item.src.height}
            loading="lazy"
            className="w-full"
            imageClassName="block h-auto w-full"
          />
        </div>
      ))}
    </div>
  )
}
