import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import Header from "./Header"

// Helper function to render with Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe("Header", () => {
  it("renders logo and site name", () => {
    renderWithRouter(<Header />)

    expect(screen.getByAltText("戸塚ぽーたる ロゴ")).toBeInTheDocument()
    expect(screen.getByText("戸塚ぽーたる")).toBeInTheDocument()
  })

  it("renders desktop navigation links", () => {
    renderWithRouter(<Header />)

    // Desktop navigation should be visible by default
    const desktopNav = screen.getAllByRole("link")

    expect(desktopNav.find((link) => link.textContent === "ホーム")).toBeTruthy()
    expect(desktopNav.find((link) => link.textContent === "記事")).toBeTruthy()
    expect(desktopNav.find((link) => link.textContent === "お問い合わせ")).toBeTruthy()
  })

  it("renders correct link destinations", () => {
    renderWithRouter(<Header />)

    const homeLink = screen.getAllByText("ホーム")[0].closest("a")
    const newsLink = screen.getAllByText("記事")[0].closest("a")
    const contactLink = screen.getAllByText("お問い合わせ")[0].closest("a")

    expect(homeLink).toHaveAttribute("href", "/")
    expect(newsLink).toHaveAttribute("href", "/article")
    expect(contactLink).toHaveAttribute("href", "/contact")
  })

  it("toggles mobile menu when clicking menu button", () => {
    renderWithRouter(<Header />)

    const menuButton = screen.getByLabelText("メニューを開く")

    // Initially should only show desktop navigation
    expect(screen.getAllByText("ホーム")).toHaveLength(1)

    // Click to open menu
    fireEvent.click(menuButton)

    // Mobile menu should now show, so we have both desktop and mobile navigation
    const allHomeLinks = screen.getAllByText("ホーム")
    expect(allHomeLinks).toHaveLength(2) // One for desktop, one for mobile

    // Click again to close menu
    fireEvent.click(menuButton)

    // Mobile menu should be closed, back to just desktop
    const homeLinks = screen.getAllByText("ホーム")
    expect(homeLinks).toHaveLength(1) // Only desktop nav visible
  })

  it("closes mobile menu on route change", async () => {
    renderWithRouter(<Header />)

    const menuButton = screen.getByLabelText("メニューを開く")

    // Open menu
    fireEvent.click(menuButton)
    expect(screen.getAllByText("ホーム")).toHaveLength(2)

    // Click on a link to trigger route change - this simulates navigation
    const mobileHomeLink = screen.getAllByText("ホーム")[1]
    fireEvent.click(mobileHomeLink)

    // Wait for the effect to close the menu
    await waitFor(() => {
      expect(screen.getAllByText("ホーム")).toHaveLength(1)
    })
  })
})
