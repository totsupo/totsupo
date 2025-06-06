'use client'

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Tag, X } from "lucide-react"
import NewsCard from "@/src/components/NewsCard"
import TagCloud from "@/src/components/TagCloud"
import { slugToTag, tagToSlug, type TagInfo } from "@/src/lib/tagUtils.client"
import type { NewsItem } from "@/src/types/news"

interface Props {
  allPosts: NewsItem[]
  allTags: TagInfo[]
}

export default function ArticleList({ allPosts, allTags }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(allPosts)

  // URLパラメータから初期値を取得
  const [activeCategory, setActiveCategory] = useState<string>(
    searchParams.get("category") || "すべて",
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  )
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)
  const itemsPerPage = 6

  // Get unique categories from news data
  const categories = useMemo(
    () => ["すべて", ...Array.from(new Set(allPosts.map((p) => p.category)))],
    [allPosts],
  )

  // Get all available tags (passed as props)

  // URLパラメータが変更された時の処理
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "すべて"
    const tagsFromUrl = searchParams.get("tags")?.split(",").filter(Boolean) || []
    const pageFromUrl = Number(searchParams.get("page")) || 1

    if (categoryFromUrl !== activeCategory) {
      setActiveCategory(categoryFromUrl)
    }
    
    // Decode tags from URL
    const decodedTags = tagsFromUrl.map(slugToTag)
    if (JSON.stringify(decodedTags) !== JSON.stringify(selectedTags)) {
      setSelectedTags(decodedTags)
    }
    
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl)
    }
  }, [searchParams, activeCategory, selectedTags, currentPage])

  // Filter news when category or tags change
  useEffect(() => {
    let filtered = allPosts

    // Filter by category
    if (activeCategory !== "すべて") {
      filtered = filtered.filter((p) => p.category === activeCategory)
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) => 
        selectedTags.every(tag => p.tags && p.tags.includes(tag))
      )
    }

    setFilteredNews(filtered)
  }, [activeCategory, selectedTags, allPosts])

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)

  // URLパラメータを更新する関数
  const updateUrlParams = (category: string, tags: string[], page: number) => {
    const params = new URLSearchParams()
    if (category !== "すべて") {
      params.set("category", category)
    }
    if (tags.length > 0) {
      // Encode tags for URL
      const encodedTags = tags.map(tagToSlug)
      params.set("tags", encodedTags.join(","))
    }
    if (page > 1) {
      params.set("page", page.toString())
    }
    router.push(`/article?${params.toString()}`)
  }

  // Add tag to filter
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag]
      setSelectedTags(newTags)
      setCurrentPage(1)
      updateUrlParams(activeCategory, newTags, 1)
    }
  }

  // Remove tag from filter
  const removeTag = (tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag)
    setSelectedTags(newTags)
    setCurrentPage(1)
    updateUrlParams(activeCategory, newTags, 1)
  }

  // Clear all tags
  const clearAllTags = () => {
    setSelectedTags([])
    setCurrentPage(1)
    updateUrlParams(activeCategory, [], 1)
  }

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    updateUrlParams(activeCategory, selectedTags, pageNumber)
    window.scrollTo(0, 0)
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">記事</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            戸塚区の最新記事をお届けします。地域の出来事、イベント情報、生活に役立つ情報など、戸塚区の「今」を知ることができます。
          </p>
        </div>

        {/* News Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveCategory(category)
                setCurrentPage(1)
                updateUrlParams(category, selectedTags, 1)
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tag Filtering */}
        <div className="mb-8">
          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">選択中のタグ:</span>
                <button
                  onClick={clearAllTags}
                  className="text-xs text-red-600 hover:text-red-800 underline"
                >
                  すべて解除
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                      title={`「${tag}」を削除`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Popular Tags for Quick Selection */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">人気のタグで絞り込み:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 15).map((tagInfo) => (
                <button
                  key={tagInfo.name}
                  onClick={() => addTag(tagInfo.name)}
                  disabled={selectedTags.includes(tagInfo.name)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTags.includes(tagInfo.name)
                      ? "bg-blue-100 text-blue-800 cursor-not-allowed opacity-50"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title={`「${tagInfo.name}」で絞り込み (${tagInfo.count}件)`}
                >
                  {tagInfo.name} ({tagInfo.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((item) => (
              <NewsCard key={item.slug} news={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">この条件に一致する記事はありません。</p>
            {(selectedTags.length > 0 || activeCategory !== "すべて") && (
              <div className="text-sm text-gray-500">
                <p>検索条件:</p>
                {activeCategory !== "すべて" && (
                  <p>カテゴリ: {activeCategory}</p>
                )}
                {selectedTags.length > 0 && (
                  <p>タグ: {selectedTags.join(", ")}</p>
                )}
                <button
                  onClick={() => {
                    setActiveCategory("すべて")
                    clearAllTags()
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-800 underline"
                >
                  すべての条件をリセット
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pagination - Only show if there are items */}
        {filteredNews.length > 0 && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`py-2 px-4 bg-white border border-gray-300 text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                } rounded-l-md`}
              >
                前へ
              </button>

              {Array.from({ length: Math.min(totalPages, 3) }).map((_, index) => {
                // Show current page and adjacent pages
                let pageNumber: number
                if (totalPages <= 3) {
                  pageNumber = index + 1
                } else if (currentPage === 1) {
                  pageNumber = index + 1
                } else if (currentPage === totalPages) {
                  pageNumber = totalPages - 2 + index
                } else {
                  pageNumber = currentPage - 1 + index
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`py-2 px-4 border text-sm font-medium ${
                      currentPage === pageNumber
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              })}

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`py-2 px-4 bg-white border border-gray-300 text-sm font-medium ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                } rounded-r-md`}
              >
                次へ
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}