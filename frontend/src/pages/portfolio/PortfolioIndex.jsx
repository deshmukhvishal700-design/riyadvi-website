import { Link } from 'react-router-dom'
import { portfolio } from '../../data/portfolio'

export default function PortfolioIndex() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-display text-3xl font-semibold md:text-5xl">Our work</h1>
      <p className="mt-4 max-w-2xl text-mist">Real projects, real outcomes, across industries.</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.map((p) => (
          <Link
            key={p.slug}
            to={`/portfolio/${p.slug}`}
            className="group rounded-2xl border border-white/10 bg-graphite p-6 transition hover:border-gold"
          >
            <p className="text-xs uppercase tracking-wider text-mist">{p.industry}</p>
            <h2 className="mt-2 font-display text-lg font-semibold group-hover:text-gold">{p.client}</h2>
            {p.interactive3D && (
              <span className="mt-3 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">
                Interactive 3D case study
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
