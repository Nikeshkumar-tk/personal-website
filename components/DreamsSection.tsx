'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import type { Dream } from '@/lib/types'

interface DreamsSectionProps {
  dreams: Dream[]
}

function DreamCard({ dream, index }: { dream: Dream; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 10
    const y = (e.clientY - rect.top - rect.height / 2) / -10
    cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }

  const spanClasses: Record<string, string> = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 row-span-1 sm:col-span-1 sm:row-span-2',
    lg: 'col-span-2 row-span-1',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={spanClasses[dream.span]}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full rounded-card border border-border bg-surface p-6 transition-shadow duration-300 hover:border-accent/30"
        style={{ transition: 'transform 0.1s ease-out, border-color 0.3s ease' }}
        data-cursor-hover
      >
        <span className="text-3xl mb-4 block">{dream.emoji}</span>
        <h3 className="text-lg font-semibold text-heading mb-2">{dream.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{dream.description}</p>
      </div>
    </motion.div>
  )
}

export function DreamsSection({ dreams }: DreamsSectionProps) {
  return (
    <section id="dreams" className="py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-xxl font-bold text-heading tracking-tight mb-4">
            What I Dream About
          </h2>
          <p className="text-muted text-lg max-w-lg mb-16">
            The big ideas that keep me up at night. The problems I want to solve before I&apos;m done.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 auto-rows-[180px] gap-4">
          {dreams.map((dream, i) => (
            <DreamCard key={dream.title} dream={dream} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
