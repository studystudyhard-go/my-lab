"use client"

import * as React from "react"
import { FlipHorizontal2, FlipVertical2, RotateCcw, RotateCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { ImageActionBar } from "@/components/app/image-action-bar"

type Props = {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: "eager" | "lazy"
  className?: string
  imageClassName?: string
}

export function FlippableImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  className,
  imageClassName,
}: Props) {
  const [flipHorizontal, setFlipHorizontal] = React.useState(false)
  const [flipVertical, setFlipVertical] = React.useState(false)
  const [rotation, setRotation] = React.useState(0)

  const transform = [
    rotation ? `rotate(${rotation}deg)` : null,
    flipHorizontal ? "scaleX(-1)" : null,
    flipVertical ? "scaleY(-1)" : null,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={cn("group relative isolate overflow-visible", className)}>
      <ImageActionBar
        title="图片操作"
        groups={[
          {
            key: "rotate",
            label: "旋转",
            actions: [
              {
                key: "rotate-ccw",
                label: "逆时针 90 度",
                icon: RotateCcw,
                onClick: () => setRotation((value) => value - 90),
              },
              {
                key: "rotate-cw",
                label: "顺时针 90 度",
                icon: RotateCw,
                onClick: () => setRotation((value) => value + 90),
              },
            ],
          },
          {
            key: "flip",
            label: "翻转",
            actions: [
              {
                key: "flip-horizontal",
                label: "左右翻转",
                icon: FlipHorizontal2,
                active: flipHorizontal,
                onClick: () => setFlipHorizontal((value) => !value),
              },
              {
                key: "flip-vertical",
                label: "上下翻转",
                icon: FlipVertical2,
                active: flipVertical,
                onClick: () => setFlipVertical((value) => !value),
              },
            ],
          },
        ]}
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={cn("block transition-transform duration-300 will-change-transform", imageClassName)}
        style={
          transform
            ? {
                transform,
                transformOrigin: "center",
              }
            : undefined
        }
      />
    </div>
  )
}
