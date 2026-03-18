import { navigation, siteConfig } from "@my/config"

export function withBase(path: string) {
  if (path.startsWith("http") || path.startsWith(siteConfig.base)) {
    return path
  }

  return `${siteConfig.base}${path}`
}

export function navigationItems(currentPath: string) {
  return navigation.map((item) => {
    const path = item.href === "/" ? "/" : item.href

    return {
      ...item,
      path,
      href: withBase(item.href),
      current: currentPath === path,
    }
  })
}
