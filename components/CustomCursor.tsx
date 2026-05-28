'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [isTouch, setIsTouch] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (isHidden) setIsHidden(false)
    },
    [cursorX, cursorY, isHidden],
  )

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor-hover]',
    )
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    const observer = new MutationObserver(() => {
      const updated = document.querySelectorAll(
        'a, button, [data-cursor-hover]',
      )
      updated.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

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
        className="rounded-full border absolute inset-0"
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
