import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// サイトのベースURL
const SITE_URL = 'https://totsupo.com';

// 静的ページの定義
const staticPages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: '/article',
    changefreq: 'daily',
    priority: '0.9'
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: '0.5'
  }
];

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
      
      return {
        url: `/article/${slug}`,
        lastmod: new Date(data.date).toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7'
      };
    })
    .sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod)); // 新しい記事順
}

// XMLサイトマップを生成
function generateSitemap() {
  const articles = getNewsArticles();
  const allPages = [...staticPages, ...articles];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

// サイトマップをファイルに保存
function saveSitemap() {
  const sitemap = generateSitemap();
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemap, 'utf-8');
  
  console.log('✅ サイトマップが生成されました:', outputPath);
  console.log(`📊 総ページ数: ${staticPages.length + getNewsArticles().length}`);
  console.log(`📰 記事数: ${getNewsArticles().length}`);
}

// スクリプト実行
saveSitemap();