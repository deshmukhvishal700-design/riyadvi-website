import { Link } from 'react-router-dom'
import { services } from '../../data/services'

export default function ServicesIndex() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-display text-3xl font-semibold md:text-5xl">Our services</h1>
      <p className="mt-4 max-w-2xl text-mist">
        Six core capabilities, one team — technology, design, and strategy working together.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group rounded-2xl border border-white/10 bg-graphite p-6 transition hover:border-gold"
          >
            <h2 className="font-display text-lg font-semibold text-paper group-hover:text-gold">
              {service.title}
            </h2>
            <p className="mt-2 text-sm text-mist">{service.tagline}</p>
            <span className="mt-4 inline-block text-sm text-gold opacity-0 transition group-hover:opacity-100">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
