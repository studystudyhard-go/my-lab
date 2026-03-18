import { Badge } from "@my/ui/badge"
import { Card, CardContent } from "@my/ui/card"
import { cn } from "@/lib/utils"

type BlockImage =
  | string
  | {
      src: string
      width?: number
      height?: number
    }

export type ArticleMediaBlock = {
  title: string
  body: string
  image: BlockImage
  alt?: string
  caption?: string
  align?: "left" | "right"
  tone?: "default" | "muted"
}

function resolveImage(block: ArticleMediaBlock) {
  if (typeof block.image === "string") {
    return {
      src: block.image,
      width: undefined,
      height: undefined,
    }
  }

  return block.image
}

export function ArticleMediaBlocks({ blocks = [] }: { blocks?: ArticleMediaBlock[] }) {
  if (!blocks.length) return null

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const image = resolveImage(block)
        const reversed = block.align === "right"

        return (
          <Card
            key={`${block.title}-${index}`}
            className={cn(
              "overflow-hidden rounded-[2rem] border-border/60 shadow-sm",
              block.tone === "muted" ? "bg-secondary/35" : "bg-card/72"
            )}
          >
            <div className="grid gap-0 md:grid-cols-2">
              <div className={cn("relative min-h-[18rem]", reversed && "md:order-2")}>
                <img
                  src={image.src}
                  alt={block.alt ?? block.title}
                  width={image.width}
                  height={image.height}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className={cn("flex items-center p-6 md:p-8", reversed && "md:order-1")}>
                <div className="space-y-4">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]">
                    图文
                  </Badge>
                  <h3 className="font-sans text-3xl tracking-[-0.04em] md:text-4xl">{block.title}</h3>
                  <div className="space-y-4 text-base leading-8 text-muted-foreground md:text-lg">
                    {block.body.split(/\n\s*\n/).map((paragraph, paragraphIndex) => (
                      <p key={`${block.title}-p-${paragraphIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                  {block.caption ? (
                    <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">{block.caption}</p>
                  ) : null}
                </div>
              </CardContent>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
