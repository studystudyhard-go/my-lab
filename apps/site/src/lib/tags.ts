import { getCollection } from "astro:content"

export function encodeTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{Letter}\p{Number}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function decodeTag(tag: string) {
  return tag
}

export function getTagHref(tag: string) {
  return `/tags/${encodeTag(tag)}`
}

export async function getTagData() {
  const [works, lab, books] = await Promise.all([
    getCollection("works"),
    getCollection("lab"),
    getCollection("books"),
  ])

  const allTags = Array.from(
    new Set(
      [...works, ...lab, ...books].flatMap((entry) => entry.data.tags ?? [])
    )
  ).sort((a, b) => a.localeCompare(b, "zh-CN"))

  return { works, lab, books, allTags }
}

export function findTagBySlug(tags: string[], slug: string) {
  return tags.find((tag) => encodeTag(tag) === slug)
}
