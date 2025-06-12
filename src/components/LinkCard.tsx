'use client'

interface LinkCardProps {
  url: string
  className?: string
}

export default function LinkCard({ url, className = '' }: LinkCardProps) {
  // シンプルなリンクカードとして実装
  // 記事データの取得はサーバーサイドで行う必要があるため、
  // クライアントサイドではシンプルなカード表示のみ
  
  // URLから相対パスを抽出
  const relativePath = url.replace(/^https?:\/\/[^\/]+/, '')
  const title = decodeURIComponent(url.split('/').pop() || url)
  
  return (
    <a href={relativePath} className={`block ${className}`}>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="text-blue-600 hover:text-blue-800 text-sm">
            {title}
          </span>
        </div>
      </div>
    </a>
  )
}