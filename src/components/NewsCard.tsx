import React from "react"
import { Calendar, User } from "lucide-react"
import Link from "next/link"
import type { NewsItem } from "../types/news"

type NewsCardProps = { news: NewsItem }

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const fallback = "/images/default-thumbnail.png"
  return (
    <Link href={`/article/${news.slug}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <div className="relative">
          <img src={news.image ?? fallback} alt={news.title} className="w-full h-48 object-cover" />
          <span className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-medium px-3 py-1">
            {news.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{news.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{news.excerpt}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>
              {new Date(news.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </span>

            {news.author && (
              <div className="flex items-center text-gray-500 text-sm ml-4">
                <User className="w-4 h-4 mr-1" />
                <span>{news.author}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NewsCard
