import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import '@/src/index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '戸塚ぽーたる - 横浜市戸塚区の魅力を発信するローカルメディア',
  description: '戸塚ぽーたるは横浜市戸塚区の最新記事、イベント情報、おすすめスポットなどを発信するローカルメディアです。',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  themeColor: '#2563eb',
  openGraph: {
    title: '戸塚ぽーたる - 横浜市戸塚区の魅力を発信するローカルメディア',
    description: '戸塚ぽーたるは横浜市戸塚区の最新記事、イベント情報、おすすめスポットなどを発信するローカルメディアです。',
    url: 'https://totsupo.com',
    siteName: '戸塚ぽーたる',
    images: [
      {
        url: 'https://totsupo.com/favicon.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '戸塚ぽーたる - 横浜市戸塚区の魅力を発信するローカルメディア',
    description: '戸塚ぽーたるは横浜市戸塚区の最新記事、イベント情報、おすすめスポットなどを発信するローカルメディアです。',
    site: '@totsuka_portal',
    images: ['https://totsupo.com/favicon.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "戸塚ぽーたる",
    "url": "https://totsupo.com",
    "logo": "https://totsupo.com/favicon.png",
    "description": "横浜市戸塚区の魅力を発信するローカルメディア"
  };

  return (
    <html lang="ja">
    <head>
      <meta name="google-site-verification" content="qyoHgx1N8m95f0mOYpfmwm9nLtiRRQehhf2imDB79d0" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      <script async src="//www.instagram.com/embed.js"></script>
    </head>
    <body className={`${inter.className} min-h-screen bg-gray-50`}>
    <Header />
    {children}
    <Footer />
    </body>
    </html>
  )
}
