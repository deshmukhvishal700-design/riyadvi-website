import { useState } from 'react'
import { submitHealthCheckup } from '../lib/api'

const initialForm = {
  business_name: '', contact_name: '', email: '', phone: '', industry: '',
  has_website: false, website_url: '',
  marketing_channels: '',
  current_tech_stack: '',
  challenges: '',
}

const stepFields = [
  ['business_name', 'contact_name', 'email', 'phone', 'industry'],
  ['has_website', 'website_url'],
  ['marketing_channels'],
  ['current_tech_stack'],
  ['challenges'],
]

const stepTitles = [
  'Business Information',
  'Website & Digital Presence',
  'Marketing',
  'Technology',
  'Business Challenges',
]

export default function BusinessHealthCheckup() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState('idle') // idle | submitting | success | error
  const totalSteps = stepTitles.length

  const update = (name, value) => setForm({ ...form, [name]: value })

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState('submitting')
    try {
      await submitHealthCheckup(form)
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-gold">Submitted</p>
        <h1 className="mt-3 font-display text-3xl font-semibold">Thank you, {form.contact_name || 'there'}.</h1>
        <p className="mt-4 text-mist">
          We're reviewing your responses and will follow up with a tailored digital growth plan.
        </p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-gold">Business Health Checkup</p>
      <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
        Is Your Business Ready for Its Next Digital Growth Stage?
      </h1>

      {/* Step progress */}
      <div className="mt-10 flex items-center gap-2">
        {stepTitles.map((title, i) => (
          <div key={title} className="flex-1">
            <div className={`h-1 rounded-full ${i <= step ? 'bg-gold' : 'bg-white/10'}`} />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs uppercase tracking-wider text-mist">
        Step {step + 1} of {totalSteps} — {stepTitles[step]}
      </p>

      <form onSubmit={step === totalSteps - 1 ? handleSubmit : (e) => { e.preventDefault(); next() }} className="mt-8 space-y-5">
        {step === 0 && (
          <>
            <TextField label="Business name *" value={form.business_name} onChange={(v) => update('business_name', v)} required />
            <TextField label="Your name *" value={form.contact_name} onChange={(v) => update('contact_name', v)} required />
            <TextField label="Email *" type="email" value={form.email} onChange={(v) => update('email', v)} required />
            <TextField label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
            <TextField label="Industry" value={form.industry} onChange={(v) => update('industry', v)} />
          </>
        )}

        {step === 1 && (
          <>
            <label className="flex items-center gap-3 text-sm text-paper">
              <input
                type="checkbox"
                checked={form.has_website}
                onChange={(e) => update('has_website', e.target.checked)}
                className="h-4 w-4 accent-[#D4AF37]"
              />
              We currently have a website
            </label>
            {form.has_website && (
              <TextField label="Website URL" type="url" value={form.website_url} onChange={(v) => update('website_url', v)} placeholder="https://" />
            )}
          </>
        )}

        {step === 2 && (
          <TextArea
            label="What marketing channels do you currently use?"
            value={form.marketing_channels}
            onChange={(v) => update('marketing_channels', v)}
            placeholder="e.g. Instagram ads, Google Ads, referrals, none yet..."
          />
        )}

        {step === 3 && (
          <TextArea
            label="What does your current technology stack look like?"
            value={form.current_tech_stack}
            onChange={(v) => update('current_tech_stack', v)}
            placeholder="e.g. WordPress site, spreadsheets for tracking, no CRM..."
          />
        )}

        {step === 4 && (
          <TextArea
            label="What's the biggest challenge holding your business back digitally?"
            value={form.challenges}
            onChange={(v) => update('challenges', v)}
            rows={5}
          />
        )}

        <div className="flex items-center justify-between pt-4">
          {step > 0 ? (
            <button type="button" onClick={back} className="text-sm text-mist hover:text-paper">
              ← Back
            </button>
          ) : <span />}

          <button
            type="submit"
            disabled={state === 'submitting'}
            className="rounded-full bg-gold px-8 py-3 font-medium text-ink transition hover:bg-gold-light disabled:opacity-60"
          >
            {step === totalSteps - 1
              ? (state === 'submitting' ? 'Submitting…' : 'Submit')
              : 'Continue →'}
          </button>
        </div>

        {state === 'error' && <p className="text-sm text-red-400">Something went wrong — please try again.</p>}
      </form>
    </section>
  )
}

function TextField({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <div>
      <label className="block text-sm text-mist">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-white/10 bg-graphite px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
      />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div>
      <label className="block text-sm text-mist">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-white/10 bg-graphite px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
      />
    </div>
  )
}
