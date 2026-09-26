import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import useLenis from '../../hooks/useLenis'

export default function Layout() {
  useLenis()

  return (
    <div className="flex min-h-screen flex-col bg-ink text-paper">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
