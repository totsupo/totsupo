// テスト用の記事データ
export const testArticles = {
  // 正常な記事データ
  validArticle: `---
title: テスト記事のタイトル
excerpt: これはテスト用の記事の概要です
date: 2025-06-01T10:00:00.000Z
category: 街ネタ
image: /images/test-image.jpg
author: テスト編集部
tags:
  - テストタグ1
  - テストタグ2
---
# テスト記事の本文

これはテスト用の記事の本文です。

**太字**や*イタリック*も使えます。`,

  // frontmatter に slug が含まれる記事
  articleWithSlug: `---
title: カスタムスラッグ付きの記事
slug: custom-slug-test
excerpt: カスタムスラッグを持つテスト記事
date: 2025-06-02T10:00:00.000Z
category: 開店
image: /images/test-image2.jpg
author: テスト編集部
---
カスタムスラッグ付きの記事本文`,

  // 必須フィールドが不足している記事
  incompleteArticle: `---
title: 不完全な記事
date: 2025-06-03T10:00:00.000Z
---
必須フィールドが不足している記事`,

  // 日本語ファイル名の記事
  japaneseFilenameArticle: `---
title: 日本語ファイル名のテスト記事
excerpt: 日本語ファイル名から生成されるスラッグのテスト
date: 2025-06-04T10:00:00.000Z
category: イベント
image: /images/japanese-test.jpg
author: テスト編集部
---
日本語ファイル名の記事本文`,

  // 日付プレフィックス付きファイル名の記事
  dateFilenameArticle: `---
title: 日付プレフィックス付きの記事
excerpt: YYYYMMDDプレフィックス付きファイル名のテスト
date: 2025-06-05T10:00:00.000Z
category: 閉店
image: /images/date-test.jpg
author: テスト編集部
---
日付プレフィックス付きの記事本文`
}

export const testFilenames = {
  simple: 'test-article.md',
  withSlug: 'custom-slug-article.md', 
  incomplete: 'incomplete-article.md',
  japanese: '戸塚駅東口すぐの新スポット「トツカド」.md',
  datePrefix: '20250605-新しい店舗がオープン.md',
  longFilename: '20250606-とても長いファイル名でURL安全ではない文字を含む記事のテスト.md'
}

// ファイル名とコンテンツのマッピング
export const fileContentMap: Record<string, string> = {
  [testFilenames.simple]: testArticles.validArticle,
  [testFilenames.withSlug]: testArticles.articleWithSlug,
  [testFilenames.incomplete]: testArticles.incompleteArticle,
  [testFilenames.japanese]: testArticles.japaneseFilenameArticle,
  [testFilenames.datePrefix]: testArticles.dateFilenameArticle
}