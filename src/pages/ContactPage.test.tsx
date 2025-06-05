import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, afterEach } from 'vitest'
import ContactPage from './ContactPage'

// Mock clipboard API
const mockWriteText = vi.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

// Mock window.alert
const mockAlert = vi.fn()
window.alert = mockAlert

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('ContactPage', () => {
  afterEach(() => {
    mockWriteText.mockClear()
    mockAlert.mockClear()
  })

  it('renders page title and description', () => {
    renderWithRouter(<ContactPage />)
    
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
    expect(screen.getByText(/戸塚ぽーたるへのご連絡は、メールまたは X の メッセージ/)).toBeInTheDocument()
  })

  it('renders email contact section', () => {
    renderWithRouter(<ContactPage />)
    
    expect(screen.getByText('メール')).toBeInTheDocument()
    expect(screen.getByText('totsuka.portal@gmail.com')).toBeInTheDocument()
    expect(screen.getAllByText('24時間受付')[0]).toBeInTheDocument()
  })

  it('renders X (Twitter) contact section', () => {
    renderWithRouter(<ContactPage />)
    
    expect(screen.getByText('X')).toBeInTheDocument()
    expect(screen.getByText('@totsuka_portal')).toBeInTheDocument()
    expect(screen.getAllByText('24時間受付')[1]).toBeInTheDocument()
  })

  it('renders send email button with correct mailto link', () => {
    renderWithRouter(<ContactPage />)
    
    const sendButton = screen.getByText('メールを送る').closest('a')
    expect(sendButton).toHaveAttribute('href', expect.stringContaining('mailto:totsuka.portal@gmail.com'))
    expect(sendButton).toHaveAttribute('href', expect.stringContaining(encodeURIComponent('【戸塚ぽーたる】お問い合わせ')))
  })

  it('handles email copy functionality', async () => {
    renderWithRouter(<ContactPage />)
    
    const copyButton = screen.getByText('コピー')
    fireEvent.click(copyButton)
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith('totsuka.portal@gmail.com')
      expect(mockAlert).toHaveBeenCalledWith('メールアドレスをコピーしました！')
    })
  })

  it('renders X account link with correct attributes', () => {
    renderWithRouter(<ContactPage />)
    
    const xLink = screen.getByText('アカウントはこちら').closest('a')
    expect(xLink).toHaveAttribute('href', 'https://x.com/totsuka_portal')
    expect(xLink).toHaveAttribute('target', '_blank')
    expect(xLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders information submission notice', () => {
    renderWithRouter(<ContactPage />)
    
    expect(screen.getByText('情報提供をお待ちしています')).toBeInTheDocument()
    expect(screen.getByText(/イベント情報や取材してほしい場所・人物など/)).toBeInTheDocument()
  })

  it('renders FAQ section', () => {
    renderWithRouter(<ContactPage />)
    
    expect(screen.getByText('よくあるご質問')).toBeInTheDocument()
    
    // FAQ items
    expect(screen.getByText(/取材してほしい場所や人物を紹介したいのですが/)).toBeInTheDocument()
    expect(screen.getByText(/記事の内容に誤りがある場合はどうすればよいですか/)).toBeInTheDocument()
    
    // FAQ answers
    expect(screen.getByText(/はい、可能です。メールまたはXのメッセージより/)).toBeInTheDocument()
    expect(screen.getByText(/該当記事のURLと内容をご連絡ください/)).toBeInTheDocument()
  })
})