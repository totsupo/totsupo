'use client'

import { Menu, X } from "lucide-react"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import logoUrl from "../assets/totsuka-portal-logo.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when location changes
  React.useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src={logoUrl.src} alt="戸塚ぽーたる ロゴ" className="h-12 w-12" />
              <span className="ml-2 text-xl font-bold text-gray-900">戸塚ぽーたる</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">
              ホーム
            </Link>
            <Link href="/article" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">
              記事
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium">
              お問い合わせ
            </Link>
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
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              ホーム
            </Link>
            <Link
              href="/article"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              記事
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
