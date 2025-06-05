import { useEffect } from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  author?: string
}

const SEOHead = ({
  title = '戸塚ぽーたる - 横浜市戸塚区の魅力を発信するローカルメディア',
  description = '戸塚ぽーたるは横浜市戸塚区の最新記事、イベント情報、おすすめスポットなどを発信するローカルメディアです。',
  image = 'https://totsupo.pages.dev/favicon.png',
  url = 'https://totsupo.pages.dev/',
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  tags,
  author
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title
    
    // Update meta tags
    const updateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const updateNameMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    // Basic meta tags
    updateNameMeta('description', description)
    
    // Open Graph tags
    updateMeta('og:title', title)
    updateMeta('og:description', description)
    updateMeta('og:image', image)
    updateMeta('og:url', url)
    updateMeta('og:type', type)
    updateMeta('og:site_name', '戸塚ぽーたる')
    updateMeta('og:locale', 'ja_JP')
    
    // Twitter/X tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', title)
    updateMeta('twitter:description', description)
    updateMeta('twitter:image', image)
    updateMeta('twitter:url', url)
    updateMeta('twitter:site', '@totsuka_portal')
    
    // Article-specific tags
    if (type === 'article') {
      if (publishedTime) updateMeta('article:published_time', publishedTime)
      if (modifiedTime) updateMeta('article:modified_time', modifiedTime)
      if (section) updateMeta('article:section', section)
      if (author) updateMeta('article:author', author)
      if (tags) {
        // Remove existing tag metas
        const existingTags = document.querySelectorAll('meta[property="article:tag"]')
        existingTags.forEach(tag => tag.remove())
        
        // Add new tag metas
        tags.forEach(tag => {
          const meta = document.createElement('meta')
          meta.setAttribute('property', 'article:tag')
          meta.content = tag
          document.head.appendChild(meta)
        })
      }
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
    
  }, [title, description, image, url, type, publishedTime, modifiedTime, section, tags, author])

  return null
}

export default SEOHead