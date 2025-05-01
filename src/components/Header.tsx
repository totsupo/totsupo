import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Coffee } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu when location changes
  React.useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Coffee className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">戸塚つーしん</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">ホーム</Link>
            <Link to="/news" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">ニュース</Link>
            <Link to="/events" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">イベント</Link>
            <Link to="/spots" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">スポット</Link>
            <Link to="/food" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">グルメ</Link>
            <Link to="/contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">お問い合わせ</Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="メニューを開く"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">ホーム</Link>
            <Link to="/news" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">ニュース</Link>
            <Link to="/events" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">イベント</Link>
            <Link to="/spots" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">スポット</Link>
            <Link to="/food" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">グルメ</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">お問い合わせ</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header