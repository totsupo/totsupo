'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllNews } from '@/src/lib/useAllNews'
import type { NewsItem } from '@/src/types/news'

interface LinkCardProps {
  url: string
  className?: string
}

export default function LinkCard({ url, className = '' }: LinkCardProps) {
  const [article, setArticle] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // URLから記事のslugを抽出
    const match = url.match(/\/article\/([^\/]+)\/?$/)
    if (!match) {
      setLoading(false)
      return
    }

    const slug = match[1]
    const allNews = getAllNews()
    const foundArticle = allNews.find(news => news.slug === slug)
    
    setArticle(foundArticle || null)
    setLoading(false)
  }, [url])

  if (loading) {
    return (
      <div className={`border rounded-lg p-4 animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    )
  }

  if (!article) {
    // 外部リンクまたは見つからない場合は通常のリンクとして表示
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-blue-600 hover:text-blue-800 underline ${className}`}
      >
        {url}
      </a>
    )
  }

  return (
    <Link href={url} className={`block ${className}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
        <div className="flex gap-4">
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              className="w-24 h-24 object-cover rounded flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {article.category}
              </span>
              <span>{new Date(article.date).toLocaleDateString('ja-JP')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}