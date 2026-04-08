import { Badge } from "@my/ui/badge"
import { Card } from "@my/ui/card"
import { filterVisibleTags } from "@/lib/works"
import { TagLink } from "@/components/app/tag-link"

type Node = any

export function WorkLayoutNode({
  node,
  overlayDate,
}: {
  node: Node
  overlayDate?: string
  }) {
  const flexValue = node.flex ?? 1
  const visibleTags = filterVisibleTags(node.tags ?? [])

  if (node.type === "group") {
    return (
      <div className={`flex min-w-0 gap-3 ${node.direction === "column" ? "flex-col" : "flex-row"}`} style={{ flex: flexValue }}>
        {node.children.map((child: Node, index: number) => (
          <WorkLayoutNode key={`${child.type}-${index}`} node={child} overlayDate={overlayDate} />
        ))}
      </div>
    )
  }

  return (
    <Card
      className="relative flex min-w-0 overflow-hidden rounded-[1.5rem] border-0 bg-white/70 p-0 shadow-sm"
      style={{ flex: flexValue }}
    >
      <img
        src={node.src.src}
        alt={node.alt ?? node.caption ?? ""}
        width={node.src.width}
        height={node.src.height}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {overlayDate ? (
        <Badge className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-background/95 px-3 py-1 font-sans text-[10px] tracking-[0.2em] text-foreground shadow-sm">
          {overlayDate}
        </Badge>
      ) : null}
      {node.caption || node.note || visibleTags.length ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-background/92 via-background/70 to-transparent px-4 pb-4 pt-10">
          {node.caption ? <p className="font-sans text-lg font-semibold tracking-[-0.03em]">{node.caption}</p> : null}
          {node.note ? <p className="text-sm leading-6 text-muted-foreground">{node.note}</p> : null}
          {visibleTags.length ? (
            <div className="pointer-events-auto flex flex-wrap gap-2">
              {visibleTags.map((tag: string) => (
                <TagLink key={tag} tag={tag} variant="secondary" />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </Card>
  )
}
