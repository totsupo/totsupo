import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// サイトのベースURL（完全修飾URL必須）
const SITE_URL = 'https://totsupo.com';

// XMLエスケープ処理
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// Helper function to generate a short, URL-safe slug
function generateShortSlug(filename) {
  // Extract date prefix if it exists (YYYYMMDD-)
  const dateMatch = filename.match(/^(\d{8})-/);
  const datePrefix = dateMatch ? dateMatch[1] : '';
  
  // Check if the filename is already short enough (e.g., from CMS with manual slug)
  const titlePart = filename.replace(/^\d{8}-/, '');
  if (titlePart.length <= 50 && /^[a-zA-Z0-9\-_]+$/.test(titlePart)) {
    return filename; // Use as-is if it's already URL-safe and short
  }
  
  // Create a hash of the full filename for uniqueness
  const hash = crypto.createHash('md5').update(filename).digest('hex').substring(0, 8);
  
  return datePrefix ? `${datePrefix}-${hash}` : hash;
}

// 静的ページの定義（priorityとchangefreqは削除）
const staticPages = [
  {
    url: '/'
  },
  {
    url: '/article'
  },
  {
    url: '/contact'
  }
];

// 記事一覧を取得
function getNewsArticles() {
  const newsDir = path.join(__dirname, '../src/content/news');
  const files = fs.readdirSync(newsDir);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(newsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      // Generate slug - prefer frontmatter slug if available
      const filenameWithoutExt = file.replace(/\.md$/, '');
      let slug;
      
      // Use frontmatter slug if available and valid
      if (data.slug && typeof data.slug === 'string' && /^[a-zA-Z0-9\-_]+$/.test(data.slug)) {
        slug = data.slug;
      } else {
        slug = generateShortSlug(filenameWithoutExt);
      }
      
      // ISO 8601形式でlastmodを設定（W3C Datetime形式）
      const lastmod = new Date(data.date).toISOString();
      
      return {
        url: `/article/${slug}`,
        lastmod: lastmod
      };
    })
    .sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod)); // 新しい記事順
}

// XMLサイトマップを生成（Google推奨形式）
function generateSitemap() {
  const articles = getNewsArticles();
  const allPages = [...staticPages, ...articles];
  
  // URLの総数チェック（50,000以下）
  if (allPages.length > 50000) {
    console.warn('⚠️ サイトマップのURL数が50,000を超えています。分割を検討してください。');
  }
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => {
    // 完全修飾URLを生成
    const fullUrl = `${SITE_URL}${page.url}`;
    
    let urlEntry = `  <url>\n    <loc>${escapeXml(fullUrl)}</loc>`;
    
    // lastmodは重要なコンテンツ変更時のみ含める
    if (page.lastmod) {
      urlEntry += `\n    <lastmod>${page.lastmod}</lastmod>`;
    }
    
    urlEntry += '\n  </url>';
    return urlEntry;
  }).join('\n')}
</urlset>`;

  return sitemap;
}

// サイトマップをファイルに保存
function saveSitemap() {
  const sitemap = generateSitemap();
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  
  // ファイルサイズチェック（50MB以下）
  const sizeInMB = Buffer.byteLength(sitemap, 'utf8') / 1024 / 1024;
  if (sizeInMB > 50) {
    console.warn(`⚠️ サイトマップのサイズが50MBを超えています（${sizeInMB.toFixed(2)}MB）。分割を検討してください。`);
  }
  
  fs.writeFileSync(outputPath, sitemap, 'utf-8');
  
  console.log('✅ サイトマップが生成されました:', outputPath);
  console.log(`📊 総ページ数: ${staticPages.length + getNewsArticles().length}`);
  console.log(`📰 記事数: ${getNewsArticles().length}`);
  console.log(`📦 ファイルサイズ: ${sizeInMB.toFixed(2)}MB`);
}

// スクリプト実行
saveSitemap();