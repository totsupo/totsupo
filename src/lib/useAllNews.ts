import matter from "gray-matter"
import fs from "fs"
import path from "path"
import type { NewsItem } from "../types/news.ts"

// Client-side hook for React components (deprecated - use getAllNews for Next.js)
export function useAllNews(): NewsItem[] {
  // This function is deprecated in Next.js environment
  // Use getAllNews instead for server-side data fetching
  throw new Error("useAllNews is not supported in Next.js. Use getAllNews instead.")
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
    // URL-decode the slug to handle encoded characters (e.g., Japanese characters)
    const decodedSlug = decodeURIComponent(slug)
    const filePath = path.join(process.cwd(), 'src/content/news', `${decodedSlug}.md`)
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug: decodedSlug, // Use the decoded slug for consistency
      content,
      ...(data as Omit<NewsItem, "slug" | "content">)
    }
  } catch (error) {
    return null
  }
}
