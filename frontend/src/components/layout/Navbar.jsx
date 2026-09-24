import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg font-semibold tracking-wide text-paper">
          RIYADVI<span className="text-gold">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-gold ${isActive ? 'text-gold' : 'text-mist'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/business-health-checkup"
            className="rounded-full border border-gold px-5 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Book a Consultation
          </Link>
        </div>

        <button
          className="text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm text-mist hover:text-gold"
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/business-health-checkup"
              onClick={() => setOpen(false)}
              className="rounded-full border border-gold px-5 py-2 text-center text-sm font-medium text-gold"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
