import { siteConfig } from "@my/config"

import { withBase } from "@/lib/site"
import { Card, CardContent, CardHeader, CardTitle } from "@my/ui/card"
import { TagLink } from "@/components/app/tag-link"
import { WorkLayoutNode } from "@/components/app/work-layout-node"

export function WorkShowcaseCard({
  entry,
  href,
  displayDate,
}: {
  entry: any
  href: string
  displayDate: string
}) {
  const layout = entry.data.coverLayout
  const fallbackImage = entry.data.media?.[0]
  const minHeight = layout?.minHeight ?? siteConfig.worksDisplay.cardMinHeight * 16
  const hasTags = entry.data.tags.length > 0

  return (
    <Card className="group relative overflow-hidden rounded-[2rem] border-border/60 bg-card/80 p-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
      <a
        href={withBase(href)}
        aria-label={`Open ${entry.data.title}`}
        className="absolute inset-0 z-10"
      />
      <div className="relative z-20 pointer-events-none">
        <div
          className={`flex gap-3 bg-secondary/30 p-3 ${layout?.direction === "column" ? "flex-col" : "flex-row"} max-md:flex-col`}
          style={{ minHeight }}
        >
          {layout
            ? layout.children.map((node: any, index: number) => (
                <WorkLayoutNode key={`${node.type}-${index}`} node={node} overlayDate={displayDate} />
              ))
            : fallbackImage
              ? <WorkLayoutNode node={fallbackImage} overlayDate={displayDate} />
              : null}
        </div>
        <CardHeader className="space-y-4 px-6 pt-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <CardTitle className="text-4xl tracking-[-0.05em]">{entry.data.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-6 pb-6">
          <p className={hasTags ? "min-h-24 overflow-hidden text-base leading-8 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]" : "min-h-32 overflow-hidden text-base leading-8 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]"}>
            {entry.data.summary}
          </p>
          <div className="relative z-30 -mx-1 overflow-x-auto pb-1 pointer-events-auto">
            <div className="flex min-w-max gap-2 px-1">
              {entry.data.tags.map((tag: string) => (
                <TagLink key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
