import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobs } from '../../lib/api'

export default function CareersIndex() {
  const [jobs, setJobs] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [department, setDepartment] = useState('All')

  useEffect(() => {
    getJobs()
      .then((res) => {
        setJobs(res.data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const departments = useMemo(() => ['All', ...new Set(jobs.map((j) => j.department))], [jobs])
  const filtered = department === 'All' ? jobs : jobs.filter((j) => j.department === department)

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="font-display text-3xl font-semibold md:text-5xl">Careers at Riyadvi</h1>
      <p className="mt-4 max-w-2xl text-mist">Join a team building technology and digital solutions that grow businesses.</p>

      {status === 'loading' && <p className="mt-10 text-mist">Loading open roles…</p>}
      {status === 'error' && (
        <p className="mt-10 text-mist">
          Couldn't load job listings right now — make sure the backend is running at the configured API URL.
        </p>
      )}

      {status === 'ready' && (
        <>
          <div className="mt-10 flex flex-wrap gap-2">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setDepartment(d)}
                className={`rounded-full border px-4 py-1.5 text-xs ${
                  department === d ? 'border-gold text-gold' : 'border-white/10 text-mist hover:border-white/30'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {filtered.map((job) => (
              <Link
                key={job.slug}
                to={`/careers/${job.slug}`}
                className="flex items-center justify-between py-5 transition hover:text-gold"
              >
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-mist">{job.department} · {job.location} · {job.experience_level}</p>
                </div>
                <span>→</span>
              </Link>
            ))}
            {filtered.length === 0 && <p className="py-6 text-mist">No open roles in this department right now.</p>}
          </div>
        </>
      )}
    </section>
  )
}
