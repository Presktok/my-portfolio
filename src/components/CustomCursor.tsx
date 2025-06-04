'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const trailPosition = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorTrail = cursorTrailRef.current
    const cursorRing = cursorRingRef.current
    if (!cursor || !cursorTrail || !cursorRing) return

    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      
      // Handle magnetic effect for interactive elements
      const interactiveElement = (e.target as HTMLElement).closest('a, button, input, textarea, .trading-card') as HTMLElement
      if (interactiveElement) {
        if (!isHovering.current) {
          isHovering.current = true
          cursor.classList.add('cursor-hovering')
          cursorRing.classList.add('ring-hovering')
        }
        
        const rect = interactiveElement.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const strength = 0.3
        
        mousePosition.current = {
          x: centerX + (e.clientX - centerX) * strength,
          y: centerY + (e.clientY - centerY) * strength
        }
      } else if (isHovering.current) {
        isHovering.current = false
        cursor.classList.remove('cursor-hovering')
        cursorRing.classList.remove('ring-hovering')
      }
    }

    const onMouseEnter = () => {
      cursor.style.opacity = '1'
      cursorTrail.style.opacity = '1'
      cursorRing.style.opacity = '1'
    }

    const onMouseLeave = () => {
      cursor.style.opacity = '0'
      cursorTrail.style.opacity = '0'
      cursorRing.style.opacity = '0'
    }

    // Smooth animation
    const animate = () => {
      // Smooth cursor movement
      const ease = 0.15
      
      currentPosition.current = {
        x: currentPosition.current.x + (mousePosition.current.x - currentPosition.current.x) * ease,
        y: currentPosition.current.y + (mousePosition.current.y - currentPosition.current.y) * ease
      }

      // Trail follows with delay
      const trailEase = 0.08
      trailPosition.current = {
        x: trailPosition.current.x + (currentPosition.current.x - trailPosition.current.x) * trailEase,
        y: trailPosition.current.y + (currentPosition.current.y - trailPosition.current.y) * trailEase
      }

      // Update cursor positions
      cursor.style.transform = `translate(${currentPosition.current.x}px, ${currentPosition.current.y}px)`
      cursorTrail.style.transform = `translate(${trailPosition.current.x}px, ${trailPosition.current.y}px)`
      cursorRing.style.transform = `translate(${currentPosition.current.x}px, ${currentPosition.current.y}px)`

      requestAnimationFrame(animate)
    }

    // Hide default cursor
    document.documentElement.style.cursor = 'none'
    document.body.style.cursor = 'none'

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.style.cursor = ''
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor-dot pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300 ease-out"
      />
      <div
        ref={cursorTrailRef}
        className="cursor-trail pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300 ease-out"
      />
      <div
        ref={cursorRingRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-50 transition-opacity duration-300 ease-out"
      />
    </>
  )
} 