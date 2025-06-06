import type { NewsItem } from '../types/news'

export interface TagInfo {
  name: string
  slug: string
  count: number
}

/**
 * タグ名をURL用のスラッグに変換
 */
export function tagToSlug(tag: string): string {
  return encodeURIComponent(tag.trim())
}

/**
 * URL用スラッグをタグ名に変換
 */
export function slugToTag(slug: string): string {
  return decodeURIComponent(slug)
}

/**
 * クライアントサイドで記事配列から全ユニークタグを取得
 */
export function getAllTagsFromPosts(posts: NewsItem[]): TagInfo[] {
  const tagCounts: Record<string, number> = {}
  
  posts.forEach(news => {
    if (news.tags && Array.isArray(news.tags)) {
      news.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({
      name,
      slug: tagToSlug(name),
      count
    }))
    .sort((a, b) => b.count - a.count) // Sort by count descending
}

/**
 * 特定のタグを持つ記事を取得
 */
export function getNewsByTag(posts: NewsItem[], tag: string): NewsItem[] {
  return posts.filter(news => 
    news.tags && news.tags.includes(tag)
  )
}

/**
 * 人気タグ（使用頻度上位）を取得
 */
export function getPopularTags(posts: NewsItem[], limit: number = 10): TagInfo[] {
  return getAllTagsFromPosts(posts).slice(0, limit)
}

/**
 * タグが存在するか確認
 */
export function tagExists(posts: NewsItem[], tag: string): boolean {
  const allTags = getAllTagsFromPosts(posts)
  return allTags.some(tagInfo => tagInfo.name === tag)
}

/**
 * 関連タグを取得（同じカテゴリや一緒に使われることが多いタグ）
 */
export function getRelatedTags(posts: NewsItem[], currentTag: string, limit: number = 5): TagInfo[] {
  const coOccurringTags: Record<string, number> = {}
  
  // Find articles that have the current tag
  const articlesWithCurrentTag = posts.filter(news => 
    news.tags && news.tags.includes(currentTag)
  )
  
  // Count co-occurring tags
  articlesWithCurrentTag.forEach(news => {
    if (news.tags) {
      news.tags.forEach(tag => {
        if (tag !== currentTag) {
          coOccurringTags[tag] = (coOccurringTags[tag] || 0) + 1
        }
      })
    }
  })
  
  return Object.entries(coOccurringTags)
    .map(([name, count]) => ({
      name,
      slug: tagToSlug(name),
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}