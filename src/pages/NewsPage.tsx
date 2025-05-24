import {useState, useEffect, useMemo} from 'react'
import NewsCard from '../components/NewsCard'
import { useAllNews } from '../lib/useAllNews'
import type { NewsItem } from '../types/news'

const NewsPage = () => {
  const allPosts = useMemo(useAllNews, [])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(allPosts)
  const [activeCategory, setActiveCategory] = useState<string>('すべて')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Get unique categories from news data
  const categories = useMemo(
    () => ['すべて', ...Array.from(new Set(allPosts.map((p) => p.category)))],
    [allPosts],
  )

  // Filter news when category changes
  useEffect(() => {
    setFilteredNews(
      activeCategory === 'すべて'
        ? allPosts
        : allPosts.filter((p) => p.category === activeCategory),
    )
    setCurrentPage(1)
  }, [activeCategory, allPosts])

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ニュース</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            戸塚区の最新ニュースをお届けします。地域の出来事、イベント情報、生活に役立つ情報など、戸塚区の「今」を知ることができます。
          </p>
        </div>

        {/* News Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map(item => (
              <NewsCard key={item.slug} news={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">この条件に一致するニュースはありません。</p>
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
                  currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                } rounded-l-md`}
              >
                前へ
              </button>

              {Array.from({ length: Math.min(totalPages, 3) }).map((_, index) => {
                // Show current page and adjacent pages
                let pageNumber
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
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
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
                  currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
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

export default NewsPage
