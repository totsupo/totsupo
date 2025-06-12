import Link from 'next/link'
import type { NewsItem } from '@/src/types/news'

interface ArticleEmbedProps {
  article: NewsItem
  className?: string
}

export default function ArticleEmbed({ article, className = '' }: ArticleEmbedProps) {
  return (
    <Link href={`/article/${article.slug}`} className={`block ${className}`}>
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
        <div className="flex min-h-[8rem]">
          {article.image && (
            <div className="flex-shrink-0 w-32 bg-gray-100">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 p-4">
            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
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