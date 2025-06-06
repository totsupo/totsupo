import { getAllNews } from "@/src/lib/useAllNews"
import { getAllTags } from "@/src/lib/tagUtils"
import { Suspense } from "react"
import ArticleList from './ArticleList'

export const metadata = {
  title: '記事一覧 | 戸塚ぽーたる',
  description: '戸塚区の最新記事一覧。地域の出来事、イベント情報、生活に役立つ情報など、戸塚区の「今」を知ることができます。',
  openGraph: {
    title: '記事一覧 | 戸塚ぽーたる',
    description: '戸塚区の最新記事一覧。地域の出来事、イベント情報、生活に役立つ情報など、戸塚区の「今」を知ることができます。',
    url: 'https://totsupo.pages.dev/article',
  },
}

export default function ArticlePage() {
  const allPosts = getAllNews()
  const allTags = getAllTags()
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleList allPosts={allPosts} allTags={allTags} />
    </Suspense>
  )
}