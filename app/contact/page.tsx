import { Metadata } from "next"
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'お問い合わせ | 戸塚ぽーたる',
  description: '戸塚ぽーたるへのお問い合わせはこちらから。情報提供や取材依頼なども歓迎しています。',
  openGraph: {
    title: 'お問い合わせ | 戸塚ぽーたる',
    description: '戸塚ぽーたるへのお問い合わせはこちらから。情報提供や取材依頼なども歓迎しています。',
    url: 'https://totsupo.pages.dev/contact',
  },
}

export default function ContactPage() {
  return <ContactForm />
}