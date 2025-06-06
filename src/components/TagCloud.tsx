'use client'

import Link from 'next/link'
import { Tag } from 'lucide-react'
import { type TagInfo } from '@/src/lib/tagUtils.client'

interface TagCloudProps {
  tags: TagInfo[]
  limit?: number
  showCount?: boolean
  className?: string
  variant?: 'default' | 'minimal' | 'colorful'
}

export default function TagCloud({ 
  tags,
  limit = 20, 
  showCount = true, 
  className = '',
  variant = 'default'
}: TagCloudProps) {
  const popularTags = tags.slice(0, limit)
  
  if (popularTags.length === 0) {
    return null
  }
  
  // Calculate font sizes based on tag frequency
  const maxCount = Math.max(...popularTags.map(tag => tag.count))
  const minCount = Math.min(...popularTags.map(tag => tag.count))
  
  const getFontSizeClass = (count: number) => {
    const ratio = maxCount > minCount ? (count - minCount) / (maxCount - minCount) : 0.5
    
    if (ratio >= 0.8) return 'text-xl font-bold'
    if (ratio >= 0.6) return 'text-lg font-semibold'
    if (ratio >= 0.4) return 'text-base font-medium'
    return 'text-sm font-normal'
  }
  
  const getTagStyle = (tag: TagInfo, index: number) => {
    const baseStyle = "inline-block transition-all duration-200 hover:scale-105"
    
    switch (variant) {
      case 'minimal':
        return `${baseStyle} text-gray-600 hover:text-blue-600 underline-offset-4 hover:underline`
      
      case 'colorful':
        const colors = [
          'bg-red-100 text-red-800 hover:bg-red-200',
          'bg-blue-100 text-blue-800 hover:bg-blue-200',
          'bg-green-100 text-green-800 hover:bg-green-200',
          'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
          'bg-purple-100 text-purple-800 hover:bg-purple-200',
          'bg-pink-100 text-pink-800 hover:bg-pink-200',
          'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
        ]
        const colorClass = colors[index % colors.length]
        return `${baseStyle} ${colorClass} px-3 py-1 rounded-full text-xs font-medium`
      
      default:
        return `${baseStyle} bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium`
    }
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">人気のタグ</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag, index) => (
          <Link
            key={tag.name}
            href={`/tag/${tag.slug}`}
            className={`${getTagStyle(tag, index)} ${getFontSizeClass(tag.count)}`}
            title={`${tag.name} (${tag.count}件の記事)`}
          >
            {tag.name}
            {showCount && variant !== 'minimal' && (
              <span className="ml-1 opacity-75">({tag.count})</span>
            )}
          </Link>
        ))}
      </div>
      
      <div className="text-center">
        <Link 
          href="/tag"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
        >
          すべてのタグを見る →
        </Link>
      </div>
    </div>
  )
}