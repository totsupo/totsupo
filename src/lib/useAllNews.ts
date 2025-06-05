import matter from "gray-matter"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import type { NewsItem } from "../types/news.ts"

// Client-side hook for React components (deprecated - use getAllNews for Next.js)
export function useAllNews(): NewsItem[] {
  // This function is deprecated in Next.js environment
  // Use getAllNews instead for server-side data fetching
  throw new Error("useAllNews is not supported in Next.js. Use getAllNews instead.")
}

// Helper function to generate a short, URL-safe slug
function generateShortSlug(filename: string): string {
  // Extract date prefix if it exists (YYYYMMDD-)
  const dateMatch = filename.match(/^(\d{8})-/)
  const datePrefix = dateMatch ? dateMatch[1] : ''
  
  // Check if the filename is already short enough (e.g., from CMS with manual slug)
  const titlePart = filename.replace(/^\d{8}-/, '')
  if (titlePart.length <= 50 && /^[a-zA-Z0-9\-_]+$/.test(titlePart)) {
    return filename // Use as-is if it's already URL-safe and short
  }
  
  // Create a hash of the full filename for uniqueness
  const hash = crypto.createHash('md5').update(filename).digest('hex').substring(0, 8)
  
  return datePrefix ? `${datePrefix}-${hash}` : hash
}

// Create a cache for filename to slug mapping
const slugToFilenameCache = new Map<string, string>()
const filenameToSlugCache = new Map<string, string>()

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
      
      // Generate slug - prefer frontmatter slug if available
      const filenameWithoutExt = filename.replace(/\.md$/, '')
      let slug = filenameToSlugCache.get(filenameWithoutExt)
      
      if (!slug) {
        // Use frontmatter slug if available and valid
        if (data.slug && typeof data.slug === 'string' && /^[a-zA-Z0-9\-_]+$/.test(data.slug)) {
          // Extract date prefix from filename for consistency
          const dateMatch = filenameWithoutExt.match(/^(\d{8})-/)
          slug = dateMatch ? `${dateMatch[1]}-${data.slug}` : data.slug
        } else {
          slug = generateShortSlug(filenameWithoutExt)
        }
        filenameToSlugCache.set(filenameWithoutExt, slug)
        slugToFilenameCache.set(slug, filenameWithoutExt)
      }
      
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
    // Rebuild the cache if needed
    if (slugToFilenameCache.size === 0) {
      getAllNews() // This will populate the cache
    }
    
    // Find the original filename using the short slug
    const originalFilename = slugToFilenameCache.get(slug)
    if (!originalFilename) {
      return null
    }
    
    const filePath = path.join(process.cwd(), 'src/content/news', `${originalFilename}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug, // Use the short slug
      content,
      ...(data as Omit<NewsItem, "slug" | "content">)
    }
  } catch (error) {
    return null
  }
}
