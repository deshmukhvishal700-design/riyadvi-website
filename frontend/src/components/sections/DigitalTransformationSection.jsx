import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { label: 'Business Challenge', desc: 'We start by understanding what\u2019s actually limiting growth.' },
  { label: 'Strategy', desc: 'A prioritized plan mapped to business outcomes, not just features.' },
  { label: 'Design', desc: 'Interfaces and experiences built around real user behavior.' },
  { label: 'Technology', desc: 'The right stack for scale, not just for launch day.' },
  { label: 'Launch', desc: 'Shipped with monitoring, analytics, and a rollback plan.' },
  { label: 'Growth', desc: 'Continuous iteration based on real usage data.' },
]

export default function DigitalTransformationSection() {
  const sectionRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0.25, x: -24 },
          {
            opacity: 1,
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'top 40%',
              scrub: true,
            },
          }
        )
      })

      gsap.fromTo(
        '.progress-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-gold">Our approach</p>
      <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
        From business challenge to sustained growth
      </h2>

      <div className="relative mt-16">
        <div className="absolute left-3 top-0 h-full w-px bg-white/10">
          <div className="progress-line-fill h-full w-full origin-top bg-gold" />
        </div>

        <div className="space-y-14">
          {steps.map((step, i) => (
            <div
              key={step.label}
              ref={(el) => (itemRefs.current[i] = el)}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-2 border-gold bg-ink text-center text-xs leading-5 text-gold">
                {i + 1}
              </div>
              <h3 className="font-display text-xl font-semibold text-paper">{step.label}</h3>
              <p className="mt-1 text-mist">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
