import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Footer', () => {
  it('renders logo and site name', () => {
    renderWithRouter(<Footer />)
    
    expect(screen.getByAltText('戸塚ぽーたる ロゴ')).toBeInTheDocument()
    expect(screen.getByText('戸塚ぽーたる')).toBeInTheDocument()
  })

  it('renders site description', () => {
    renderWithRouter(<Footer />)
    
    expect(screen.getByText(/横浜市戸塚区の魅力を発信するローカルメディア/)).toBeInTheDocument()
    expect(screen.getByText(/地域の最新記事など、戸塚区の魅力を余すことなくお伝えします/)).toBeInTheDocument()
  })

  it('renders social media links', () => {
    renderWithRouter(<Footer />)
    
    const xLink = screen.getByRole('link', { name: '' }).closest('a[href="https://x.com/totsuka_portal"]')
    expect(xLink).toBeInTheDocument()
    expect(xLink).toHaveAttribute('href', 'https://x.com/totsuka_portal')
  })

  it('renders sitemap with correct links', () => {
    renderWithRouter(<Footer />)
    
    expect(screen.getByText('サイトマップ')).toBeInTheDocument()
    
    const homeLink = screen.getByRole('link', { name: 'ホーム' })
    const newsLink = screen.getByRole('link', { name: '記事' })
    const contactLink = screen.getByRole('link', { name: 'お問い合わせ' })
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(newsLink).toHaveAttribute('href', '/article')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('renders contact information', () => {
    renderWithRouter(<Footer />)
    
    // Use more specific query since there are multiple "お問い合わせ" texts
    expect(screen.getByRole('heading', { name: 'お問い合わせ' })).toBeInTheDocument()
    expect(screen.getByText('totsuka.portal@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('24時間受付')).toBeInTheDocument()
  })

  it('renders copyright with current year', () => {
    renderWithRouter(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} 戸塚ぽーたる All Rights Reserved.`)).toBeInTheDocument()
  })
})