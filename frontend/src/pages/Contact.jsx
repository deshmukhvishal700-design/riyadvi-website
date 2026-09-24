import { useState } from 'react'
import { submitContact } from '../lib/api'

const initialForm = { name: '', email: '', phone: '', company: '', requirement: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState('idle') // idle | submitting | success | error
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState('submitting')
    setErrors({})
    try {
      await submitContact(form)
      setState('success')
      setForm(initialForm)
    } catch (err) {
      setState('error')
      if (err.response?.data) setErrors(err.response.data)
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-gold">Get in touch</p>
      <h1 className="mt-3 font-display text-3xl font-semibold md:text-5xl">Contact us</h1>
      <p className="mt-4 text-mist">
        Tell us about your project and we'll get back to you within one business day.
      </p>

      {state === 'success' ? (
        <div className="mt-10 rounded-2xl border border-gold/30 bg-graphite p-8 text-center">
          <p className="font-display text-xl text-gold">Thank you — your message has been sent.</p>
          <p className="mt-2 text-mist">We'll be in touch shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required />
          <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />
          <Field label="Company" name="company" value={form.company} onChange={handleChange} error={errors.company} />
          <div className="sm:col-span-2">
            <Field label="Requirement" name="requirement" value={form.requirement} onChange={handleChange} error={errors.requirement} placeholder="e.g. Web Development, App Development..." />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-mist">Message *</label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-white/10 bg-graphite px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
            />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message[0]}</p>}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="rounded-full bg-gold px-8 py-3 font-medium text-ink transition hover:bg-gold-light disabled:opacity-60"
            >
              {state === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
            {state === 'error' && !Object.keys(errors).length && (
              <p className="mt-3 text-sm text-red-400">Something went wrong — please try again.</p>
            )}
          </div>
        </form>
      )}
    </section>
  )
}

function Field({ label, name, value, onChange, type = 'text', error, required, placeholder }) {
  return (
    <div>
      <label className="block text-sm text-mist">{label}{required && ' *'}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-lg border border-white/10 bg-graphite px-4 py-2 text-sm text-paper focus:border-gold focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error[0]}</p>}
    </div>
  )
}
