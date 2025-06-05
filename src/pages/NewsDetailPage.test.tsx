import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, afterEach } from 'vitest'
import NewsDetailPage from './NewsDetailPage'
import { mockNewsItems } from '../test/mocks'

// Mock the useAllNews hook
vi.mock('../lib/useAllNews', () => ({
  useAllNews: () => mockNewsItems
}))

// Mock clipboard API
const mockWriteText = vi.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

const renderWithRouter = (slug: string) => {
  return render(
    <MemoryRouter initialEntries={[`/article/${slug}`]}>
      <Routes>
        <Route path="/article/:slug" element={<NewsDetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('NewsDetailPage', () => {
  afterEach(() => {
    mockWriteText.mockClear()
  })

  it('renders article details correctly', () => {
    renderWithRouter('article-1')
    
    expect(screen.getAllByText('記事1のタイトル')).toHaveLength(2) // Title and breadcrumb
    expect(screen.getByText('記事1の概要です')).toBeInTheDocument()
    expect(screen.getAllByText('イベント')).toHaveLength(3) // Category badge, tag, and related articles
    expect(screen.getByText('2025/1/6')).toBeInTheDocument()
    expect(screen.getAllByText('編集部')).toHaveLength(2) // Main article and related articles
  })

  it('renders breadcrumb navigation', () => {
    renderWithRouter('article-1')
    
    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('記事')).toBeInTheDocument()
    // Title appears in both breadcrumb and main heading
    expect(screen.getAllByText('記事1のタイトル')).toHaveLength(2)
  })

  it('renders tags when available', () => {
    renderWithRouter('article-1')
    
    // Tags appear as category badge, in tags section, and in related articles
    expect(screen.getAllByText('イベント')).toHaveLength(3)
    expect(screen.getByText('戸塚')).toBeInTheDocument()
  })

  it('renders related articles', () => {
    renderWithRouter('article-1')
    
    // Should show other articles from the same category
    expect(screen.getByText('関連記事')).toBeInTheDocument()
    expect(screen.getByText('記事3のタイトル')).toBeInTheDocument()
  })

  it('handles URL copy functionality', async () => {
    renderWithRouter('article-1')
    
    const copyButton = screen.getByText('URL をコピー')
    fireEvent.click(copyButton)
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalled()
      expect(screen.getByText('コピーしました！')).toBeInTheDocument()
    })
  })

  it('renders back to news list link', () => {
    renderWithRouter('article-1')
    
    const backLinks = screen.getAllByText('記事一覧に戻る')
    expect(backLinks.length).toBeGreaterThan(0)
    
    const backLink = backLinks[0].closest('a')
    expect(backLink).toHaveAttribute('href', '/article')
  })

  it('shows not found message for invalid slug', () => {
    renderWithRouter('invalid-slug')
    
    expect(screen.getByText('記事が見つかりませんでした')).toBeInTheDocument()
    expect(screen.getByText('記事一覧に戻る')).toBeInTheDocument()
  })

  it('renders article image', () => {
    renderWithRouter('article-1')
    
    const image = screen.getByAltText('記事1のタイトル')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/article1.jpg')
  })

  it('renders fallback image when article has no image', () => {
    // Modify mock data to have no image
    const originalImage = mockNewsItems[0].image
    mockNewsItems[0].image = undefined
    
    renderWithRouter('article-1')
    
    const image = screen.getByAltText('記事1のタイトル')
    expect(image).toHaveAttribute('src', '/images/default-thumbnail.png')
    
    // Restore original image
    mockNewsItems[0].image = originalImage
  })
})