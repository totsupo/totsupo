import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs'
import path from 'path'
import { getAllNews, getNewsBySlug } from '../../useAllNews'

describe('CMS記事投稿ワークフローの統合テスト', () => {
  const testContentDir = path.join(process.cwd(), 'src/content/news')
  const testArticleFilename = '20250609-cms-integration-test.md'
  const testArticlePath = path.join(testContentDir, testArticleFilename)

  // CMSから投稿される記事の形式
  const cmsArticleContent = `---
title: CMSから投稿したテスト記事
slug: 20250609-cms-test
excerpt: CMSから投稿されたテスト記事です
date: 2025-06-09T10:00:00.000Z
category: 開店
image: /images/cms-test-image.jpg
author: CMS編集部
tags:
  - 新店舗
  - テスト
---
# CMSから投稿したテスト記事

これはCMSから投稿されたテスト記事の本文です。

![テスト画像](/images/cms-test-image.jpg)

## 特徴
- CMSから直接投稿
- マークダウン形式
- 画像も含む`

  beforeEach(() => {
    // テスト開始前にファイルが存在する場合は削除
    if (fs.existsSync(testArticlePath)) {
      fs.unlinkSync(testArticlePath)
    }
  })

  afterEach(() => {
    // テスト後のクリーンアップ
    if (fs.existsSync(testArticlePath)) {
      fs.unlinkSync(testArticlePath)
    }
  })

  describe('CMSからの記事追加', () => {
    it('CMSから記事を追加すると記事一覧に即座に反映される', () => {
      // 1. 追加前の記事数を確認
      const initialArticles = getAllNews()
      const initialCount = initialArticles.length

      // 2. CMSから記事を追加（ファイル作成をシミュレート）
      fs.writeFileSync(testArticlePath, cmsArticleContent, 'utf8')

      // 3. 記事が追加されたことを確認
      const updatedArticles = getAllNews()
      expect(updatedArticles.length).toBe(initialCount + 1)

      // 4. 追加された記事の内容を確認
      const newArticle = updatedArticles.find(
        article => article.slug === '20250609-cms-test'
      )
      
      expect(newArticle).toBeDefined()
      expect(newArticle).toMatchObject({
        title: 'CMSから投稿したテスト記事',
        slug: '20250609-cms-test',
        excerpt: 'CMSから投稿されたテスト記事です',
        category: '開店',
        image: '/images/cms-test-image.jpg',
        author: 'CMS編集部',
        tags: ['新店舗', 'テスト']
      })
    })

    it('CMSのfrontmatterにslugがない場合はファイル名からスラッグを生成', () => {
      // slugなしの記事
      const noSlugContent = cmsArticleContent.replace(
        'slug: 20250609-cms-test\n',
        ''
      )
      
      fs.writeFileSync(testArticlePath, noSlugContent, 'utf8')
      
      const articles = getAllNews()
      const article = articles.find(
        a => a.title === 'CMSから投稿したテスト記事'
      )
      
      expect(article).toBeDefined()
      // ファイル名からスラッグが生成される
      expect(article?.slug).toMatch(/^20250609-/)
    })

    it('最新記事として一番上に表示される', () => {
      // 新しい日付で記事を作成
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 1)
      const futureContent = cmsArticleContent.replace(
        'date: 2025-06-09T10:00:00.000Z',
        `date: ${futureDate.toISOString()}`
      )
      
      fs.writeFileSync(testArticlePath, futureContent, 'utf8')
      
      const articles = getAllNews()
      
      // 最新記事として一番上に表示される
      expect(articles[0].title).toBe('CMSから投稿したテスト記事')
    })
  })

  describe('記事の個別取得', () => {
    it('追加した記事が個別ページで取得できる', () => {
      fs.writeFileSync(testArticlePath, cmsArticleContent, 'utf8')
      
      const article = getNewsBySlug('20250609-cms-test')
      
      expect(article).not.toBeNull()
      expect(article?.title).toBe('CMSから投稿したテスト記事')
      expect(article?.content).toContain('これはCMSから投稿されたテスト記事の本文です')
      expect(article?.content).toContain('![テスト画像](/images/cms-test-image.jpg)')
    })

    it('存在しないスラッグではnullが返る', () => {
      const article = getNewsBySlug('non-existent-slug')
      expect(article).toBeNull()
    })
  })

  describe('カテゴリとタグのフィルタリング', () => {
    it('カテゴリでフィルタリングできる', () => {
      fs.writeFileSync(testArticlePath, cmsArticleContent, 'utf8')
      
      const allArticles = getAllNews()
      const kaistenArticles = allArticles.filter(
        article => article.category === '開店'
      )
      
      const testArticle = kaistenArticles.find(
        article => article.slug === '20250609-cms-test'
      )
      
      expect(testArticle).toBeDefined()
      expect(testArticle?.category).toBe('開店')
    })

    it('タグでフィルタリングできる', () => {
      fs.writeFileSync(testArticlePath, cmsArticleContent, 'utf8')
      
      const allArticles = getAllNews()
      const taggedArticles = allArticles.filter(
        article => article.tags?.includes('新店舗')
      )
      
      const testArticle = taggedArticles.find(
        article => article.slug === '20250609-cms-test'
      )
      
      expect(testArticle).toBeDefined()
      expect(testArticle?.tags).toContain('新店舗')
    })
  })

  describe('記事の更新', () => {
    it('記事を更新すると内容が即座に反映される', () => {
      // 初期記事を作成
      fs.writeFileSync(testArticlePath, cmsArticleContent, 'utf8')
      
      // 初期状態を確認
      let article = getNewsBySlug('20250609-cms-test')
      expect(article?.title).toBe('CMSから投稿したテスト記事')
      
      // タイトルを更新
      const updatedContent = cmsArticleContent.replace(
        'title: CMSから投稿したテスト記事',
        'title: 更新されたCMSテスト記事'
      )
      fs.writeFileSync(testArticlePath, updatedContent, 'utf8')
      
      // 更新後の状態を確認
      article = getNewsBySlug('20250609-cms-test')
      expect(article?.title).toBe('更新されたCMSテスト記事')
    })
  })

  describe('エラーケース', () => {
    it('不正なfrontmatterの場合はエラーが発生する', () => {
      const invalidContent = `---
title: 不正な記事
これは不正なYAML
---
本文`
      
      fs.writeFileSync(testArticlePath, invalidContent, 'utf8')
      
      // YAMLパースエラーが発生することを確認
      expect(() => getAllNews()).toThrow('can not read a block mapping entry')
    })

    it('frontmatterがない記事も処理される', () => {
      const noFrontmatterContent = `# タイトルのみの記事

これはfrontmatterがない記事です。`
      
      fs.writeFileSync(testArticlePath, noFrontmatterContent, 'utf8')
      
      // エラーが発生しないことを確認
      expect(() => getAllNews()).not.toThrow()
      
      const articles = getAllNews()
      // ファイルは読み込まれるが、必要なフィールドがない
      expect(articles.length).toBeGreaterThan(0)
    })
  })
})