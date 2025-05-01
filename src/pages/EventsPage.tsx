import { useState, useEffect } from 'react'
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import EventCard from '../components/EventCard'
import { eventsData, EventItem } from '../data/eventsData'
import { Link } from 'react-router-dom'

const EventsPage = () => {
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>(eventsData)
  const [filters, setFilters] = useState({
    date: 'すべての期間',
    category: 'すべてのカテゴリー',
    location: 'すべての場所'
  })
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Get unique categories, locations from events data
  const categories = ['すべてのカテゴリー', ...Array.from(new Set(eventsData.map(item => item.category || '未分類')))]
  const locations = ['すべての場所', ...Array.from(new Set(eventsData.map(item => {
    // Extract location area (e.g., "戸塚駅" from "戸塚駅前広場")
    const locationParts = item.location.split(/[\s,]/)
    return locationParts[0].includes('戸塚') ? locationParts[0] : item.location
  })))]

  // Filter events when filters change
  useEffect(() => {
    let result = [...eventsData]

    // Filter by category
    if (filters.category !== 'すべてのカテゴリー') {
      result = result.filter(event => event.category === filters.category)
    }

    // Filter by location
    if (filters.location !== 'すべての場所') {
      result = result.filter(event => event.location.includes(filters.location))
    }

    // Filter by date
    if (filters.date !== 'すべての期間') {
      const today = new Date()
      const endOfWeek = new Date(today)
      endOfWeek.setDate(today.getDate() + 7)
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0)

      result = result.filter(event => {
        // Extract year, month, day from event.date (format: "2025年5月15日")
        const dateParts = event.date.match(/(\d+)年(\d+)月(\d+)日/)
        if (!dateParts) return true

        const eventDate = new Date(
          parseInt(dateParts[1]),
          parseInt(dateParts[2]) - 1,
          parseInt(dateParts[3])
        )

        switch (filters.date) {
          case '今日':
            return eventDate.toDateString() === today.toDateString()
          case '今週':
            return eventDate >= today && eventDate <= endOfWeek
          case '今月':
            return eventDate >= today && eventDate <= endOfMonth
          case '来月':
            return eventDate > endOfMonth && eventDate <= endOfNextMonth
          default:
            return true
        }
      })
    }

    setFilteredEvents(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filters])

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  // Calendar view functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getMonthName = (month: number) => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    return months[month]
  }

  const prevMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() - 1)
      return newMonth
    })
  }

  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + 1)
      return newMonth
    })
  }

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth() + 1 // JavaScript months are 0-indexed

    return filteredEvents.filter(event => {
      const dateParts = event.date.match(/(\d+)年(\d+)月(\d+)日/)
      if (!dateParts) return false

      const eventYear = parseInt(dateParts[1])
      const eventMonth = parseInt(dateParts[2])
      const eventDay = parseInt(dateParts[3])

      return eventYear === year && eventMonth === month && eventDay === day
    })
  }

  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const eventsForDay = getEventsForDay(day)
      const hasEvents = eventsForDay.length > 0

      days.push(
        <div key={day} className="min-h-24 border border-gray-200 p-1 overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-medium ${hasEvents ? 'text-blue-600' : ''}`}>{day}</span>
            {hasEvents && (
              <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                {eventsForDay.length}
              </span>
            )}
          </div>
          <div className="space-y-1 overflow-y-auto max-h-20">
            {eventsForDay.map(event => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="block text-xs bg-blue-50 p-1 rounded truncate hover:bg-blue-100"
              >
                {event.title}
              </Link>
            ))}
          </div>
        </div>
      )
    }

    return days
  }

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">イベント情報</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            戸塚区内で開催される様々なイベント情報をご紹介します。地域のお祭りから文化イベント、ワークショップまで、戸塚区の活気あるコミュニティ活動をお楽しみください。
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold">イベントを絞り込む</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
              >
                <option>すべての期間</option>
                <option>今日</option>
                <option>今週</option>
                <option>今月</option>
                <option>来月</option>
              </select>
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                {locations.map((location, index) => (
                  <option key={index}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              className={`py-2 px-4 text-sm font-medium rounded-l-md ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('list')}
            >
              リスト表示
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium rounded-r-md ${
                viewMode === 'calendar' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setViewMode('calendar')}
            >
              カレンダー表示
            </button>
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <>
            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">この条件に一致するイベントはありません。</p>
              </div>
            )}

            {/* Pagination - Only show if there are items */}
            {filteredEvents.length > 0 && (
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

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold">
                {currentMonth.getFullYear()}年 {getMonthName(currentMonth.getMonth())}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                <div key={day} className="text-center font-medium py-2 bg-gray-100">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-3 h-3 bg-blue-100 rounded-full mr-2"></div>
                <span>イベントがある日付</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsPage
