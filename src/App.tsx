import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'
import EventsPage from './pages/EventsPage'
import SpotsPage from './pages/SpotsPage'
import FoodPage from './pages/FoodPage'
import ContactPage from './pages/ContactPage'
import NewsDetailPage from './pages/NewsDetailPage'
import EventDetailPage from './pages/EventDetailPage'
import SpotDetailPage from './pages/SpotDetailPage'
import FoodDetailPage from './pages/FoodDetailPage'

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
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/spots" element={<SpotsPage />} />
        <Route path="/spots/:id" element={<SpotDetailPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/food/:id" element={<FoodDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
