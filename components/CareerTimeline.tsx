'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import type { CareerStep as CareerStepType } from '@/lib/types'

interface CareerTimelineProps {
  steps: CareerStepType[]
}

function CareerStepItem({
  step,
  index,
  total,
  scrollYProgress,
}: {
  step: CareerStepType
  index: number
  total: number
  scrollYProgress: any
}) {
  const stepSize = 1 / total
  const center = (index + 0.5) * stepSize
  const fadeIn = center - stepSize * 0.35
  const fadeOut = center + stepSize * 0.35

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, fadeIn), center, Math.min(1, fadeOut)],
    [0.15, 1, 0.15],
  )

  return (
    <motion.div style={{ opacity }} className="relative">
      <div className="absolute -left-[45px] top-2 w-4 h-4 rounded-full border-2 border-accent bg-bg z-10" />
      <div className="space-y-1">
        <span className="text-accent font-mono text-sm font-medium">
          {step.year}
        </span>
        <h3 className="text-xl font-semibold text-heading">{step.title}</h3>
        <p className="text-sm text-muted">{step.company}</p>
        <p className="text-sm text-body leading-relaxed max-w-md pt-1">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export function CareerTimeline({ steps }: CareerTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="career"
      ref={containerRef}
      className="relative"
      style={{ height: `${steps.length * 100 + 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-6xl w-full px-6">
          <ScrollReveal>
            <h2 className="text-xxl font-bold text-heading tracking-tight mb-4">
              Career Journey
            </h2>
            <p className="text-muted text-lg max-w-lg mb-16">
              A timeline of where I&apos;ve been and what I&apos;ve built along the way.
            </p>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border">
              <motion.div
                className="absolute top-0 left-0 w-full bg-accent"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-16 pl-12">
              {steps.map((step, i) => (
                <CareerStepItem
                  key={step.year}
                  step={step}
                  index={i}
                  total={steps.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
