import React, { useState, useEffect } from 'react'
import { MapPin, Filter, Navigation, Search, List, Map } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Spot {
  id: number
  name: string
  description: string
  image: string
  address: string
  category?: string
  features?: string[]
}

const SpotsPage = () => {
  const spots: Spot[] = [
    {
      id: 1,
      name: '戸塚区総合公園',
      description: '広大な敷地に野球場やテニスコート、子供の 遊び場などを備えた市民の憩いの場。四季折々の自然も楽しめます。',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区汲沢町434',
      category: '公園・自然',
      features: ['野球場', 'テニスコート', '子供の遊び場']
    },
    {
      id: 2,
      name: '柏尾川プロムナード',
      description: '戸塚区を流れる柏尾川沿いの遊歩道。桜の名所として知られ、春には多くの人が訪れます。',
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町',
      category: '公園・自然',
      features: ['桜', '遊歩道', '散策']
    },
    {
      id: 3,
      name: '東戸塚駅前商店街',
      description: '東戸塚駅周辺に広がる活気ある商店街。地元の人々の日常を支える様々な店舗が軒を連ねています。',
      image: 'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区川上町',
      category: '商店街',
      features: ['ショッピング', '飲食店', 'マルシェ']
    },
    {
      id: 4,
      name: '戸塚区民文化センターさくらプラザ',
      description: '音楽や演劇、展示会などが開催される文化施設。地域の文化活動の拠点となっています。',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区 戸塚区戸塚町16-17',
      category: '文化施設',
      features: ['ホール', 'ギャラリー', 'イベント']
    },
    {
      id: 5,
      name: '舞岡公園',
      description: '自然豊かな市民の森。四季折々の植物や生き物を観察できるハイキングコースがあります。',
      image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区舞岡町2832',
      category: '公園・自然',
      features: ['ハイキング', '自然観察', '森林']
    },
    {
      id: 6,
      name: '戸塚駅西口商店街',
      description: '戸塚駅西口に広がる商店街。古くからの店舗と新しい店舗が混在し、活気ある雰囲気が魅力です。',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町',
      category: '商店街',
      features: ['飲食店', '食料品店', '衣料品店']
    },
    {
      id: 7,
      name: '俣野別邸庭園',
      description: '大正時代の実業家の邸宅跡を整備した庭園。四季折々の花や木々が楽しめる静かな空間です。',
      image: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区東俣野町80-1',
      category: '歴史スポット',
      features: ['庭園', '歴史', '建築']
    },
    {
      id: 8,
      name: '戸塚スポーツセンター',
      description: '体育館やプール、トレーニング室などを備えた総合スポーツ施設。各種スポーツ教室も開催されています。',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区上倉田町477',
      category: 'スポーツ施設',
      features: ['体育館', 'プール', 'トレーニング']
    },
    {
      id: 9,
      name: '戸塚区役所',
      description: '区民サービスの拠点となる施設。区役所内には区民広間や展示スペースもあります。',
      image: 'https://images.unsplash.com/photo-1577129762510-8077880673f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      address: '横浜市戸塚区戸塚町16-17',
      category: '公共施設',
      features: ['行政サービス', '展示スペース', '情報提供']
    }
  ]

  const [filteredSpots, setFilteredSpots] = useState<Spot[]>(spots)
  const [filters, setFilters] = useState({
    category: 'すべてのカテゴリー',
    area: 'すべてのエリア',
    keyword: ''
  })
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Get unique categories from spots data
  const categories = ['すべてのカテゴリー', ...Array.from(new Set(spots.map(spot => spot.category || '未分類')))]
  
  // Get unique areas from spots data
  const areas = ['すべてのエリア', ...Array.from(new Set(spots.map(spot => {
    if (spot.address.includes('戸塚駅')) return '戸塚駅周辺'
    if (spot.address.includes('東戸塚')) return '東戸塚駅周辺'
    if (spot.address.includes('舞岡') || spot.address.includes('俣野')) return '舞岡・俣野エリア'
    if (spot.address.includes('上倉田')) return '上倉田エリア'
    return 'その他'
  })))]

  // Filter spots when filters change
  useEffect(() => {
    let result = [...spots]

    // Filter by category
    if (filters.category !== 'すべてのカテゴリー') {
      result = result.filter(spot => spot.category === filters.category)
    }

    // Filter by area
    if (filters.area !== 'すべてのエリア') {
      result = result.filter(spot => {
        const address = spot.address
        switch (filters.area) {
          case '戸塚駅周辺':
            return address.includes('戸塚駅') || address.includes('戸塚町')
          case '東戸塚駅周辺':
            return address.includes('東戸塚') || address.includes('川上町')
          case '舞岡・俣野エリア':
            return address.includes('舞岡') || address.includes('俣野')
          case '上倉田エリア':
            return address.includes('上倉田')
          default:
            return true
        }
      })
    }

    // Filter by keyword
    if (filters.keyword.trim() !== '') {
      const keyword = filters.keyword.toLowerCase()
      result = result.filter(spot => 
        spot.name.toLowerCase().includes(keyword) || 
        spot.description.toLowerCase().includes(keyword) ||
        spot.address.toLowerCase().includes(keyword) ||
        (spot.features && spot.features.some(feature => feature.toLowerCase().includes(keyword)))
      )
    }

    setFilteredSpots(result)
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
  const currentItems = filteredSpots.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredSpots.length / itemsPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">戸塚の名所</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            戸塚区内の魅力的なスポットをご紹介します。自然豊かな公園から歴史ある建物、活気ある商店街まで、戸塚区の様々な魅力をお楽しみください。
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold">スポットを絞り込む</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリー</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">キーワード</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="キーワードで検索" 
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

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <button 
              className={`py-2 px-4 text-sm font-medium rounded-l-md flex items-center ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 mr-1" />
              リスト表示
            </button>
            <button 
              className={`py-2 px-4 text-sm font-medium rounded-r-md flex items-center ${
                viewMode === 'map' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('map')}
            >
              <Map className="w-4 h-4 mr-1" />
              マップ表示
            </button>
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <>
            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map(spot => (
                  <Link to={`/spots/${spot.id}`} key={spot.id}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                      <img 
                        src={spot.image} 
                        alt={spot.name} 
                        className="w-full h-56 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{spot.name}</h3>
                          {spot.category && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {spot.category}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">{spot.description}</p>
                        <div className="flex items-center text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{spot.address}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">この条件に一致するスポットはありません。</p>
              </div>
            )}

            {/* Pagination - Only show if there are items */}
            {filteredSpots.length > 0 && (
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
          </>
        )}

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">マップで見る</h2>
              <p className="text-gray-600">戸塚区内の{filteredSpots.length}件のスポットを地図で表示しています</p>
            </div>
            
            {/* Map Container */}
            <div className="bg-gray-200 h-[600px] rounded-md relative">
              {/* This would be replaced with an actual map implementation */}
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <Navigation className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">地図は現在準備中です</p>
                <p className="text-gray-500 mt-2">実際の地図では、選択したスポットがピンで表示されます</p>
              </div>
              
              {/* Sample Map Pins - These would be positioned on the actual map */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-bold">3</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-bold">5</span>
                </div>
              </div>
              <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-bold">2</span>
                </div>
              </div>
            </div>
            
            {/* Spot List under Map */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">表示中のスポット ({filteredSpots.length}件)</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {filteredSpots.map(spot => (
                  <Link to={`/spots/${spot.id}`} key={spot.id} className="block">
                    <div className="flex items-start p-3 hover:bg-gray-50 rounded-md transition">
                      <img 
                        src={spot.image} 
                        alt={spot.name} 
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{spot.name}</h4>
                          {spot.category && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                              {spot.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{spot.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{spot.address}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SpotsPage