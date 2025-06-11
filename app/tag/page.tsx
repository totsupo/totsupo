import { Metadata } from "next"
import Link from "next/link"
import { Tag } from "lucide-react"
import { getAllTags } from "@/src/lib/tagUtils"

export const metadata: Metadata = {
  title: 'タグ一覧 | 戸塚ぽーたる',
  description: '戸塚区に関する記事のタグ一覧。興味のあるタグから記事を探すことができます。',
  openGraph: {
    title: 'タグ一覧 | 戸塚ぽーたる',
    description: '戸塚区に関する記事のタグ一覧。興味のあるタグから記事を探すことができます。',
    url: 'https://totsupo.pages.dev/tag',
  },
}

export default function TagIndexPage() {
  const allTags = getAllTags()
  
  // Group tags by their first character for better organization
  const tagGroups = allTags.reduce((groups, tag) => {
    const firstChar = tag.name.charAt(0)
    if (!groups[firstChar]) {
      groups[firstChar] = []
    }
    groups[firstChar].push(tag)
    return groups
  }, {} as Record<string, typeof allTags>)
  
  const groupKeys = Object.keys(tagGroups).sort()
  
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
            <span className="text-gray-900">タグ</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Tag className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">タグ一覧</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            戸塚区に関する記事を{allTags.length}個のタグで分類しています。興味のあるタグをクリックして関連記事を見つけてください。
          </p>
        </div>

        {/* Tag Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{allTags.length}</div>
            <div className="text-gray-600">総タグ数</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {allTags.reduce((sum, tag) => sum + tag.count, 0)}
            </div>
            <div className="text-gray-600">タグ付き記事数</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {allTags[0]?.name || '-'}
            </div>
            <div className="text-gray-600">最多使用タグ</div>
          </div>
        </div>

        {/* Popular Tags Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">人気のタグ</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-3">
              {allTags.slice(0, 20).map((tag, index) => {
                // Size based on popularity
                const sizeClass = index < 3 ? 'text-lg' : index < 8 ? 'text-base' : 'text-sm'
                const colorClass = index < 3 ? 'bg-blue-100 text-blue-800' : 
                                  index < 8 ? 'bg-green-100 text-green-800' : 
                                  'bg-gray-100 text-gray-800'
                
                return (
                  <Link
                    key={tag.name}
                    href={`/tag/${tag.slug}`}
                    className={`${colorClass} hover:scale-105 px-4 py-2 rounded-full font-medium transition-all duration-200 ${sizeClass}`}
                  >
                    {tag.name}
                    <span className="ml-2 opacity-75 text-xs">({tag.count})</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* All Tags Grouped */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">すべてのタグ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupKeys.map(firstChar => (
              <div key={firstChar} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {firstChar}
                </h3>
                <div className="space-y-2">
                  {tagGroups[firstChar]
                    .sort((a, b) => b.count - a.count) // Sort by count within group
                    .map(tag => (
                      <Link
                        key={tag.name}
                        href={`/tag/${tag.slug}`}
                        className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                          {tag.name}
                        </span>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700">
                          {tag.count}
                        </span>
                      </Link>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Articles */}
        <div className="mt-12 text-center">
          <Link href="/article" className="inline-flex items-center text-blue-600 hover:underline">
            記事一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}