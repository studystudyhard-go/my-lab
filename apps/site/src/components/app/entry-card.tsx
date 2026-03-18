import { withBase } from "@/lib/site"
import { Badge } from "@my/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@my/ui/card"
import { TagLink } from "@/components/app/tag-link"

type CardImage =
  | string
  | {
      src: string
      width?: number
      height?: number
    }

type Props = {
  title: string
  summary: string
  meta?: string
  tags?: string[]
  href?: string
  image?: CardImage
  imageAlt?: string
}

function resolveImage(image?: CardImage) {
  if (!image) return null

  if (typeof image === "string") {
    return {
      src: image,
      width: undefined,
      height: undefined,
    }
  }

  return image
}

export function EntryCard({ title, summary, meta, tags = [], href, image, imageAlt }: Props) {
  const resolvedImage = resolveImage(image)
  const hasTags = tags.length > 0

  return (
    <Card className="group relative overflow-hidden rounded-[1.75rem] border-border/60 bg-card/75 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
      {href ? (
        <a
          href={withBase(href)}
          aria-label={`Open ${title}`}
          className="absolute inset-0 z-10"
        />
      ) : null}
      <div className="relative z-20 pointer-events-none">
      {resolvedImage ? (
        <div className="grid gap-0 md:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[16rem] md:min-h-full">
            <img
              src={resolvedImage.src}
              alt={imageAlt ?? title}
              width={resolvedImage.width}
              height={resolvedImage.height}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-between">
            <CardHeader className="space-y-4 pt-6">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-3xl tracking-[-0.04em]">{title}</CardTitle>
                {meta ? <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]">{meta}</Badge> : null}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <p className={hasTags ? "min-h-24 overflow-hidden text-base leading-8 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]" : "min-h-32 overflow-hidden text-base leading-8 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]"}>
                {summary}
              </p>
              {tags.length > 0 ? (
                <div className="relative z-30 -mx-1 overflow-x-auto pb-1 pointer-events-auto">
                  <div className="flex min-w-max gap-2 px-1">
                    {tags.map((tag) => (
                      <TagLink key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </div>
        </div>
      ) : (
        <>
          <CardHeader className="space-y-4 p-4 pb-0">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-3xl tracking-[-0.04em]">{title}</CardTitle>
              {meta ? <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]">{meta}</Badge> : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-4 pt-0">
            <p className={hasTags ? "min-h-24 overflow-hidden text-base leading-8 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]" : "min-h-32 overflow-hidden text-base leading-8 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]"}>
              {summary}
            </p>
            {tags.length > 0 ? (
              <div className="relative z-30 -mx-1 overflow-x-auto pb-1 pointer-events-auto">
                <div className="flex min-w-max gap-2 px-1">
                  {tags.map((tag) => (
                    <TagLink key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </>
      )}
      </div>
    </Card>
  )
}
