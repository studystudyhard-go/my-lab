import { getCollection } from "astro:content"
import {
  filterVisibleCollectionEntries,
  filterVisibleTags,
  sortEntriesByPublishedAt,
} from "@/lib/works"

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

  const visibleWorks = sortEntriesByPublishedAt(filterVisibleCollectionEntries(works))
  const visibleLab = sortEntriesByPublishedAt(filterVisibleCollectionEntries(lab))
  const visibleBooks = sortEntriesByPublishedAt(filterVisibleCollectionEntries(books))

  const allTags = Array.from(
    new Set(
      [...visibleWorks, ...visibleLab, ...visibleBooks].flatMap((entry) =>
        filterVisibleTags(entry.data.tags ?? [])
      )
    )
  ).sort((a, b) => a.localeCompare(b, "zh-CN"))

  return { works: visibleWorks, lab: visibleLab, books: visibleBooks, allTags }
}

export function findTagBySlug(tags: string[], slug: string) {
  return filterVisibleTags(tags).find((tag) => encodeTag(tag) === slug)
}
