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
  SheetTrigger,
} from "@my/ui/sheet"

type Props = {
  currentPath: string
  overlay?: boolean
}

export function SiteHeader({ currentPath, overlay = false }: Props) {
  const [scrolled, setScrolled] = React.useState(false)
  const items = navigationItems(currentPath)

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
        "top-0 z-50 w-full transition-all duration-300",
        overlay
          ? "fixed inset-x-0"
          : "sticky border-b border-border/60 bg-background/90 backdrop-blur-xl",
        overlay && !scrolled && "bg-transparent",
        overlay && scrolled && "bg-background/88 backdrop-blur-xl shadow-sm border-b border-border/70"
      )}
    >
      <div className="mx-auto flex w-full max-w-[124rem] items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-5">
          <a
            href={withBase("/")}
            className={cn(
              "font-sans text-3xl tracking-[0.35em] uppercase",
              overlay && !scrolled ? "text-white" : "text-foreground"
            )}
          >
            {siteConfig.name}
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
          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({
                  variant: overlay && !scrolled ? "secondary" : "outline",
                  size: "icon",
                }),
                "relative z-[60] rounded-full pointer-events-auto",
                overlay && !scrolled && "border-white/20 bg-white/12 text-white"
              )}
            >
                <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[18rem] px-6 pt-6 pb-8">
              <SheetTitle className="pr-14 font-sans text-xl tracking-[0.22em] uppercase">
                {siteConfig.name}
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
