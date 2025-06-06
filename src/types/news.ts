export type NewsItem = {
  slug: string
  title: string
  excerpt: string
  date: string
  status?: 'draft' | 'scheduled' | 'published'
  category: string
  image: string
  author?: string
  tags?: string[]
  related?: string[]
  content: string
}
