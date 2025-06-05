import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import NewsCard from "./NewsCard"
import type { NewsItem } from "../types/news"

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

const mockNews: NewsItem = {
  slug: "test-article",
  title: "テスト記事タイトル",
  excerpt: "これはテスト記事の概要です。",
  date: "2025-01-06",
  category: "テスト",
  image: "/images/test.jpg",
  author: "編集部",
  content: "テスト記事の本文",
  tags: ["テスト", "サンプル"],
}

const mockNewsWithoutImage: NewsItem = {
  ...mockNews,
  image: undefined,
}

const mockNewsWithoutAuthor: NewsItem = {
  ...mockNews,
  author: undefined,
}

describe("NewsCard", () => {
  it("renders news title and excerpt", () => {
    renderWithRouter(<NewsCard news={mockNews} />)

    expect(screen.getByText("テスト記事タイトル")).toBeInTheDocument()
    expect(screen.getByText("これはテスト記事の概要です。")).toBeInTheDocument()
  })

  it("renders category badge", () => {
    renderWithRouter(<NewsCard news={mockNews} />)

    expect(screen.getByText("テスト")).toBeInTheDocument()
  })

  it("renders date in Japanese format", () => {
    renderWithRouter(<NewsCard news={mockNews} />)

    expect(screen.getByText("2025/1/6")).toBeInTheDocument()
  })

  it("renders author when provided", () => {
    renderWithRouter(<NewsCard news={mockNews} />)

    expect(screen.getByText("編集部")).toBeInTheDocument()
  })

  it("does not render author when not provided", () => {
    renderWithRouter(<NewsCard news={mockNewsWithoutAuthor} />)

    expect(screen.queryByText("編集部")).not.toBeInTheDocument()
  })

  it("renders image when provided", () => {
    renderWithRouter(<NewsCard news={mockNews} />)

    const image = screen.getByAltText("テスト記事タイトル")
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", "/images/test.jpg")
  })

  it("renders fallback image when image not provided", () => {
    renderWithRouter(<NewsCard news={mockNewsWithoutImage} />)

    const image = screen.getByAltText("テスト記事タイトル")
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", "/images/default-thumbnail.png")
  })

  it("renders correct link to article detail page", () => {
    renderWithRouter(<NewsCard news={mockNews} />)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/article/test-article")
  })

  it("applies hover effect class", () => {
    renderWithRouter(<NewsCard news={mockNews} />)

    const card = screen.getByRole("link").querySelector(".hover\\:shadow-lg")
    expect(card).toBeInTheDocument()
  })
})
