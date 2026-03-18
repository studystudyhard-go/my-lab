import { Card, CardContent, CardHeader, CardTitle } from "@my/ui/card"

type Props = {
  title: string
  description: string
}

export function ModuleHeader({ title, description }: Props) {
  return (
    <Card className="overflow-hidden rounded-[2rem] border-border/60 bg-card/75 shadow-sm backdrop-blur-sm">
      <CardHeader className="gap-6 px-6 py-4 md:px-10 md:py-5">
        <CardTitle className="text-6xl leading-none tracking-[-0.06em] md:text-8xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-8 text-xl leading-9 text-muted-foreground md:px-10">
        {description}
      </CardContent>
    </Card>
  )
}
