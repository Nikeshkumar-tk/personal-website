'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { CodeBackground } from './CodeBackground'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

interface HeroSectionProps {
  name: string
  tagline: string
}

export function HeroSection({ name, tagline }: HeroSectionProps) {
  const [displayTagline, setDisplayTagline] = useState('')
  const [isAnimating, setIsAnimating] = useState(true)
  const iterationsRef = useRef(0)

  useEffect(() => {
    if (!isAnimating) return

    let interval: ReturnType<typeof setInterval>
    let timeout: ReturnType<typeof setTimeout>

    const startScramble = () => {
      interval = setInterval(() => {
        setDisplayTagline(
          tagline
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < iterationsRef.current) return tagline[i]
              return letters[Math.floor(Math.random() * letters.length)]
            })
            .join(''),
        )
      }, 40)

      timeout = setTimeout(() => {
        iterationsRef.current += 1
        if (iterationsRef.current > tagline.length) {
          clearInterval(interval)
          setDisplayTagline(tagline)
          setIsAnimating(false)
        } else {
          clearInterval(interval)
          startScramble()
        }
      }, 60)
    }

    startScramble()

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [tagline, isAnimating])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-16">
      <CodeBackground />

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <ScrollReveal>
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Hello, I&apos;m
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-hero font-bold text-heading tracking-tight">
            {name.split(' ').map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-xl sm:text-2xl text-muted font-mono h-8">
            {displayTagline}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-[2px] h-[1.2em] bg-accent ml-0.5 align-middle"
            />
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="pt-4 flex items-center justify-center gap-4">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
            >
              Get in touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-button border border-border text-heading font-medium text-sm hover:bg-surface transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
            >
              Read my blog
            </motion.a>
          </div>
        </ScrollReveal>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
