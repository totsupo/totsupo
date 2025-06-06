# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

戸塚ぽーたる (Totsuka Portal) - A local media website for Totsuka Ward, Yokohama City. This is a React-based single-page application with Netlify CMS integration for content management.

## Essential Commands

```bash
# Development
npm run dev          # Start development server (Vite)

# Build & Preview
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run Biome linter on ./src
npm run format       # Format code with Biome
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (with Typography plugin)
- **Routing**: React Router v6 (client-side routing)
- **Content**: Markdown files with gray-matter frontmatter
- **CMS**: Netlify CMS with GitHub backend
- **Deployment**: Cloudflare Pages

### Key Directories
- `/src/content/news/` - Markdown news articles
- `/public/images/` - Static images
- `/src/pages/` - React page components
- `/functions/api/` - Serverless functions for CMS auth

### Content Management
News articles are managed through Netlify CMS at `/admin`. The CMS:
- Uses GitHub authentication via OAuth
- Follows editorial workflow (drafts → review → publish)
- Creates pull requests for new content
- Slug format: `YYYYMMDD-{title}`

### Development Notes
- All TypeScript files use strict mode
- Biome handles formatting (2-space indent, semicolons as needed)
- Client-side routing requires all routes to fallback to index.html
- News data is aggregated in `/src/data/newsData.ts`