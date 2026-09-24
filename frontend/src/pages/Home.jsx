import Hero3D from '../components/three/Hero3D'
import DigitalTransformationSection from '../components/sections/DigitalTransformationSection'
import { services } from '../data/services'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center overflow-hidden px-6 md:flex-row md:justify-between">
        <div className="z-10 max-w-xl text-center md:text-left">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Technology & Digital Solutions Partner</p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-6xl">
            Custom Software & Digital Solutions to <span className="text-gold">Grow Your Business</span>
          </h1>
          <p className="mt-6 text-mist">
            Web & App Development, UI/UX Design, and Business Strategy — all tailored to your needs.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Link to="/business-health-checkup" className="rounded-full bg-gold px-8 py-3 font-medium text-ink transition hover:bg-gold-light">
              Book a Free Consultation
            </Link>
            <Link to="/services" className="rounded-full border border-white/20 px-8 py-3 font-medium text-paper transition hover:border-gold hover:text-gold">
              Explore Our Solutions
            </Link>
          </div>
        </div>

        <div className="mt-12 h-[380px] w-full md:mt-0 md:h-[520px] md:w-[520px]">
          <Hero3D />
        </div>
      </section>

      <DigitalTransformationSection />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-sm uppercase tracking-widest text-gold">What we do</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Our services</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group rounded-2xl border border-white/10 bg-graphite p-6 transition hover:border-gold"
            >
              <h3 className="font-display text-lg font-semibold group-hover:text-gold">{service.title}</h3>
              <p className="mt-2 text-sm text-mist">{service.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-gold">Since 2021</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          A technology partner, not just a vendor
        </h2>
        <p className="mt-4 text-mist">
          We combine technology expertise, design excellence, and business understanding to help
          companies grow — not just ship software.
        </p>
        <Link to="/about" className="mt-8 inline-block rounded-full border border-gold px-8 py-3 font-medium text-gold hover:bg-gold hover:text-ink">
          Learn about Riyadvi
        </Link>
      </section>
    </>
  )
}
