'use client'

import { useEffect, useRef } from 'react'

export default function RoboCursor() {
  const roboRef = useRef<HTMLDivElement>(null)
  const displayRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const currentPosition = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const isMoving = useRef(false)
  const moveTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const robo = roboRef.current
    const display = displayRef.current
    const dots = dotsRef.current
    if (!robo || !display || !dots) return

    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      
      // Handle hover effect for interactive elements
      const interactiveElement = (e.target as HTMLElement).closest('a, button, input, textarea, .trading-card') as HTMLElement
      if (interactiveElement) {
        if (!isHovering.current) {
          isHovering.current = true
          robo.classList.add('robo-scanning')
          dots.classList.add('dots-active')
        }
      } else if (isHovering.current) {
        isHovering.current = false
        robo.classList.remove('robo-scanning')
        dots.classList.remove('dots-active')
      }

      // Set moving state
      if (!isMoving.current) {
        isMoving.current = true
        robo.classList.add('robo-moving')
      }

      // Clear previous timeout
      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current)
      }

      // Set timeout to remove moving state
      moveTimeout.current = setTimeout(() => {
        isMoving.current = false
        robo.classList.remove('robo-moving')
      }, 100)

      // Calculate tilt based on movement
      const speed = Math.sqrt(
        Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2)
      )
      const maxTilt = 15
      const tiltX = (e.movementY / speed) * maxTilt
      const tiltY = -(e.movementX / speed) * maxTilt
      
      if (speed > 0.1) {
        robo.style.transform = `
          translate(${currentPosition.current.x - 30}px, ${currentPosition.current.y - 80}px)
          rotateX(${tiltX}deg) rotateY(${tiltY}deg)
        `
      }
    }

    const onMouseEnter = () => {
      robo.style.opacity = '1'
    }

    const onMouseLeave = () => {
      robo.style.opacity = '0'
    }

    // Smooth animation
    const animate = () => {
      const ease = 0.1
      
      // Calculate new position with easing
      currentPosition.current = {
        x: currentPosition.current.x + (mousePosition.current.x - currentPosition.current.x) * ease,
        y: currentPosition.current.y + (mousePosition.current.y - currentPosition.current.y) * ease
      }

      // Update robo position
      if (!isMoving.current) {
        robo.style.transform = `
          translate(${currentPosition.current.x - 30}px, ${currentPosition.current.y - 80}px)
          rotateX(0deg) rotateY(0deg)
        `
      }

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
      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current)
      }
    }
  }, [])

  return (
    <div
      ref={roboRef}
      className="robo-cursor pointer-events-none fixed top-0 left-0 z-50 transition-all duration-300 ease-out opacity-0"
      style={{ perspective: '1000px' }}
    >
      {/* Robot Head */}
      <div className="relative">
        {/* Rainbow Border Container */}
        <div className="absolute inset-0 rainbow-border rounded-xl p-[3px]">
          {/* Display Screen */}
          <div className="robo-head w-16 h-16 bg-black rounded-lg relative overflow-hidden">
            <div
              ref={displayRef}
              className="display absolute inset-2 bg-[#1a1a1a] rounded-lg grid place-items-center"
            >
              {/* Quotation Marks */}
              <div className="text-white text-2xl font-bold tracking-tighter">''</div>
            </div>
          </div>
        </div>

        {/* Status Dots */}
        <div
          ref={dotsRef}
          className="dots absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-purple-500 transition-all duration-300" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 transition-all duration-300" />
          <div className="w-2 h-2 rounded-full bg-orange-500 transition-all duration-300" />
        </div>
      </div>
    </div>
  )
} 