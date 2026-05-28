'use client'

import { useEffect, useRef } from 'react'
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

    let animationId: number
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

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
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
      className="absolute text-muted select-none font-mono"
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

export function CodeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <div className="absolute top-0 left-[10%] w-px h-full bg-accent" />
        <div className="absolute top-0 left-[25%] w-px h-full bg-accent" />
        <div className="absolute top-0 left-[50%] w-px h-full bg-accent" />
        <div className="absolute top-0 left-[75%] w-px h-full bg-accent" />
        <div className="absolute top-0 left-[90%] w-px h-full bg-accent" />
        <div className="absolute top-[20%] left-0 w-full h-px bg-accent" />
        <div className="absolute top-[40%] left-0 w-full h-px bg-accent" />
        <div className="absolute top-[60%] left-0 w-full h-px bg-accent" />
        <div className="absolute top-[80%] left-0 w-full h-px bg-accent" />
      </div>

      {/* Falling code rain */}
      <CodeRain />

      {/* Floating bracket particles */}
      {bracketParticles.map((p, i) => (
        <BracketParticle key={i} {...p} />
      ))}
    </div>
  )
}
