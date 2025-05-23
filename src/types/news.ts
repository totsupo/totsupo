export type NewsItem = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  author?: string
  tags?: string[]
  related?: string[]
  content: string
}
