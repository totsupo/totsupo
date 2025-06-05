import matter from "gray-matter"
import type { NewsItem } from "../types/news.ts"

export function useAllNews(): NewsItem[] {
  const files = import.meta.glob("../content/news/*.md", {
    eager: true,
    as: "raw",
  })

  return Object.entries(files)
    .map(([path, raw]) => {
      const { data, content } = matter(raw as string)
      const slug = path.split("/").pop()!.replace(/\.md$/, "")
      return { slug, content, ...(data as Omit<NewsItem, "slug" | "content">) }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
