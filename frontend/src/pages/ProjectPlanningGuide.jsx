import { useState } from 'react'
import { submitLeadMagnet } from '../lib/api'

const initialForm = { name: '', company: '', email: '', phone: '' }

export default function ProjectPlanningGuide() {
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState('submitting')
    try {
      await submitLeadMagnet(form)
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="rounded-2xl border border-gold/30 bg-graphite p-8 md:p-12">
        <p className="text-sm uppercase tracking-widest text-gold">Free resource</p>
        <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          Download Software Project Planning Guide
        </h1>
        <p className="mt-4 text-mist">
          A practical framework for scoping, budgeting, and de-risking your next software project —
          used internally by our own delivery team.
        </p>

        {state === 'success' ? (
          <div className="mt-8 rounded-xl border border-gold/40 bg-ink p-6 text-center">
            <p className="font-display text-lg text-gold">You're all set.</p>
            <p className="mt-2 text-sm text-mist">
              Check your inbox — we've sent the guide to your email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
            <input
              name="name" required placeholder="Full name *"
              value={form.name} onChange={handleChange}
              className="rounded-lg border border-white/10 bg-ink px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
            />
            <input
              name="company" placeholder="Company"
              value={form.company} onChange={handleChange}
              className="rounded-lg border border-white/10 bg-ink px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
            />
            <input
              name="email" type="email" required placeholder="Email *"
              value={form.email} onChange={handleChange}
              className="rounded-lg border border-white/10 bg-ink px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
            />
            <input
              name="phone" placeholder="Phone"
              value={form.phone} onChange={handleChange}
              className="rounded-lg border border-white/10 bg-ink px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
            />
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={state === 'submitting'}
                className="rounded-full bg-gold px-8 py-3 font-medium text-ink transition hover:bg-gold-light disabled:opacity-60"
              >
                {state === 'submitting' ? 'Submitting…' : 'Get the guide'}
              </button>
              {state === 'error' && <p className="mt-3 text-sm text-red-400">Something went wrong — please try again.</p>}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
