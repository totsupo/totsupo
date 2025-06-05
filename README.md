# 戸塚ぽーたる (Totsuka Portal)

横浜市戸塚区の魅力を発信するローカルメディアサイトです。地域の最新記事、イベント情報、生活に役立つ情報などを発信しています。

## 🛠️ 技術スタック

### フロントエンド
- **React 18** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Vite** - 高速ビルドツール
- **React Router v6** - クライアントサイドルーティング
- **Tailwind CSS** - ユーティリティファーストCSSフレームワーク

### コンテンツ管理
- **Decap CMS** - ヘッドレスCMS

### 開発・品質管理
- **Biome** - Linter & Formatter
- **Vitest** - テストフレームワーク
- **React Testing Library** - コンポーネントテスト

### デプロイメント
- **Cloudflare Pages** - ホスティング
- **GitHub Actions** - CI/CD

## 🚀 セットアップ

### 必要要件
- Node.js 18以上
- npm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/totsupo/totsupo.git
cd totsupo

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

開発サーバーが `http://localhost:5173` で起動します。

## 📝 開発コマンド

```bash
# 開発
npm run dev          # 開発サーバー起動 (Vite)

# ビルド & プレビュー
npm run build        # 本番用ビルド
npm run preview      # ビルド結果をプレビュー

# コード品質
npm run lint         # Biome linter実行
npm run format       # Biome formatter実行

# テスト
npm test             # テスト実行 (watch mode)
npm run test:ci      # テスト実行 (CI用)
npm run test:ui      # テストUIで実行
npm run test:coverage # カバレッジ付きテスト実行
```

## 📁 プロジェクト構成

```
totsupo/
├── public/                    # 静的ファイル
│   ├── admin/                # Netlify CMS設定
│   └── images/               # 画像ファイル
├── src/
│   ├── components/           # Reactコンポーネント
│   │   ├── Header.tsx       # ヘッダーコンポーネント
│   │   ├── Footer.tsx       # フッターコンポーネント
│   │   └── NewsCard.tsx     # 記事カードコンポーネント
│   ├── pages/                # ページコンポーネント
│   │   ├── HomePage.tsx     # ホームページ
│   │   ├── NewsPage.tsx     # 記事一覧ページ
│   │   ├── NewsDetailPage.tsx # 記事詳細ページ
│   │   └── ContactPage.tsx  # お問い合わせページ
│   ├── content/news/         # 記事ファイル (Markdown)
│   ├── lib/                  # ユーティリティ関数
│   ├── types/                # TypeScript型定義
│   └── test/                 # テスト設定・モック
├── functions/api/            # Serverless functions
└── .github/workflows/        # GitHub Actions設定
```

## ✍️ 記事の作成・編集

### CMS管理画面から（推奨）
1. `/admin` にアクセス
2. GitHubアカウントでログイン
3. 「新しい記事」から記事作成
4. プレビュー確認後、保存してプルリクエスト作成

### 直接ファイル編集
`src/content/news/` に Markdown ファイルを作成

```markdown
---
title: 記事タイトル
excerpt: 記事の概要
date: 2025-01-06
category: カテゴリ名
image: /images/thumbnail.jpg
author: 編集部
tags:
  - タグ1
  - タグ2
---

記事の本文をここに記述...
```

## 🧪 テスト

- **コンポーネントテスト** - Header, Footer, NewsCard
- **ページテスト** - HomePage, NewsPage, NewsDetailPage, ContactPage
- **ユーザーインタラクション** - フィルター機能、モバイルメニューなど

```bash
# テスト実行
npm test

# カバレッジ確認
npm run test:coverage
```

## 📱 レスポンシブ対応

- **モバイル** (< 768px) - ハンバーガーメニュー、1カラムレイアウト
- **タブレット** (768px - 1024px) - 2カラムレイアウト
- **デスクトップ** (> 1024px) - 3-4カラムレイアウト

## 🔧 設定ファイル

- `tailwind.config.js` - Tailwind CSS設定
- `vite.config.ts` - Vite設定
- `vitest.config.ts` - テスト設定
- `biome.json` - Linter/Formatter設定
- `public/admin/config.yml` - Netlify CMS設定

## 🌐 デプロイ

Cloudflare Pagesで自動デプロイされます：

1. `main` ブランチへのプッシュで自動ビルド・デプロイ
2. プルリクエストでプレビューデプロイ生成
3. GitHub Actionsでテスト自動実行

## 📞 お問い合わせ

- **メール**: totsuka.portal@gmail.com
- **X (Twitter)**: [@totsuka_portal](https://x.com/totsuka_portal)

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

---

© 2025 戸塚ぽーたる All Rights Reserved.
