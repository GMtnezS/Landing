'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactCard() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/xwvrblzv', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="card">
      <p className="text-xs text-[#888888] uppercase tracking-widest mb-1">Get In Touch</p>
      <p className="text-[#333333] mb-6">
        {/* Open to full-stack and backend roles. Remote only. */}
      </p>

      {status === 'success' && (
        <p className="text-[#7db8a0] mb-4">Message sent! I&apos;ll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 mb-4">
          Something went wrong. Try emailing me at{' '}
          <a href="mailto:gmtnezs@gmtnezschez.com" className="underline">
            gmtnezs@gmtnezschez.com
          </a>
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          required
          disabled={status === 'submitting'}
          className="w-full px-4 py-2 rounded-lg border border-[#e8e8e8] text-[#333333] placeholder:text-[#888888] focus:outline-none focus:border-[#5a9fb8] transition-colors disabled:opacity-60"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          disabled={status === 'submitting'}
          className="w-full px-4 py-2 rounded-lg border border-[#e8e8e8] text-[#333333] placeholder:text-[#888888] focus:outline-none focus:border-[#5a9fb8] transition-colors disabled:opacity-60"
        />
        <textarea
          name="message"
          placeholder="Message"
          required
          rows={5}
          disabled={status === 'submitting'}
          className="w-full px-4 py-2 rounded-lg border border-[#e8e8e8] text-[#333333] placeholder:text-[#888888] focus:outline-none focus:border-[#5a9fb8] transition-colors resize-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className="px-6 py-2 rounded-lg bg-[#2c5f7c] text-white text-sm hover:bg-[#5a9fb8] transition-colors self-start disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message →'}
        </button>
      </form>
    </div>
  )
}
