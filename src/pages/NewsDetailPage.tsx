import { ArrowLeft, Calendar, Share2, Tag, User } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Link, useParams } from "react-router-dom"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import NewsCard from "../components/NewsCard"
import { useAllNews } from "../lib/useAllNews.ts"
import type { NewsItem } from "../types/news"

const NewsDetailPage = () => {
  const { slug = "" } = useParams<{ slug: string }>()
  const [copied, setCopied] = useState(false)
  const posts = useMemo(useAllNews, [])
  const news = posts.find((p) => p.slug === slug)
  const fallback = "/images/default-thumbnail.png"

  if (!news) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">記事が見つかりませんでした</h1>
          <Link
            to="/article"
            className="text-blue-600 hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            記事一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  const relatedArticles: NewsItem[] = news.related?.length
    ? posts.filter((p) => news.related!.includes(p.slug))
    : posts.filter((p) => p.category === news.category && p.slug !== news.slug).slice(0, 3)

  const handleCopyUrl = useCallback(async () => {
    const url = window.location.href

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert(`コピーできませんでした…\n${url}`)
    }
  }, [])

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link to="/article" className="hover:text-blue-600">
              記事
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{news.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-100">
            <img 
              src={news.image ?? fallback} 
              alt={news.title} 
              className="w-full h-full object-cover object-center transition-opacity duration-300"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                {news.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm ml-4">
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
                <div className="flex items-center text-gray-500 text-sm ml-4">
                  <User className="w-4 h-4 mr-1" />
                  <span>{news.author}</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{news.excerpt}</p>

            {/* Social Share */}
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={handleCopyUrl}
                className="flex items-center text-gray-500 hover:text-blue-600"
              >
                <Share2 className="w-5 h-5 mr-1" />
                <span className="text-sm">URL をコピー</span>
              </button>

              {copied && (
                <span className="text-xs text-green-600 transition-opacity duration-300">
                  コピーしました！
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <article className="prose lg:prose-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
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
          <Link to="/article" className="inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            記事一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsDetailPage
