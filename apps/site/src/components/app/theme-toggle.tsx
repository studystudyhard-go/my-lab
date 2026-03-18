"use client"

import * as React from "react"
import { LaptopMinimal, Moon, SunMedium } from "lucide-react"

import { cn } from "@/lib/utils"

const STORAGE_KEY = "my-lab-theme"

type ThemeMode = "light" | "dark" | "system"

const options: Array<{
  value: ThemeMode
  label: string
  icon: React.ComponentType<{ className?: string }>
}> = [
  { value: "light", label: "Light", icon: SunMedium },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: LaptopMinimal },
]

function resolveTheme(theme: ThemeMode) {
  if (theme !== "system") return theme
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme: ThemeMode) {
  const resolvedTheme = resolveTheme(theme)
  const root = document.documentElement

  root.classList.toggle("dark", resolvedTheme === "dark")
  root.dataset.theme = theme
}

export function ThemeToggle({ overlay = false }: { overlay?: boolean }) {
  const [theme, setTheme] = React.useState<ThemeMode>("system")

  React.useEffect(() => {
    const savedTheme = (window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? "system"
    setTheme(savedTheme)
    applyTheme(savedTheme)

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemChange = () => {
      const currentTheme = (window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? "system"
      if (currentTheme === "system") {
        applyTheme("system")
      }
    }

    const handleThemeSync = (event: Event) => {
      const customEvent = event as CustomEvent<ThemeMode>
      setTheme(customEvent.detail)
    }

    media.addEventListener("change", handleSystemChange)
    window.addEventListener("theme-change", handleThemeSync as EventListener)

    return () => {
      media.removeEventListener("change", handleSystemChange)
      window.removeEventListener("theme-change", handleThemeSync as EventListener)
    }
  }, [])

  const updateTheme = React.useCallback((nextTheme: ThemeMode) => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
    setTheme(nextTheme)
    window.dispatchEvent(new CustomEvent("theme-change", { detail: nextTheme }))
  }, [])

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 shadow-sm backdrop-blur-sm",
        overlay
          ? "border-white/35 bg-white/10"
          : "border-border/80 bg-background/88"
      )}
      aria-label="Theme switcher"
    >
      {options.map((option) => {
        const Icon = option.icon
        const active = theme === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => updateTheme(option.value)}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full transition-all duration-200",
              active
                ? "bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(97,48,179,0.28)]"
                : overlay
                  ? "text-white/80 hover:bg-white/12 hover:text-white"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            )}
            aria-label={option.label}
            aria-pressed={active}
            title={option.label}
          >
            <Icon className="size-4" />
          </button>
        )
      })}
    </div>
  )
}
