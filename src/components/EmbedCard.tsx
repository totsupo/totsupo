'use client'

import { useEffect, useRef } from 'react'

interface EmbedCardProps {
  url: string
  className?: string
}

export default function EmbedCard({ url, className = '' }: EmbedCardProps) {
  const embedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Instagram埋め込みスクリプトの再実行
    if (url.includes('instagram.com') && window.instgrm) {
      window.instgrm.Embeds.process()
    }
    
    // Twitter埋め込みスクリプトの再実行
    if (url.includes('twitter.com') || url.includes('x.com')) {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load()
      }
    }
  }, [url])

  // Instagram
  if (url.includes('instagram.com/p/') || url.includes('instagram.com/reel/')) {
    const embedUrl = url.replace(/\/$/, '') + '/embed/'
    return (
      <div className={`my-6 ${className}`}>
        <iframe
          src={embedUrl}
          className="w-full max-w-lg mx-auto border-0"
          style={{ minHeight: '600px' }}
          scrolling="no"
          allowTransparency={true}
          frameBorder="0"
        />
      </div>
    )
  }

  // Twitter/X
  if (url.includes('twitter.com/') || url.includes('x.com/')) {
    // URLをx.comに統一
    const tweetUrl = url.replace('twitter.com', 'x.com')
    const match = tweetUrl.match(/x\.com\/\w+\/status\/(\d+)/)
    if (match) {
      return (
        <div className={`my-6 ${className}`} ref={embedRef}>
          <blockquote className="twitter-tweet" data-lang="ja">
            <a href={tweetUrl}></a>
          </blockquote>
        </div>
      )
    }
  }

  // YouTube
  if (url.includes('youtube.com/watch?v=') || url.includes('youtu.be/')) {
    let videoId = ''
    if (url.includes('youtube.com/watch?v=')) {
      const urlParams = new URLSearchParams(url.split('?')[1])
      videoId = urlParams.get('v') || ''
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0]
    }
    
    if (videoId) {
      return (
        <div className={`my-6 ${className}`}>
          <div className="relative w-full max-w-2xl mx-auto" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )
    }
  }

  // Google Maps
  if (url.includes('google.com/maps') || url.includes('maps.app.goo.gl')) {
    // 埋め込み用URLに変換
    let embedUrl = url
    if (url.includes('/place/')) {
      // プレイスURLの場合
      embedUrl = url.replace('/maps/place/', '/maps/embed/v1/place?key=&q=')
    }
    
    return (
      <div className={`my-6 ${className}`}>
        <iframe
          src={embedUrl}
          className="w-full h-96 max-w-2xl mx-auto"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    )
  }

  // デフォルト（通常のリンク）
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

// TypeScript用のwindow拡張
declare global {
  interface Window {
    instgrm?: any
    twttr?: any
  }
}