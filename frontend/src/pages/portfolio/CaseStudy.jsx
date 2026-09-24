import { useParams, Link } from 'react-router-dom'
import { getPortfolioBySlug } from '../../data/portfolio'
import { getServiceBySlug } from '../../data/services'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getPortfolioBySlug(slug)

  if (!project) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Case study not found</h1>
        <Link to="/portfolio" className="mt-4 inline-block text-gold">← Back to portfolio</Link>
      </section>
    )
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-gold">{project.industry}</p>
      <h1 className="mt-3 font-display text-3xl font-semibold md:text-5xl">{project.client}</h1>

      {project.interactive3D && (
        <div className="mt-8 flex h-64 items-center justify-center rounded-2xl border border-gold/30 bg-graphite text-sm text-gold">
          Interactive 3D case-study presentation goes here
        </div>
      )}

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-gold">Challenge</h2>
          <p className="mt-2 text-mist">{project.challenge}</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-gold">Solution</h2>
          <p className="mt-2 text-mist">{project.solutionSummary}</p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-gold">Technologies</h2>
          <p className="mt-2 text-sm text-mist">{project.technologies.join(', ')}</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-gold">Results</h2>
          <ul className="mt-2 list-inside list-disc text-sm text-mist">
            {project.results.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-lg font-semibold text-gold">Related services</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {project.services.map((s) => {
            const svc = getServiceBySlug(s)
            return svc ? (
              <Link key={s} to={`/services/${s}`} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-gold hover:text-gold">
                {svc.title}
              </Link>
            ) : null
          })}
        </div>
      </div>

      <div className="mt-16">
        <Link to="/contact" className="rounded-full bg-gold px-8 py-3 font-medium text-ink hover:bg-gold-light">
          Start a similar project
        </Link>
      </div>
    </article>
  )
}
