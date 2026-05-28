'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'slant'
  flip?: boolean
}

export function SectionDivider({ variant = 'wave', flip = false }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const pathProgress = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const wavePath = flip
    ? 'M0,100 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,0 L0,0 Z'
    : 'M0,0 C150,50 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z'

  const curvePath = flip
    ? 'M0,100 Q500,-50 1000,100 L1000,0 L0,0 Z'
    : 'M0,0 Q500,150 1000,0 L1000,100 L0,100 Z'

  const slantPath = flip
    ? 'M0,100 L1000,0 L1000,100 L0,100 Z'
    : 'M0,0 L1000,100 L1000,0 L0,0 Z'

  const paths: Record<string, string> = {
    wave: wavePath,
    curve: curvePath,
    slant: slantPath,
  }

  return (
    <div ref={ref} className="relative w-full h-24 overflow-hidden -mt-px">
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        style={{
          translateY: useTransform(
            scrollYProgress,
            [0, 0.5],
            [flip ? '-20%' : '20%', '0%'],
          ),
        }}
      >
        <motion.path
          d={paths[variant]}
          fill="var(--color-bg)"
          style={{ pathLength: pathProgress }}
          initial={{ pathLength: 1 }}
        />
      </motion.svg>
    </div>
  )
}
