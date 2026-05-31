'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'

const columns = 24

const symbols = '01{}[]()<>=+*/-_#@$%&!?;:.,^~|\\'

const bracketParticles = [
  { char: '{ }', x: 5, y: 15, delay: 0, duration: 14, size: 28 },
  { char: '</>', x: 15, y: 30, delay: 2, duration: 16, size: 24 },
  { char: '[ ]', x: 25, y: 70, delay: 4, duration: 13, size: 22 },
  { char: '()', x: 45, y: 25, delay: 1, duration: 18, size: 20 },
  { char: '=>', x: 65, y: 55, delay: 3, duration: 15, size: 26 },
  { char: 'fn()', x: 78, y: 18, delay: 5, duration: 17, size: 22 },
  { char: '{ }', x: 88, y: 65, delay: 2.5, duration: 14, size: 24 },
  { char: '[...]', x: 55, y: 80, delay: 0.8, duration: 16, size: 20 },
  { char: '??', x: 35, y: 48, delay: 3.5, duration: 19, size: 18 },
  { char: '</>', x: 72, y: 38, delay: 1.7, duration: 15, size: 24 },
]

function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number | null = null
    let isVisible = true
    const drops: { x: number; y: number; speed: number; chars: string[] }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < columns; i++) {
      const colWidth = canvas.width / columns
      drops.push({
        x: colWidth * i + colWidth / 2,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.7,
        chars: Array.from({ length: 8 + Math.floor(Math.random() * 12) }, () =>
          symbols[Math.floor(Math.random() * symbols.length)],
        ),
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = '12px var(--font-mono, monospace)'

      for (const drop of drops) {
        drop.y += drop.speed
        if (drop.y > canvas.height + 100) {
          drop.y = -100
          drop.chars = Array.from(
            { length: 8 + Math.floor(Math.random() * 12) },
            () => symbols[Math.floor(Math.random() * symbols.length)],
          )
        }

        for (let j = 0; j < drop.chars.length; j++) {
          const charY = drop.y - j * 16
          if (charY < -20 || charY > canvas.height + 20) continue

          const alpha = 1 - j / drop.chars.length
          const color = j === 0 ? '245, 158, 11' : '161, 161, 170'
          ctx.fillStyle = `rgba(${color}, ${(alpha * 0.08).toFixed(3)})`
          ctx.fillText(drop.chars[j], drop.x, charY)
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    const start = () => {
      if (animationId == null) draw()
    }
    const stop = () => {
      if (animationId != null) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    }

    // Pause when scrolled off-screen — the canvas is anchored to the hero,
    // so once you've moved past it the rAF loop is pure waste.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) start()
        else stop()
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    // Also pause when the tab is hidden
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (isVisible) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    start()

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

function BracketParticle({
  char,
  x,
  y,
  delay,
  duration,
  size,
}: {
  char: string
  x: number
  y: number
  delay: number
  duration: number
  size: number
}) {
  return (
    <motion.span
      className="absolute select-none font-mono text-muted"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        fontSize: size,
        opacity: 0.025,
      }}
      animate={{
        y: [0, -40, 0, 30, 0],
        x: [0, 20, -15, 10, 0],
        rotate: [0, 5, -3, 8, 0],
        opacity: [0.025, 0.04, 0.025, 0.035, 0.025],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {char}
    </motion.span>
  )
}

function subscribeMatchMedia(query: string) {
  return (callback: () => void) => {
    const mq = window.matchMedia(query)
    mq.addEventListener('change', callback)
    return () => mq.removeEventListener('change', callback)
  }
}

function getMatchMediaSnapshot(query: string) {
  return () => window.matchMedia(query).matches
}

// Stable references — useSyncExternalStore requires identity-stable args
const subscribeDesktop = subscribeMatchMedia('(min-width: 640px)')
const getDesktopSnapshot = getMatchMediaSnapshot('(min-width: 640px)')
const getDesktopServerSnapshot = () => false

export function CodeBackground() {
  // Canvas rain burns battery on mobile and is invisible at scale-down.
  // Render guide grid + bracket particles always; skip rain below 640px.
  const enableRain = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot,
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dot grid — architectural blueprint feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-accent) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Architectural guide lines */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute left-[10%] top-0 h-full w-px bg-accent" />
        <div className="absolute left-[25%] top-0 h-full w-px bg-accent" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-accent" />
        <div className="absolute left-[75%] top-0 h-full w-px bg-accent" />
        <div className="absolute left-[90%] top-0 h-full w-px bg-accent" />
        <div className="absolute left-0 top-[20%] h-px w-full bg-accent" />
        <div className="absolute left-0 top-[40%] h-px w-full bg-accent" />
        <div className="absolute left-0 top-[60%] h-px w-full bg-accent" />
        <div className="absolute left-0 top-[80%] h-px w-full bg-accent" />
      </div>

      {enableRain && <CodeRain />}

      {bracketParticles.map((p, i) => (
        <BracketParticle key={i} {...p} />
      ))}
    </div>
  )
}
