"use client"

import type { ComponentType } from "react"

import { cn } from "@/lib/utils"

type ImageAction = {
  key: string
  label: string
  icon: ComponentType<{ className?: string }>
  active?: boolean
  onClick: () => void
}

export type ImageActionGroup = {
  key: string
  label: string
  actions: ImageAction[]
}

type Props = {
  actions?: ImageAction[]
  groups?: ImageActionGroup[]
  title?: string
  className?: string
}

function ActionButtons({ actions }: { actions: ImageAction[] }) {
  return (
    <div className="pointer-events-auto inline-flex items-center gap-0.5">
      {actions.map((action) => {
        const Icon = action.icon

        return (
          <button
            key={action.key}
            type="button"
            onClick={action.onClick}
            className={cn(
              "inline-flex size-[18px] cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/88 transition-all duration-200 hover:bg-white/18 hover:text-white focus-visible:bg-white/18 focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70",
              action.active && "bg-white/18 text-white shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
            )}
            aria-label={action.label}
            aria-pressed={action.active ?? false}
            title={action.label}
          >
            <Icon className="size-3" />
          </button>
        )
      })}
    </div>
  )
}

export function ImageActionBar({
  actions = [],
  groups = [],
  title = "图片操作",
  className,
}: Props) {
  const hasGroups = groups.length > 0
  if (!actions.length && !hasGroups) return null

  return (
    <div
      role="toolbar"
      aria-label={title}
      className={cn(
        "absolute left-3 top-3 z-30 inline-flex h-[20px] items-center rounded-full border border-white/12 bg-black/50 px-1 text-white shadow-[0_14px_30px_rgba(0,0,0,0.26)] backdrop-blur-xl transition-opacity duration-200",
        "opacity-100 visible md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible md:group-focus-within:opacity-100 md:group-focus-within:visible",
        "max-md:left-3 max-md:top-3",
        className
      )}
    >
      <span className="sr-only">{title}</span>
      {hasGroups ? (
        <div className="flex items-center gap-1">
          {groups.map((group, index) => (
            <div key={group.key} className="flex items-center gap-0.5">
              <ActionButtons actions={group.actions} />
              {index < groups.length - 1 ? <span aria-hidden="true" className="mx-0.5 h-3 w-px bg-white/12" /> : null}
            </div>
          ))}
        </div>
      ) : (
        <ActionButtons actions={actions} />
      )}
    </div>
  )
}
