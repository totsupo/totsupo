import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import NewsPage from "./pages/NewsPage"
import ContactPage from "./pages/ContactPage"
import NewsDetailPage from "./pages/NewsDetailPage"

function App() {
  const location = useLocation()

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article" element={<NewsPage />} />
        <Route path="/article/:slug" element={<NewsDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
