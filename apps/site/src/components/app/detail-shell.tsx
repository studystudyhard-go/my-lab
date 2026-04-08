import { withBase } from "@/lib/site"
import { filterVisibleTags } from "@/lib/works"
import { Badge } from "@my/ui/badge"
import { buttonVariants } from "@my/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@my/ui/card"
import { Separator } from "@my/ui/separator"
import { TagLink } from "@/components/app/tag-link"

type Props = {
  title: string
  summary: string
  meta?: string
  tags?: string[]
  backHref: string
  backLabel: string
  children: React.ReactNode
}

export function DetailShell({
  title,
  summary,
  meta,
  tags = [],
  backHref,
  backLabel,
  children,
}: Props) {
  const visibleTags = filterVisibleTags(tags)

  return (
    <section className="space-y-8">
      <a
        href={withBase(backHref)}
        className={buttonVariants({
          variant: "ghost",
          className: "rounded-full px-0 text-sm tracking-[0.18em] uppercase",
        })}
      >
        {backLabel}
      </a>
      <Card className="rounded-[2rem] border-border/60 bg-card/80 shadow-sm">
        <CardHeader className="space-y-6 px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <CardTitle className="text-5xl tracking-[-0.06em] md:text-7xl">{title}</CardTitle>
            {meta ? (
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]">
                {meta}
              </Badge>
            ) : null}
          </div>
          <p className="max-w-4xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
            {summary}
          </p>
          {visibleTags.length ? (
            <div className="flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <TagLink key={tag} tag={tag} />
              ))}
            </div>
          ) : null}
        </CardHeader>
        <Separator />
        <CardContent className="space-y-8 px-6 py-8 md:px-10 md:py-10">
          {children}
        </CardContent>
      </Card>
    </section>
  )
}
