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

// Recursively find all index.md files in the news directory
function findNewsFiles(dir: string, basePath: string = ''): string[] {
  const items = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    const relativePath = path.join(basePath, item.name)
    
    if (item.isDirectory()) {
      files.push(...findNewsFiles(fullPath, relativePath))
    } else if (item.name === 'index.md') {
      files.push(basePath)
    }
  }
  
  return files
}

// Server-side function for Next.js
export function getAllNews(): NewsItem[] {
  const newsDirectory = path.join(process.cwd(), 'src/content/news')
  const newsFiles = findNewsFiles(newsDirectory)
  
  // Create local caches for this function call
  const slugToFilenameCache = new Map<string, string>()
  const filenameToSlugCache = new Map<string, string>()
  
  const allNews = newsFiles
    .map(relativePath => {
      const filePath = path.join(newsDirectory, relativePath, 'index.md')
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Generate slug - prefer frontmatter slug if available
      let slug: string
      
      if (data.slug && typeof data.slug === 'string' && /^[a-zA-Z0-9\-_]+$/.test(data.slug)) {
        // Use frontmatter slug as-is (this preserves the English slugs)
        slug = data.slug
        
        // Check for slug collision and handle it
        if (slugToFilenameCache.has(slug)) {
          console.warn(`Slug collision detected: "${slug}" already exists. Adding date suffix.`)
          // Add date suffix to make slug unique
          const date = new Date(data.date)
          const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
          slug = `${slug}-${dateStr}`
        }
      } else {
        // Fallback: Generate from directory path if no frontmatter slug
        const pathParts = relativePath.split(path.sep)
        if (pathParts.length >= 3) {
          const [year, month, articleDir] = pathParts
          // Extract just the title part after the day prefix
          const titlePart = articleDir.replace(/^\d{2}-/, '')
          slug = generateShortSlug(`${year}${month}${articleDir}`)
        } else {
          return null
        }
      }
      
      filenameToSlugCache.set(relativePath, slug)
      slugToFilenameCache.set(slug, relativePath)
      
      return {
        slug,
        content,
        ...(data as Omit<NewsItem, "slug" | "content">)
      }
    })
    .filter((item): item is NewsItem => item !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
  return allNews
}

// Server-side function to get single news item
export function getNewsBySlug(slug: string): NewsItem | null {
  try {
    // Get all news to find the matching slug
    const allNews = getAllNews()
    const article = allNews.find(news => news.slug === slug)
    
    return article || null
  } catch (error) {
    return null
  }
}
