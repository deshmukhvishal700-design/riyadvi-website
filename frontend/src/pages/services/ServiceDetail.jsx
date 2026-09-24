import { useParams, Link } from 'react-router-dom'
import { getServiceBySlug } from '../../data/services'
import { getPortfolioBySlug, portfolio } from '../../data/portfolio'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Service not found</h1>
        <Link to="/services" className="mt-4 inline-block text-gold">← Back to services</Link>
      </section>
    )
  }

  const relatedProjects = portfolio.filter((p) => p.services.includes(service.slug)).slice(0, 3)

  return (
    <article className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-gold">Service</p>
      <h1 className="mt-3 font-display text-3xl font-semibold md:text-5xl">{service.title}</h1>
      <p className="mt-4 text-lg text-mist">{service.tagline}</p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-gold">The problem</h2>
          <p className="mt-2 text-mist">{service.problem}</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-gold">Our solution</h2>
          <p className="mt-2 text-mist">{service.solution}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-lg font-semibold text-gold">Key features</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {service.features.map((f) => (
            <li key={f} className="rounded-lg border border-white/10 px-4 py-3 text-sm text-paper">{f}</li>
          ))}
        </ul>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-gold">Industries</h2>
          <p className="mt-2 text-sm text-mist">{service.industries.join(', ')}</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-gold">Technology stack</h2>
          <p className="mt-2 text-sm text-mist">{service.stack.join(', ')}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-lg font-semibold text-gold">Process</h2>
        <ol className="mt-3 flex flex-wrap gap-3 text-sm text-mist">
          {service.process.map((step, i) => (
            <li key={step} className="rounded-full border border-white/10 px-4 py-2">
              {i + 1}. {step}
            </li>
          ))}
        </ol>
      </div>

      {relatedProjects.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-lg font-semibold text-gold">Related work</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {relatedProjects.map((p) => (
              <Link key={p.slug} to={`/portfolio/${p.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-gold hover:text-gold">
                {p.client}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16">
        <Link to="/contact" className="rounded-full bg-gold px-8 py-3 font-medium text-ink hover:bg-gold-light">
          Get a Quote
        </Link>
      </div>
    </article>
  )
}
