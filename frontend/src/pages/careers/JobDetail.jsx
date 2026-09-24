import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getJobBySlug, submitApplication } from '../../lib/api'

export default function JobDetail() {
  const { slug } = useParams()
  const [job, setJob] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | notfound | error
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [resume, setResume] = useState(null)
  const [submitState, setSubmitState] = useState('idle') // idle | submitting | success | error

  useEffect(() => {
    getJobBySlug(slug)
      .then((res) => {
        setJob(res.data)
        setStatus('ready')
      })
      .catch((err) => setStatus(err.response?.status === 404 ? 'notfound' : 'error'))
  }, [slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!resume) return
    setSubmitState('submitting')
    const data = new FormData()
    data.append('job', job.id)
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('phone', form.phone)
    data.append('message', form.message)
    data.append('resume', resume)

    try {
      await submitApplication(data)
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  if (status === 'loading') return <p className="mx-auto max-w-3xl px-6 py-24 text-mist">Loading role…</p>
  if (status === 'notfound') {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Role not found</h1>
        <Link to="/careers" className="mt-4 inline-block text-gold">← Back to careers</Link>
      </section>
    )
  }
  if (status === 'error') {
    return <p className="mx-auto max-w-3xl px-6 py-24 text-mist">Couldn't load this role — is the backend running?</p>
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-gold">{job.department}</p>
      <h1 className="mt-3 font-display text-3xl font-semibold md:text-5xl">{job.title}</h1>
      <p className="mt-2 text-mist">{job.location} · {job.experience_level}</p>

      <p className="mt-8 text-mist">{job.description}</p>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-gold">Responsibilities</h2>
        <ul className="mt-2 list-inside list-disc text-sm text-mist">
          {job.responsibilities.split('\n').filter(Boolean).map((line) => <li key={line}>{line}</li>)}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-gold">Requirements</h2>
        <ul className="mt-2 list-inside list-disc text-sm text-mist">
          {job.requirements.split('\n').filter(Boolean).map((line) => <li key={line}>{line}</li>)}
        </ul>
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-graphite p-6">
        <h2 className="font-display text-lg font-semibold text-gold">Apply for this role</h2>

        {submitState === 'success' ? (
          <p className="mt-4 text-paper">Application received — we'll review it shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
            />
            <textarea
              placeholder="Message (optional)"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-white/10 bg-ink px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
            />
            <div>
              <label className="block text-sm text-mist">Resume (PDF)</label>
              <input
                required
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="mt-1 text-sm text-mist"
              />
            </div>
            <button
              type="submit"
              disabled={submitState === 'submitting'}
              className="rounded-full bg-gold px-8 py-3 font-medium text-ink transition hover:bg-gold-light disabled:opacity-60"
            >
              {submitState === 'submitting' ? 'Submitting…' : 'Submit application'}
            </button>
            {submitState === 'error' && <p className="text-sm text-red-400">Something went wrong — please try again.</p>}
          </form>
        )}
      </div>
    </article>
  )
}
