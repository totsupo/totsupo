import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">記事が見つかりませんでした</h1>
        <Link
          href="/article"
          className="text-blue-600 hover:underline flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          記事一覧に戻る
        </Link>
      </div>
    </div>
  )
}