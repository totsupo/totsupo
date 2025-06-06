import { Inter } from 'next/font/google'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import '@/src/index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '戸塚ぽーたる - 横浜市戸塚区の魅力を発信するローカルメディア',
  description: '戸塚ぽーたるは横浜市戸塚区の最新記事、イベント情報、おすすめスポットなどを発信するローカルメディアです。',
  openGraph: {
    title: '戸塚ぽーたる - 横浜市戸塚区の魅力を発信するローカルメディア',
    description: '戸塚ぽーたるは横浜市戸塚区の最新記事、イベント情報、おすすめスポットなどを発信するローカルメディアです。',
    url: 'https://totsupo.pages.dev',
    siteName: '戸塚ぽーたる',
    images: [
      {
        url: 'https://totsupo.pages.dev/favicon.png',
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
    images: ['https://totsupo.pages.dev/favicon.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}