import matter from "gray-matter"
import fs from "fs"
import path from "path"
import type { NewsItem } from "../types/news.ts"

// Client-side hook for React components
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

// Server-side function for Next.js
export function getAllNews(): NewsItem[] {
  const newsDirectory = path.join(process.cwd(), 'src/content/news')
  const filenames = fs.readdirSync(newsDirectory)
  
  const allNews = filenames
    .filter(name => name.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(newsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      const slug = filename.replace(/\.md$/, '')
      
      return {
        slug,
        content,
        ...(data as Omit<NewsItem, "slug" | "content">)
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
  return allNews
}

// Server-side function to get single news item
export function getNewsBySlug(slug: string): NewsItem | null {
  try {
    const filePath = path.join(process.cwd(), 'src/content/news', `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      content,
      ...(data as Omit<NewsItem, "slug" | "content">)
    }
  } catch (error) {
    return null
  }
}
