import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold text-paper">
              RIYADVI<span className="text-gold">.</span>
            </p>
            <p className="mt-3 text-sm text-mist">
              Technology & digital solutions partner — since 2021.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-mist">
              <li><Link to="/about" className="hover:text-gold">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-gold">Portfolio</Link></li>
              <li><Link to="/careers" className="hover:text-gold">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-gold">Blog</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">Services</p>
            <ul className="mt-3 space-y-2 text-sm text-mist">
              <li><Link to="/services/web-development" className="hover:text-gold">Web Development</Link></li>
              <li><Link to="/services/app-development" className="hover:text-gold">App Development</Link></li>
              <li><Link to="/services/ui-ux-design" className="hover:text-gold">UI/UX Design</Link></li>
              <li><Link to="/services" className="hover:text-gold">All services →</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-paper">Get started</p>
            <ul className="mt-3 space-y-2 text-sm text-mist">
              <li><Link to="/contact" className="hover:text-gold">Contact us</Link></li>
              <li><Link to="/business-health-checkup" className="hover:text-gold">Business Health Checkup</Link></li>
              <li><Link to="/software-project-planning-guide" className="hover:text-gold">Project Planning Guide</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-mist/70">
          © {new Date().getFullYear()} Riyadvi Software Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
