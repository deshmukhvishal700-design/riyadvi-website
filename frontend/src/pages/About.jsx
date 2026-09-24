import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { title: 'Technology expertise', desc: 'We stay hands-on with modern stacks, not just aware of them.' },
  { title: 'Business understanding', desc: 'Every technical decision is weighed against business impact.' },
  { title: 'Design excellence', desc: 'Interfaces should feel effortless, not just look polished.' },
  { title: 'Long-term partnership', desc: 'We build for what the business becomes, not just what it is today.' },
]

const milestones = [
  { year: '2021', label: 'Riyadvi founded', desc: 'Started as a small team focused on web development.' },
  { year: '2022', label: 'Expanded into app development', desc: 'Grew to serve clients across healthcare, retail, and D2C.' },
  { year: '2023', label: 'Added design & marketing services', desc: 'Became a full-service digital partner, not just a dev shop.' },
  { year: '2024', label: 'AR/VR & 3D modeling launched', desc: 'Started building immersive experiences for product and real estate clients.' },
  { year: 'Today', label: 'Technology & digital solutions partner', desc: 'Serving businesses end-to-end — strategy, design, development, growth.' },
]

export default function About() {
  const timelineRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })
    }, timelineRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-gold">Since 2021</p>
        <h1 className="mt-3 font-display text-3xl font-semibold md:text-5xl">
          A technology & digital solutions partner
        </h1>
        <p className="mt-6 text-mist">
          Riyadvi Software Technologies was founded on a simple belief: businesses don't need another
          vendor executing a spec — they need a partner who understands the business well enough to
          challenge the spec. We combine technology, design, and strategy into one team, so growth
          doesn't stall at the handoff between departments.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-graphite p-8">
            <h2 className="font-display text-xl font-semibold text-gold">Our vision</h2>
            <p className="mt-3 text-mist">
              To be the technology partner businesses turn to first when they're serious about growth —
              not just when they need a website.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-graphite p-8">
            <h2 className="font-display text-xl font-semibold text-gold">Our mission</h2>
            <p className="mt-3 text-mist">
              Combine technology, design, and business thinking into one accountable team, so every
              project we ship is judged by the outcome it drives — not just the features it ships with.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">What we value</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="border-l-2 border-gold/40 pl-5">
              <h3 className="font-display text-lg font-semibold text-paper">{v.title}</h3>
              <p className="mt-1 text-sm text-mist">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={timelineRef} className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Our journey</h2>
        <div className="relative mt-12 space-y-12 border-l border-white/10 pl-8">
          {milestones.map((m, i) => (
            <div key={m.year} ref={(el) => (itemRefs.current[i] = el)} className="relative">
              <div className="absolute -left-[calc(2rem+5px)] top-1 h-3 w-3 rounded-full bg-gold" />
              <p className="text-sm font-semibold text-gold">{m.year}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-paper">{m.label}</h3>
              <p className="mt-1 text-sm text-mist">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Let's build something that grows</h2>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/business-health-checkup" className="rounded-full bg-gold px-8 py-3 font-medium text-ink hover:bg-gold-light">
            Book a Free Consultation
          </Link>
          <Link to="/portfolio" className="rounded-full border border-white/20 px-8 py-3 font-medium hover:border-gold hover:text-gold">
            See our work
          </Link>
        </div>
      </section>
    </>
  )
}
