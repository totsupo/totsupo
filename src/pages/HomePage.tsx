import { Mail, Newspaper } from "lucide-react"
import { Link } from "react-router-dom"
import NewsCard from "../components/NewsCard"
import SEOHead from "../components/SEOHead"
import { useAllNews } from "../lib/useAllNews"
import { useMemo } from "react"
import portalImg from "../assets/totsuka-portal.jpg"

const HomePage = () => {
  const allNews = useAllNews()
  const news = useMemo(() => allNews.slice(0, 4), [allNews])
  return (
    <>
      <SEOHead />
      <div>
      {/* Hero Section */}
      <div className="relative">
        <div
          className="w-full h-[60vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${portalImg})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">戸塚ぽーたる</h1>
              <p className="text-xl md:text-2xl">横浜市戸塚区の魅力を発信するローカルメディア</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Newspaper className="w-6 h-6 mr-2 text-blue-600" />
          <h2 className="text-3xl font-bold">最新記事</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <NewsCard key={item.slug} news={item} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/article">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              記事一覧を見る
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">戸塚ぽーたるについて</h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            「戸塚ぽーたる」は、横浜市戸塚区の魅力を発信するローカルメディアです。
            <br />
            地域の最新記事など、戸塚区の魅力を余すことなくお伝えします。
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-2 text-blue-600" />
              <span>totsuka.portal@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

export default HomePage
