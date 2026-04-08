import { badgeVariants } from "@my/ui/badge"

import { cn } from "@/lib/utils"
import { getTagHref } from "@/lib/tags"
import { withBase } from "@/lib/site"
import { isHiddenTag } from "@/lib/works"

type Props = {
  tag: string
  active?: boolean
  variant?: "outline" | "secondary"
  className?: string
}

export function TagLink({ tag, active = false, variant = "outline", className }: Props) {
  if (isHiddenTag(tag)) return null

  return (
    <a
      href={withBase(getTagHref(tag))}
      className={cn(
        badgeVariants({ variant: active ? "default" : variant }),
        "rounded-full px-3 py-1 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {tag}
    </a>
  )
}
