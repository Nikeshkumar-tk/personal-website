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
      <div className="absolute -left-[37px] top-2 z-10 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg sm:-left-[45px] sm:h-4 sm:w-4" />
      <div className="space-y-1">
        <span className="font-mono text-xs font-medium text-accent sm:text-sm">
          {step.year}
        </span>
        <h3 className="text-lg font-semibold text-heading sm:text-xl">{step.title}</h3>
        <p className="text-sm text-muted">{step.company}</p>
        <p className="max-w-md pt-1 text-sm leading-relaxed text-body">
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
      style={{ height: `${steps.length * 75 + 50}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <ScrollReveal>
            <h2 className="mb-4 text-xxl font-bold tracking-tight text-heading">
              Career Journey
            </h2>
            <p className="mb-10 max-w-lg text-base text-muted sm:mb-16 sm:text-lg">
              A timeline of where I&apos;ve been and what I&apos;ve built along the way.
            </p>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute bottom-0 left-[6px] top-0 w-px bg-border sm:left-[7px]">
              <motion.div
                className="absolute left-0 top-0 w-full bg-accent"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-12 pl-10 sm:space-y-16 sm:pl-12">
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
