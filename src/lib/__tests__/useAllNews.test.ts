import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import fs from 'fs'
import path from 'path'
import { getAllNews, getNewsBySlug } from '../useAllNews'
import { testArticles, testFilenames, fileContentMap } from '../../test/fixtures/test-articles'

// fs モジュールをモック
vi.mock('fs')
vi.mock('path')

const mockedFs = vi.mocked(fs)
const mockedPath = vi.mocked(path)

describe('記事データ処理', () => {
  beforeEach(() => {
    // process.cwd() をモック
    vi.spyOn(process, 'cwd').mockReturnValue('/test-project')
    
    // path.join をモック
    mockedPath.join.mockImplementation((...args) => args.join('/'))
    
    // デフォルトのファイルリストを設定
    mockedFs.readdirSync.mockReturnValue([
      testFilenames.simple,
      testFilenames.withSlug,
      testFilenames.incomplete,
      testFilenames.japanese,
      testFilenames.datePrefix,
      'not-markdown.txt', // マークダウンファイル以外
    ] as any)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('マークダウンファイルの解析', () => {
    it('正常なマークダウンファイルを正しく解析する', () => {
      mockedFs.readFileSync.mockImplementation((filePath) => {
        const filename = filePath.split('/').pop() || ''
        return fileContentMap[filename] || testArticles.validArticle
      })
      
      const articles = getAllNews()
      
      expect(articles).toHaveLength(5) // マークダウンファイルのみ
      
      // テスト記事を検索して確認
      const testArticle = articles.find(a => a.title === 'テスト記事のタイトル')
      expect(testArticle).toMatchObject({
        title: 'テスト記事のタイトル',
        excerpt: 'これはテスト用の記事の概要です',
        category: '街ネタ',
        image: '/images/test-image.jpg',
        author: 'テスト編集部',
        tags: ['テストタグ1', 'テストタグ2']
      })
      expect(testArticle).toHaveProperty('slug')
      expect(testArticle).toHaveProperty('content')
    })

    it('frontmatterが不完全でもエラーなく処理する', () => {
      mockedFs.readFileSync.mockImplementation((filePath) => {
        const filename = filePath.split('/').pop() || ''
        return fileContentMap[filename] || testArticles.validArticle
      })
      
      const articles = getAllNews()
      
      expect(articles).toHaveLength(5)
      
      // すべてのタイトルをチェック
      const titles = articles.map(a => a.title)
      expect(titles).toContain('不完全な記事')
      
      // 不完全な記事も含まれることを確認（タイトルのみ設定されている）
      const incompleteArticle = articles.find(a => a.title === '不完全な記事')
      expect(incompleteArticle).toBeDefined()
      // 日付が設定されていることを確認
      expect(incompleteArticle?.date).toBeDefined()
    })

    it('マークダウンファイル以外は無視する', () => {
      mockedFs.readFileSync.mockReturnValue(testArticles.validArticle)
      
      const articles = getAllNews()
      
      // .txt ファイルは除外され、.md ファイルのみ処理される
      expect(articles).toHaveLength(5)
    })
  })

  describe('スラッグ生成', () => {
    it('frontmatterにslugがある場合はそれを使用する', () => {
      mockedFs.readFileSync.mockImplementation((filePath) => {
        const filename = filePath.split('/').pop() || ''
        return fileContentMap[filename] || testArticles.validArticle
      })
      
      const articles = getAllNews()
      const customSlugArticle = articles.find(a => a.title === 'カスタムスラッグ付きの記事')
      
      expect(customSlugArticle?.slug).toBe('custom-slug-test')
    })

    it('日付プレフィックス付きファイル名からスラッグを生成する', () => {
      mockedFs.readFileSync.mockImplementation((filePath) => {
        const filename = filePath.split('/').pop() || ''
        return fileContentMap[filename] || testArticles.validArticle
      })
      
      const articles = getAllNews()
      const datePrefixArticle = articles.find(a => a.title === '日付プレフィックス付きの記事')
      
      expect(datePrefixArticle?.slug).toBeDefined()
      // 日付プレフィックスが含まれることを確認
      expect(datePrefixArticle?.slug).toMatch(/^20250605-/)
    })

    it('日本語ファイル名からハッシュベースのスラッグを生成する', () => {
      mockedFs.readFileSync.mockImplementation((filePath) => {
        const filename = filePath.split('/').pop() || ''
        return fileContentMap[filename] || testArticles.validArticle
      })
      
      const articles = getAllNews()
      const japaneseArticle = articles.find(a => a.title === '日本語ファイル名のテスト記事')
      
      expect(japaneseArticle?.slug).toBeDefined()
      expect(japaneseArticle?.slug).toMatch(/^[a-f0-9]{8}$/) // ハッシュのみ
    })

    it('同じファイル名からは常に同じスラッグを生成する', () => {
      mockedFs.readFileSync.mockImplementation((filePath) => {
        const filename = filePath.split('/').pop() || ''
        return fileContentMap[filename] || testArticles.validArticle
      })
      
      const articles1 = getAllNews()
      const articles2 = getAllNews()
      
      expect(articles1[0].slug).toBe(articles2[0].slug)
    })
  })

  describe('記事の並び順', () => {
    it('記事を日付の新しい順でソートする', () => {
      mockedFs.readFileSync.mockImplementation((filePath) => {
        const filename = filePath.split('/').pop() || ''
        return fileContentMap[filename] || testArticles.validArticle
      })
      
      const articles = getAllNews()
      
      // 日付順で並んでいることを確認
      const dates = articles.map(a => new Date(a.date).getTime())
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i-1]).toBeGreaterThanOrEqual(dates[i])
      }
    })
  })

  describe('個別記事の取得', () => {
    beforeEach(() => {
      // getAllNews のキャッシュをクリア
      mockedFs.readFileSync.mockImplementation((filePath) => {
        const filename = filePath.split('/').pop() || ''
        return fileContentMap[filename] || testArticles.validArticle
      })
      
      // 最初に getAllNews を呼んでキャッシュを構築
      getAllNews()
    })

    it('有効なスラッグで記事を取得できる', () => {
      const article = getNewsBySlug('custom-slug-test')
      
      expect(article).toBeDefined()
      expect(article?.title).toBe('カスタムスラッグ付きの記事')
      expect(article?.slug).toBe('custom-slug-test')
    })

    it('無効なスラッグの場合はnullを返す', () => {
      const article = getNewsBySlug('non-existent-slug')
      
      expect(article).toBeNull()
    })

    it('ファイル読み込みエラーの場合はnullを返す', () => {
      // readFileSync でエラーを発生させる
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('ファイルが見つかりません')
      })
      
      const article = getNewsBySlug('custom-slug-test')
      
      expect(article).toBeNull()
    })
  })

  describe('エラーハンドリング', () => {
    it('ディレクトリが存在しない場合のエラーを適切に処理する', () => {
      mockedFs.readdirSync.mockImplementation(() => {
        throw new Error('ディレクトリが見つかりません')
      })
      
      expect(() => getAllNews()).toThrow('ディレクトリが見つかりません')
    })

    it('ファイル読み込みエラーの記事はスキップする', () => {
      mockedFs.readFileSync.mockImplementation((filePath) => {
        const filename = filePath.split('/').pop() || ''
        if (filename.includes('test-article')) {
          throw new Error('ファイル読み込みエラー')
        }
        return testArticles.validArticle
      })
      
      expect(() => getAllNews()).toThrow() // エラーが伝播することを確認
    })
  })
})