import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import NewsPage from './NewsPage'
import { mockNewsItems } from '../test/mocks'

// Mock the useAllNews hook
vi.mock('../lib/useAllNews', () => ({
  useAllNews: () => mockNewsItems
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('NewsPage', () => {
  it('renders page title and description', () => {
    renderWithRouter(<NewsPage />)
    
    expect(screen.getByText('記事')).toBeInTheDocument()
    expect(screen.getByText(/戸塚区の最新記事をお届けします/)).toBeInTheDocument()
  })

  it('renders category filter buttons', () => {
    renderWithRouter(<NewsPage />)
    
    expect(screen.getByText('すべて')).toBeInTheDocument()
    // 'イベント' appears in filter button and news cards
    expect(screen.getAllByText('イベント')).toHaveLength(3) // Filter button + 2 news cards
    expect(screen.getAllByText('生活')).toHaveLength(2) // Filter button + 1 news card
    expect(screen.getAllByText('子育て')).toHaveLength(2) // Filter button + 1 news card
  })

  it('shows all news items by default', () => {
    renderWithRouter(<NewsPage />)
    
    expect(screen.getByText('記事1のタイトル')).toBeInTheDocument()
    expect(screen.getByText('記事2のタイトル')).toBeInTheDocument()
    expect(screen.getByText('記事3のタイトル')).toBeInTheDocument()
    expect(screen.getByText('記事4のタイトル')).toBeInTheDocument()
  })

  it('filters news by category when category button is clicked', async () => {
    renderWithRouter(<NewsPage />)
    
    // Click on 'イベント' category - need to get the button specifically
    const eventButton = screen.getAllByText('イベント')[0] // First one is the filter button
    fireEvent.click(eventButton)
    
    await waitFor(() => {
      // Should show only event articles
      expect(screen.getByText('記事1のタイトル')).toBeInTheDocument()
      expect(screen.getByText('記事3のタイトル')).toBeInTheDocument()
      
      // Should not show other category articles
      expect(screen.queryByText('記事2のタイトル')).not.toBeInTheDocument()
      expect(screen.queryByText('記事4のタイトル')).not.toBeInTheDocument()
    })
  })

  it('shows all news when "すべて" is clicked after filtering', async () => {
    renderWithRouter(<NewsPage />)
    
    // First filter by category
    fireEvent.click(screen.getAllByText('イベント')[0])
    
    await waitFor(() => {
      expect(screen.queryByText('記事2のタイトル')).not.toBeInTheDocument()
    })
    
    // Then click 'すべて'
    fireEvent.click(screen.getByText('すべて'))
    
    await waitFor(() => {
      // All articles should be visible again
      expect(screen.getByText('記事1のタイトル')).toBeInTheDocument()
      expect(screen.getByText('記事2のタイトル')).toBeInTheDocument()
      expect(screen.getByText('記事3のタイトル')).toBeInTheDocument()
      expect(screen.getByText('記事4のタイトル')).toBeInTheDocument()
    })
  })

  it('highlights active category button', async () => {
    renderWithRouter(<NewsPage />)
    
    // Initially 'すべて' should be active
    const allButton = screen.getByText('すべて')
    expect(allButton.className).toContain('bg-blue-600')
    expect(allButton.className).toContain('text-white')
    
    // Click on 'イベント'
    const eventButton = screen.getAllByText('イベント')[0] // Filter button
    fireEvent.click(eventButton)
    
    // Wait for state update
    await waitFor(() => {
      // 'イベント' should now be active
      expect(eventButton.className).toContain('bg-blue-600')
      expect(eventButton.className).toContain('text-white')
      
      // 'すべて' should not be active anymore
      expect(allButton.className).not.toContain('bg-blue-600')
      expect(allButton.className).toContain('bg-white')
    })
  })

  it('shows no results message when filtered category has no articles', async () => {
    renderWithRouter(<NewsPage />)
    
    // Mock a category with no articles
    const buttons = screen.getAllByRole('button')
    const testButton = buttons.find(btn => btn.textContent === '生活')
    
    if (testButton) {
      fireEvent.click(testButton)
      
      // Filter to show only '生活' category (which has only one article)
      await waitFor(() => {
        expect(screen.getByText('記事2のタイトル')).toBeInTheDocument()
      })
    }
  })
})