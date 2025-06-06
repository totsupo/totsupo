import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Tag } from "lucide-react"
import NewsCard from "@/src/components/NewsCard"
import TagCloud from "@/src/components/TagCloud"
import { 
  getAllTags, 
  getNewsByTag, 
  slugToTag, 
  tagExists,
  getRelatedTags
} from "@/src/lib/tagUtils"

interface Props {
  params: { slug: string }
}

// Generate static params for all tags
export async function generateStaticParams() {
  const allTags = getAllTags()
  
  return allTags.map((tag) => ({
    slug: tag.slug,
  }))
}

// Generate metadata for each tag page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagName = slugToTag(params.slug)
  
  if (!tagExists(tagName)) {
    return {
      title: 'タグが見つかりません | 戸塚ぽーたる'
    }
  }
  
  const articles = getNewsByTag(tagName)
  
  return {
    title: `「${tagName}」の記事一覧 | 戸塚ぽーたる`,
    description: `戸塚区の「${tagName}」に関する記事一覧（${articles.length}件）。地域の出来事、イベント情報、生活に役立つ情報など、戸塚区の「今」を知ることができます。`,
    openGraph: {
      title: `「${tagName}」の記事一覧 | 戸塚ぽーたる`,
      description: `戸塚区の「${tagName}」に関する記事一覧（${articles.length}件）。`,
      url: `https://totsupo.pages.dev/tag/${params.slug}`,
    },
  }
}

export default function TagPage({ params }: Props) {
  const tagName = slugToTag(params.slug)
  
  if (!tagExists(tagName)) {
    notFound()
  }
  
  const articles = getNewsByTag(tagName)
  const relatedTags = getRelatedTags(tagName, 8)
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
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
            <Link href="/tag" className="hover:text-blue-600">
              タグ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{tagName}</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Tag className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              「{tagName}」の記事
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {articles.length}件の記事が見つかりました
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Articles Grid */}
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article) => (
                  <NewsCard key={article.slug} news={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  「{tagName}」の記事はまだありません
                </p>
                <p className="text-gray-500 text-sm">
                  他のタグから記事を探してみてください
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Related Tags */}
            {relatedTags.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  関連タグ
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedTags.map((tag) => (
                    <Link
                      key={tag.name}
                      href={`/tag/${tag.slug}`}
                      className="bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-800 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      {tag.name}
                      <span className="ml-1 opacity-75">({tag.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Tags */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TagCloud tags={getAllTags()} limit={15} variant="default" className="space-y-2" />
            </div>
          </div>
        </div>

        {/* Back to Articles */}
        <div className="mt-12 text-center">
          <Link href="/article" className="inline-flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            記事一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}