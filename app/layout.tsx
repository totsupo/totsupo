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
    icon: '/favicon.png',
    apple: '/favicon.png',
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
  return (
    <html lang="ja">
    <head>
      <meta name="google-site-verification" content="qyoHgx1N8m95f0mOYpfmwm9nLtiRRQehhf2imDB79d0" />
    </head>
    <body className={`${inter.className} min-h-screen bg-gray-50`}>
    <Header />
    {children}
    <Footer />
    </body>
    </html>
  )
}
