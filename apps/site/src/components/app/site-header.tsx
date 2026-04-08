"use client"

import * as React from "react"
import { siteConfig } from "@my/config"
import { Menu } from "lucide-react"

import { navigationItems, withBase } from "@/lib/site"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/app/theme-toggle"
import { buttonVariants } from "@my/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@my/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@my/ui/sheet"

type Props = {
  currentPath: string
  overlay?: boolean
}

export function SiteHeader({ currentPath, overlay = false }: Props) {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const items = navigationItems(currentPath)
  const avatarSrc = withBase("/avatar.png")

  React.useEffect(() => {
    if (!overlay) return

    const onScroll = () => {
      setScrolled(window.scrollY > 56)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [overlay])

  return (
    <header
      className={cn(
        "top-0 isolate z-[110] w-full transition-all duration-300",
        overlay
          ? "fixed inset-x-0"
          : "sticky border-b border-border/60 bg-background/90 backdrop-blur-xl",
        overlay && !scrolled && "bg-transparent",
        overlay && scrolled && "bg-background/88 backdrop-blur-xl shadow-sm border-b border-border/70"
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex w-full max-w-[124rem] items-center justify-between px-4 py-4 md:px-8">
        <div className="flex min-w-0 items-center gap-4 md:gap-5">
          <a
            href={withBase("/")}
            className={cn("flex min-w-0 items-center gap-3", overlay && !scrolled ? "text-white" : "text-foreground")}
          >
            <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-white/90 shadow-sm ring-1 ring-black/5">
              <img
                src={avatarSrc}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="truncate font-sans text-2xl tracking-[0.18em] md:text-3xl md:tracking-[0.24em]">
              {siteConfig.name}
            </span>
          </a>
          <div className="hidden md:block">
            <ThemeToggle overlay={overlay && !scrolled} />
          </div>
        </div>

        <div className="hidden md:block">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-2 bg-transparent">
              {items.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className={cn(
                      "inline-flex rounded-full px-4 py-2 text-base font-medium transition-colors",
                      overlay && !scrolled ? "text-white hover:bg-white/12" : "text-foreground hover:bg-accent/40",
                      item.current && (overlay && !scrolled ? "bg-white/12" : "bg-accent/55")
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <button
              type="button"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className={cn(
                buttonVariants({
                  variant: overlay && !scrolled ? "secondary" : "outline",
                  size: "icon",
                }),
                "rounded-full touch-manipulation shadow-sm",
                overlay && !scrolled && "border-white/20 bg-white/12 text-white"
              )}
              onClick={() => setMenuOpen(true)}
              onTouchEnd={() => setMenuOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <SheetContent
              side="right"
              style={{ width: "min(18rem, 85vw)" }}
              className="px-6 pt-6 pb-8"
            >
              <SheetTitle className="pr-14">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-white/90 shadow-sm ring-1 ring-black/5">
                    <img
                      src={avatarSrc}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="font-sans text-xl tracking-[0.18em]">{siteConfig.name}</span>
                </div>
              </SheetTitle>
              <div className="mt-8">
                <ThemeToggle />
              </div>
              <nav className="mt-12 flex flex-col gap-4 px-1">
                {items.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <a
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: item.current ? "default" : "ghost" }),
                        "h-12 justify-start rounded-full px-5 text-base"
                      )}
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
