import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArticleList from '../ArticleList'
import type { NewsItem } from '../../../src/types/news'

// Next.js のルーティング機能をモック
const mockPush = vi.fn()
const mockSearchParams = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}))

// NewsCard コンポーネントをモック
vi.mock('../../../src/components/NewsCard', () => ({
  default: ({ news }: { news: NewsItem }) => (
    <div data-testid={`news-${news.slug}`}>
      <h3>{news.title}</h3>
      <p>{news.excerpt}</p>
    </div>
  )
}))

describe('記事一覧コンポーネント', () => {
  // テスト用の記事データ
  const testArticles: NewsItem[] = [
    {
      slug: '20250609-new-shop',
      title: '新しいお店がオープン',
      excerpt: '戸塚駅前に新しいカフェがオープンしました',
      date: '2025-06-09T10:00:00.000Z',
      category: '開店',
      image: '/images/new-shop.jpg',
      author: 'テスト編集部',
      tags: ['カフェ', '新店舗'],
      content: '記事の本文'
    },
    {
      slug: '20250608-event',
      title: '夏祭りイベント開催',
      excerpt: '戸塚で夏祭りが開催されます',
      date: '2025-06-08T10:00:00.000Z',
      category: 'イベント',
      image: '/images/event.jpg',
      author: 'テスト編集部',
      tags: ['祭り', 'イベント'],
      content: '記事の本文'
    },
    {
      slug: '20250607-closing',
      title: '老舗店が閉店',
      excerpt: '50年続いた老舗店が閉店します',
      date: '2025-06-07T10:00:00.000Z',
      category: '閉店',
      image: '/images/closing.jpg',
      author: 'テスト編集部',
      tags: ['閉店'],
      content: '記事の本文'
    }
  ]

  beforeEach(() => {
    mockPush.mockClear()
  })

  describe('記事の表示', () => {
    it('すべての記事が表示される', () => {
      render(<ArticleList allPosts={testArticles} />)
      
      // すべての記事タイトルが表示されることを確認
      expect(screen.getByText('新しいお店がオープン')).toBeInTheDocument()
      expect(screen.getByText('夏祭りイベント開催')).toBeInTheDocument()
      expect(screen.getByText('老舗店が閉店')).toBeInTheDocument()
    })

    it('記事の概要が表示される', () => {
      render(<ArticleList allPosts={testArticles} />)
      
      expect(screen.getByText('戸塚駅前に新しいカフェがオープンしました')).toBeInTheDocument()
      expect(screen.getByText('戸塚で夏祭りが開催されます')).toBeInTheDocument()
      expect(screen.getByText('50年続いた老舗店が閉店します')).toBeInTheDocument()
    })

    it('記事がない場合はメッセージが表示される', () => {
      render(<ArticleList allPosts={[]} />)
      
      expect(screen.getByText('この条件に一致する記事はありません。')).toBeInTheDocument()
    })
  })

  describe('カテゴリフィルター', () => {
    it('カテゴリボタンが表示される', () => {
      render(<ArticleList allPosts={testArticles} />)
      
      expect(screen.getByText('すべて')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '開店' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'イベント' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '閉店' })).toBeInTheDocument()
    })
  })

  describe('ページネーション', () => {
    // 7つの記事でページネーションをテスト（6記事/ページ）
    const manyArticles = Array.from({ length: 7 }, (_, i) => ({
      slug: `article-${i}`,
      title: `記事${i + 1}`,
      excerpt: `記事${i + 1}の概要`,
      date: new Date(2025, 5, 9 - i).toISOString(),
      category: '街ネタ',
      image: `/images/article-${i}.jpg`,
      author: 'テスト編集部',
      content: '本文'
    })) as NewsItem[]

    it('6記事を超えるとページネーションが表示される', () => {
      render(<ArticleList allPosts={manyArticles} />)
      
      // ページネーションボタンが表示される
      expect(screen.getByText('前へ')).toBeInTheDocument()
      expect(screen.getByText('次へ')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('最初のページでは「前へ」が無効', () => {
      render(<ArticleList allPosts={manyArticles} />)
      
      const prevButton = screen.getByText('前へ')
      expect(prevButton).toHaveClass('cursor-not-allowed')
      expect(prevButton).toHaveClass('text-gray-400')
    })
  })
})