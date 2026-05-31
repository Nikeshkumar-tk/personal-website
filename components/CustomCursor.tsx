'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const HOVER_SELECTOR = 'a, button, [data-cursor-hover]'

// Touch detection via useSyncExternalStore — never changes after mount,
// so the subscribe callback is a no-op.
const noopSubscribe = () => () => {}
const getIsTouchSnapshot = () =>
  'ontouchstart' in window || navigator.maxTouchPoints > 0
const getIsTouchServerSnapshot = () => false

export function CustomCursor() {
  const isTouch = useSyncExternalStore(
    noopSubscribe,
    getIsTouchSnapshot,
    getIsTouchServerSnapshot,
  )
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 })

  useEffect(() => {
    if (isTouch) return

    let hidden = true

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (hidden) {
        hidden = false
        setIsHidden(false)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (target?.closest?.(HOVER_SELECTOR)) setIsHovering(true)
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (target?.closest?.(HOVER_SELECTOR)) setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isTouch, cursorX, cursorY])

  if (isTouch) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-[100] flex items-center justify-center"
      style={{
        left: springX,
        top: springY,
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        width: isHovering ? 64 : 24,
        height: isHovering ? 64 : 24,
        opacity: isHidden ? 0 : 1,
        borderColor: isHovering
          ? 'rgba(245, 158, 11, 0.5)'
          : 'rgba(255, 255, 255, 0.3)',
        backgroundColor: isHovering
          ? 'rgba(245, 158, 11, 0.1)'
          : 'rgba(255, 255, 255, 0)',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: 'inherit', backgroundColor: 'inherit' }}
      />
      <motion.span
        className="text-xs font-medium text-accent"
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        View
      </motion.span>
    </motion.div>
  )
}
