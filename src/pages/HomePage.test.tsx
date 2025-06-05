import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect, vi } from "vitest"
import HomePage from "./HomePage"
import { mockNewsItems } from "../test/mocks"

// Mock the useAllNews hook
vi.mock("../lib/useAllNews", () => ({
  useAllNews: () => mockNewsItems,
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe("HomePage", () => {
  it("renders hero section with site title and description", () => {
    renderWithRouter(<HomePage />)

    expect(screen.getByText("戸塚ぽーたる")).toBeInTheDocument()
    expect(screen.getByText("横浜市戸塚区の魅力を発信するローカルメディア")).toBeInTheDocument()
  })

  it("renders latest news section", () => {
    renderWithRouter(<HomePage />)

    expect(screen.getByText("最新記事")).toBeInTheDocument()
  })

  it("renders only 4 latest news items", () => {
    renderWithRouter(<HomePage />)

    // Should render first 4 news items
    expect(screen.getByText("記事1のタイトル")).toBeInTheDocument()
    expect(screen.getByText("記事2のタイトル")).toBeInTheDocument()
    expect(screen.getByText("記事3のタイトル")).toBeInTheDocument()
    expect(screen.getByText("記事4のタイトル")).toBeInTheDocument()
  })

  it("renders view all news button with correct link", () => {
    renderWithRouter(<HomePage />)

    const viewAllButton = screen.getByText("記事一覧を見る")
    expect(viewAllButton).toBeInTheDocument()

    const link = viewAllButton.closest("a")
    expect(link).toHaveAttribute("href", "/article")
  })

  it("renders about section", () => {
    renderWithRouter(<HomePage />)

    expect(screen.getByText("戸塚ぽーたるについて")).toBeInTheDocument()
    expect(
      screen.getByText(/「戸塚ぽーたる」は、横浜市戸塚区の魅力を発信するローカルメディアです/),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/地域の最新記事など、戸塚区の魅力を余すことなくお伝えします/),
    ).toBeInTheDocument()
  })

  it("renders contact email in about section", () => {
    renderWithRouter(<HomePage />)

    const emailElements = screen.getAllByText("totsuka.portal@gmail.com")
    expect(emailElements.length).toBeGreaterThan(0)
  })
})
