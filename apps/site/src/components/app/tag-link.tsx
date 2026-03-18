import { Badge } from "@my/ui/badge"

import { cn } from "@/lib/utils"
import { getTagHref } from "@/lib/tags"
import { withBase } from "@/lib/site"

type Props = {
  tag: string
  active?: boolean
  variant?: "outline" | "secondary"
  className?: string
}

export function TagLink({ tag, active = false, variant = "outline", className }: Props) {
  return (
    <Badge
      asChild
      variant={active ? "default" : variant}
      className={cn(
        "rounded-full px-3 py-1 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      <a href={withBase(getTagHref(tag))}>{tag}</a>
    </Badge>
  )
}
