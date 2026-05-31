'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { submitContact } from '@/app/actions'
import type { ContactFormState, SocialLink } from '@/lib/types'

interface ContactSectionProps {
  email: string
  socials: SocialLink[]
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <motion.button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-6 rounded-button bg-accent text-bg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
      whileHover={{ scale: pending ? 1 : 1.02 }}
      whileTap={{ scale: pending ? 1 : 0.98 }}
      data-cursor-hover
    >
      {pending ? 'Sending...' : 'Send Message'}
    </motion.button>
  )
}

const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
}

export function ContactSection({ email, socials }: ContactSectionProps) {
  const [state, formAction] = useActionState<ContactFormState | null, FormData>(
    submitContact,
    null,
  )

  return (
    <section id="contact" className="px-5 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-4 text-xxl font-bold tracking-tight text-heading">
            Reach Out
          </h2>
          <p className="mb-10 max-w-lg text-base text-muted sm:mb-16 sm:text-lg">
            Got a project in mind? Want to collaborate? Or just want to say hi? I&apos;d love to hear from you.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <ScrollReveal>
              <form id="contact-form" action={formAction} className="space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Your name"
                    className="peer w-full bg-transparent border border-border rounded-card px-4 py-3 text-heading text-sm placeholder-transparent focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-3 -top-2.5 text-xs text-muted bg-bg px-1 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-muted peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-bg"
                  >
                    Your name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="your@email.com"
                    className="peer w-full bg-transparent border border-border rounded-card px-4 py-3 text-heading text-sm placeholder-transparent focus:outline-none focus:border-accent/50 transition-colors"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 -top-2.5 text-xs text-muted bg-bg px-1 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-muted peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-bg"
                  >
                    your@email.com
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="peer w-full bg-transparent border border-border rounded-card px-4 py-3 text-heading text-sm placeholder-transparent focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-3 -top-2.5 text-xs text-muted bg-bg px-1 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-muted peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-bg"
                  >
                    Tell me about your project...
                  </label>
                </div>

                <AnimatePresence>
                  {state && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`text-sm p-3 rounded-card ${
                        state.success
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {state.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <SubmitButton />
              </form>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-widest text-muted">
                  Socials
                </h3>
                <div className="space-y-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.icon === 'email' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted hover:text-heading transition-colors group"
                      data-cursor-hover
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg border border-border group-hover:border-accent/30 transition-colors">
                        {socialIcons[social.icon]}
                      </span>
                      <span className="text-sm">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-widest text-muted">
                  Email directly
                </h3>
                <a
                  href={`mailto:${email}`}
                  className="break-all text-base font-medium text-heading transition-colors hover:text-accent sm:text-lg"
                  data-cursor-hover
                >
                  {email}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
