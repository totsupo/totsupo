import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// サイトのベースURL
const SITE_URL = 'https://totsupo.pages.dev';

// Helper function to generate a short, URL-safe slug (same as useAllNews.ts)
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

// 記事一覧を取得
function getNewsArticles() {
  const newsDir = path.join(__dirname, '../src/content/news');
  const articles = [];
  const usedSlugs = new Set();
  
  // Recursively find all index.md files
  function findIndexFiles(dir, basePath = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const relativePath = path.join(basePath, item.name);
      
      if (item.isDirectory()) {
        findIndexFiles(fullPath, relativePath);
      } else if (item.name === 'index.md') {
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(fileContent);
        
        // Use frontmatter slug if available, otherwise generate from path
        let slug;
        if (data.slug && typeof data.slug === 'string' && /^[a-zA-Z0-9\-_]+$/.test(data.slug)) {
          slug = data.slug;
          
          // Check for slug collision and handle it
          if (usedSlugs.has(slug)) {
            console.warn(`Slug collision detected in sitemap: "${slug}" already exists. Adding date suffix.`);
            // Add date suffix to make slug unique
            const date = new Date(data.date);
            const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
            slug = `${slug}-${dateStr}`;
          }
        } else {
          // Generate from directory path using the same logic as useAllNews.ts
          const pathParts = basePath.split(path.sep);
          if (pathParts.length >= 3) {
            const [year, month, articleDir] = pathParts;
            // Extract just the title part after the day prefix
            const titlePart = articleDir.replace(/^\d{2}-/, '');
            slug = generateShortSlug(`${year}${month}${articleDir}`);
          } else {
            slug = generateShortSlug(basePath);
          }
        }
        
        usedSlugs.add(slug);
        
        articles.push({
          url: `/article/${slug}`,
          lastmod: new Date(data.date).toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: '0.7'
        });
      }
    }
  }
  
  findIndexFiles(newsDir);
  
  return articles.sort((a, b) => new Date(b.lastmod) - new Date(a.lastmod)); // 新しい記事順
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