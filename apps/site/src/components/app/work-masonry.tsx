import { Badge } from "@my/ui/badge"
import { Card } from "@my/ui/card"
import { TagLink } from "@/components/app/tag-link"

export function WorkMasonry({
  media,
  displayDate,
}: {
  media: any[]
  displayDate: string
}) {
  return (
    <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
      {media.map((item, index) => (
        <Card
          key={`${item.src.src}-${index}`}
          className="mb-4 break-inside-avoid overflow-hidden rounded-[1.75rem] border-border/60 bg-card/78 p-0 shadow-sm"
        >
          <div className="relative">
            <img
              src={item.src.src}
              alt={item.alt ?? item.caption ?? ""}
              width={item.src.width}
              height={item.src.height}
              className="h-auto w-full object-cover"
            />
            <Badge className="absolute bottom-4 right-4 rounded-full bg-background/95 px-3 py-1 font-sans text-[10px] tracking-[0.2em] text-foreground">
              {displayDate}
            </Badge>
          </div>
          <div className="space-y-3 px-5 py-5">
            {item.caption ? <p className="font-sans text-xl font-semibold tracking-[-0.03em]">{item.caption}</p> : null}
            {item.note ? <p className="text-sm leading-7 text-muted-foreground">{item.note}</p> : null}
            {item.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag: string) => (
                  <TagLink key={tag} tag={tag} variant="secondary" />
                ))}
              </div>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  )
}
