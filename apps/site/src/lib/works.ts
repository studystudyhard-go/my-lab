import { siteConfig } from '@my/config';

export const buildDate = new Date();

export function formatDisplayDate(date?: Date) {
  const value = date ?? buildDate;
  return value.toISOString().slice(0, 10);
}

export function getDisplayDate(entry: any) {
  return formatDisplayDate(entry.data.publishedAt);
}

export function isHiddenCollectionEntry(entry: any) {
  return String(entry?.id ?? "")
    .split("/")
    .filter(Boolean)
    .some((segment) => segment.startsWith("_")) || entry?.data?.hidden === true;
}

export function isHiddenTag(tag: string) {
  return tag.trim().startsWith("_");
}

export function filterVisibleTags(tags: string[] = []) {
  return tags.filter((tag) => !isHiddenTag(tag));
}

export function filterVisibleCollectionEntries(entries: any[]) {
  return entries.filter((entry) => !isHiddenCollectionEntry(entry));
}

export function sortEntriesByPublishedAt(entries: any[]) {
  return [...entries].sort(
    (a, b) => (b.data.publishedAt?.getTime() ?? 0) - (a.data.publishedAt?.getTime() ?? 0)
  );
}

function walkNodes(nodes: any[], images: any[] = []) {
  for (const node of nodes) {
    if (node.type === 'image') {
      images.push(node);
    } else if (node?.children) {
      walkNodes(node.children, images);
    }
  }

  return images;
}

export function getLayoutImages(layout?: any) {
  return layout?.children ? walkNodes(layout.children) : [];
}

export function getBannerItems(entries: any[]) {
  return entries
    .flatMap((entry) =>
      [...getLayoutImages(entry.data.coverLayout), ...(entry.data.media ?? [])]
        .filter((image) => image.banner)
        .map((image) => ({
          entryId: entry.id,
          title: image.caption ?? entry.data.title,
          note: image.note ?? entry.data.summary,
          src: image.src.src,
          alt: image.alt ?? image.caption ?? entry.data.title,
        })),
    )
    .slice(0, siteConfig.worksDisplay.bannerLimit);
}

export function getStandaloneMedia(entry: any) {
  const used = new Set(getLayoutImages(entry.data.coverLayout).map((image) => image.src.src));
  return (entry.data.media ?? []).filter((image: any) => !used.has(image.src.src));
}

export function getAllWorkMedia(entry: any) {
  const seen = new Set<string>();
  const ordered = [...getLayoutImages(entry.data.coverLayout), ...(entry.data.media ?? [])];

  return ordered.filter((image: any) => {
    const key = image.src.src;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
