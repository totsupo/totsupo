import React, { useState, useEffect } from 'react'
import { Filter, Star, MapPin, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Restaurant {
  id: number
  name: string
  category: string
  description: string
  image: string
  address: string
  rating: number
  priceRange: string
  features?: string[]
}

const FoodPage = () => {
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'トツカ コーヒー',
      category: 'カフェ',
      description: '戸塚駅西口から徒歩3分の場所にある、地元食材を使用したカフェ。季節のフルーツを使ったスイーツが人気です。',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町16-5',
      rating: 4.5,
      priceRange: '¥¥',
      features: ['Wi-Fi完備', 'テイクアウト可', '禁煙']
    },
    {
      id: 2,
      name: '戸塚うどん',
      category: '和食',
      description: '創業50年の老舗うどん店。コシのある自家製麺と濃厚なだしが特徴です。季節限定メニューも楽しめます。',
      image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町18-1',
      rating: 4.7,
      priceRange: '¥¥',
      features: ['座敷あり', '個室あり', '禁煙']
    },
    {
      id: 3,
      name: 'ビストロ トツカ',
      category: 'フレンチ',
      description: '地元の食材を使った本格フレンチを気軽に楽しめるビストロ。ワインの種類も豊富で、ペアリングを楽しめます。',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区川上町88-1',
      rating: 4.3,
      priceRange: '¥¥¥',
      features: ['ワイン豊富', '個室あり', '予約推奨']
    },
    {
      id: 4,
      name: '戸塚ラーメン',
      category: 'ラーメン',
      description: '濃厚な豚骨スープが特徴の人気ラーメン店。深夜まで営業しているため、仕事帰りの利用も多いです。',
      image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町15-2',
      rating: 4.2,
      priceRange: '¥',
      features: ['深夜営業', 'テイクアウト可', '喫煙可']
    },
    {
      id: 5,
      name: '東戸塚イタリアン',
      category: 'イタリアン',
      description: '東戸塚駅近くの本格イタリアン。手打ちパスタと石窯ピザが人気です。ランチセットはコスパ抜群。',
      image: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区川上町91-1',
      rating: 4.4,
      priceRange: '¥¥',
      features: ['ランチセット', 'テラス席あり', '禁煙']
    },
    {
      id: 6,
      name: '戸塚焼肉',
      category: '焼肉',
      description: '厳選された国産牛を使用した焼肉店。プライベート感のある個室も完備しており、家族連れにも人気です。',
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町20-5',
      rating: 4.6,
      priceRange: '¥¥¥',
      features: ['個室あり', '食べ放題あり', '禁煙']
    },
    {
      id: 7,
      name: 'とつか寿司',
      category: '寿司',
      description: '地元で愛される寿司店。新鮮なネタを使ったリーズナブルな寿司が楽しめます。テイクアウトも人気です。',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区上倉田町489',
      rating: 4.5,
      priceRange: '¥¥',
      features: ['カウンター席', 'テイクアウト可', '禁煙']
    },
    {
      id: 8,
      name: '戸塚ベーカリー',
      category: 'ベーカリー',
      description: '早朝から営業している人気ベーカリー。ハード系のパンから菓子パンまで種類が豊富で、毎日通う常連も多いです。',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町17-3',
      rating: 4.8,
      priceRange: '¥',
      features: ['早朝営業', 'イートインあり', '禁煙']
    },
    {
      id: 9,
      name: '戸塚中華',
      category: '中華',
      description: '本格的な中華料理を提供する老舗店。ボリューム満点の定食メニューが人気で、ランチタイムは行列ができることも。',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区矢部町235',
      rating: 4.3,
      priceRange: '¥¥',
      features: ['ランチセット', '宴会可', '喫煙可']
    }
  ]

  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants)
  const [filters, setFilters] = useState({
    category: 'すべてのジャンル',
    area: 'すべてのエリア',
    budget: 'すべての予算',
    keyword: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Get unique categories from restaurants data
  const categories = ['すべてのジャンル', ...Array.from(new Set(restaurants.map(restaurant => restaurant.category)))]

  // Get unique areas from restaurants data
  const areas = ['すべてのエリア', ...Array.from(new Set(restaurants.map(restaurant => {
    if (restaurant.address.includes('戸塚駅') || restaurant.address.includes('戸塚町')) return '戸塚駅周辺'
    if (restaurant.address.includes('東戸塚') || restaurant.address.includes('川上町')) return '東戸塚駅周辺'
    if (restaurant.address.includes('舞岡')) return '舞岡エリア'
    if (restaurant.address.includes('上倉田')) return '上倉田エリア'
    return 'その他'
  })))]

  // Get unique price ranges
  const budgets = ['すべての予算', '〜¥1,000', '¥1,000〜¥3,000', '¥3,000〜¥5,000', '¥5,000〜']

  // Filter restaurants when filters change
  useEffect(() => {
    let result = [...restaurants]

    // Filter by category
    if (filters.category !== 'すべてのジャンル') {
      result = result.filter(restaurant => restaurant.category === filters.category)
    }

    // Filter by area
    if (filters.area !== 'すべてのエリア') {
      result = result.filter(restaurant => {
        const address = restaurant.address
        switch (filters.area) {
          case '戸塚駅周辺':
            return address.includes('戸塚駅') || address.includes('戸塚町')
          case '東戸塚駅周辺':
            return address.includes('東戸塚') || address.includes('川上町')
          case '舞岡エリア':
            return address.includes('舞岡')
          case '上倉田エリア':
            return address.includes('上倉田')
          default:
            return true
        }
      })
    }

    // Filter by budget
    if (filters.budget !== 'すべての予算') {
      result = result.filter(restaurant => {
        const priceRange = restaurant.priceRange
        switch (filters.budget) {
          case '〜¥1,000':
            return priceRange === '¥'
          case '¥1,000〜¥3,000':
            return priceRange === '¥¥'
          case '¥3,000〜¥5,000':
            return priceRange === '¥¥¥'
          case '¥5,000〜':
            return priceRange === '¥¥¥¥'
          default:
            return true
        }
      })
    }

    // Filter by keyword
    if (filters.keyword.trim() !== '') {
      const keyword = filters.keyword.toLowerCase()
      result = result.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.description.toLowerCase().includes(keyword) ||
        restaurant.address.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword) ||
        (restaurant.features && restaurant.features.some(feature => feature.toLowerCase().includes(keyword)))
      )
    }

    setFilteredRestaurants(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filters])

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  // Handle keyword search
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      keyword: e.target.value
    }))
  }

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />)
    }

    return <div className="flex">{stars}</div>
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">グルメ</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            戸塚区内のおすすめ飲食店をご紹介します。地元で愛される名店から新しくオープンしたお店まで、様々なジャンルのグルメ情報をお届けします。
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold">お店を絞り込む</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ジャンル</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">エリア</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
              >
                {areas.map((area, index) => (
                  <option key={index}>{area}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">予算</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.budget}
                onChange={(e) => handleFilterChange('budget', e.target.value)}
              >
                {budgets.map((budget, index) => (
                  <option key={index}>{budget}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">キーワード</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="店名、料理名など"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2"
                  value={filters.keyword}
                  onChange={handleKeywordChange}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map(restaurant => (
              <Link to={`/food/${restaurant.id}`} key={restaurant.id} className="block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {restaurant.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{restaurant.description}</p>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{restaurant.address}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {renderStars(restaurant.rating)}
                        <span className="ml-1 text-sm text-gray-600">{restaurant.rating}</span>
                      </div>
                      <span className="text-gray-600 text-sm">{restaurant.priceRange}</span>
                    </div>
                    {restaurant.features && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {restaurant.features.map((feature, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">この条件に一致するお店はありません。</p>
          </div>
        )}

        {/* Pagination - Only show if there are items */}
        {filteredRestaurants.length > 0 && (
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

export default FoodPage
