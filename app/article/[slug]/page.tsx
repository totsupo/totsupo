import { ArrowLeft, Calendar, Share2, Tag, User } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import NewsCard from "@/src/components/NewsCard"
import ArticleEmbed from "@/src/components/ArticleEmbed"
import { getAllNews, getNewsBySlug } from "@/src/lib/useAllNews"
import type { NewsItem } from "@/src/types/news"
import { notFound } from "next/navigation"
import ShareButton from "./ShareButton"

interface Props {
  params: { slug: string }
}

// Generate static params for all news articles
export async function generateStaticParams() {
  const allNews = getAllNews()
  
  return allNews.map((news) => ({
    slug: news.slug,
  }))
}

// Generate metadata for each article (for OGP)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = getNewsBySlug(params.slug)
  
  if (!news) {
    return {
      title: '記事が見つかりません | 戸塚ぽーたる'
    }
  }

  return {
    title: `${news.title} | 戸塚ぽーたる`,
    description: news.excerpt,
    openGraph: {
      title: `${news.title} | 戸塚ぽーたる`,
      description: news.excerpt,
      url: `https://totsupo.pages.dev/article/${news.slug}`,
      type: 'article',
      publishedTime: new Date(news.date).toISOString(),
      modifiedTime: new Date(news.date).toISOString(),
      section: news.category,
      authors: [news.author || '戸塚ぽーたる編集部'],
      tags: news.tags,
      images: [
        {
          url: news.image ? `https://totsupo.pages.dev${news.image}` : 'https://totsupo.pages.dev/favicon.png',
          width: 1200,
          height: 630,
          alt: news.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${news.title} | 戸塚ぽーたる`,
      description: news.excerpt,
      images: [news.image ? `https://totsupo.pages.dev${news.image}` : 'https://totsupo.pages.dev/favicon.png'],
    },
  }
}

export default function ArticleDetailPage({ params }: Props) {
  const news = getNewsBySlug(params.slug)
  
  if (!news) {
    notFound()
  }

  const allNews = getAllNews()
  const relatedArticles: NewsItem[] = news.related?.length
    ? allNews.filter((p) => news.related!.includes(p.slug))
    : allNews.filter((p) => p.category === news.category && p.slug !== news.slug).slice(0, 3)

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link href="/article" className="hover:text-blue-600">
              記事
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{news.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>
          <p className="text-lg text-gray-700 mb-6">{news.excerpt}</p>
          
          {/* Category, Date, Author and Share Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Category, Date, Author */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                {news.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>
                  {new Date(news.date).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </span>
              </div>
              {news.author && (
                <div className="flex items-center text-gray-500 text-sm">
                  <User className="w-4 h-4 mr-1" />
                  <span>{news.author}</span>
                </div>
              )}
            </div>

            {/* Social Share */}
            <ShareButton />
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <article className="prose lg:prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]}
              components={{
                p: ({ children, ...props }) => {
                  // 段落内のテキストをチェック
                  if (children && typeof children === 'object' && 'props' in children) {
                    const href = children.props?.href
                    
                    // 内部記事リンクのパターンをチェック
                    if (href && (href.includes('totsupo.com/article/') || href.includes('totsupo.pages.dev/article/'))) {
                      const slugMatch = href.match(/\/article\/([^\/\?#]+)/)
                      if (slugMatch) {
                        const linkedArticle = allNews.find(a => a.slug === slugMatch[1])
                        if (linkedArticle) {
                          return (
                            <div className="my-6 not-prose">
                              <ArticleEmbed article={linkedArticle} />
                            </div>
                          )
                        }
                      }
                    }
                  }
                  return <p {...props}>{children}</p>
                },
                a: ({ href, children, ...props }) => {
                  if (!href) return null
                  
                  // 独立した行の記事リンクをチェック
                  if (href.includes('totsupo.com/article/') || href.includes('totsupo.pages.dev/article/')) {
                    const slugMatch = href.match(/\/article\/([^\/\?#]+)/)
                    if (slugMatch && children === href) {
                      const linkedArticle = allNews.find(a => a.slug === slugMatch[1])
                      if (linkedArticle) {
                        return (
                          <div className="my-6 not-prose">
                            <ArticleEmbed article={linkedArticle} />
                          </div>
                        )
                      }
                    }
                  }
                  
                  // 通常のリンク
                  return (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                      {...props}
                    >
                      {children}
                    </a>
                  )
                }
              }}
            >
              {news.content}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4 text-gray-500" />
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((article) => (
                <NewsCard key={article.slug} news={article} />
              ))}
            </div>
          </div>
        )}

        {/* Back to News */}
        <div className="mt-8 text-center">
          <Link href="/article" className="inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            記事一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}