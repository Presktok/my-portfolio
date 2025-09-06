'use client'

import { useEffect, useRef } from 'react'

export default function BigRobot() {
  const robotRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const currentRotation = useRef({ x: 0, y: 0, z: 0 })
  const isHovered = useRef(false)

  useEffect(() => {
    const robot = robotRef.current
    if (!robot) return

    const onMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to window center
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      // Calculate rotation based on mouse position
      const rotateY = ((e.clientX - centerX) / centerX) * 30 // Max 30 degrees
      const rotateX = ((e.clientY - centerY) / centerY) * -30 // Max -30 degrees
      
      // Update rotation with smooth transition
      currentRotation.current = {
        x: rotateX,
        y: rotateY,
        z: isHovered.current ? 5 : 0 // Slight tilt when hovered
      }
    }

    const onMouseEnter = () => {
      isHovered.current = true
    }

    const onMouseLeave = () => {
      isHovered.current = false
    }

    // Smooth animation
    const animate = () => {
      if (robot) {
        // Add floating animation
        const floatY = Math.sin(Date.now() / 1000) * 10
        const floatX = Math.sin(Date.now() / 1500) * 5
        const floatZ = Math.cos(Date.now() / 2000) * 5

        // Apply all transformations
        robot.style.transform = `
          translate3d(${floatX}px, ${floatY}px, ${floatZ}px)
          rotateX(${currentRotation.current.x}deg)
          rotateY(${currentRotation.current.y}deg)
          rotateZ(${currentRotation.current.z}deg)
          scale(${isHovered.current ? 1.1 : 1})
        `
      }
      requestAnimationFrame(animate)
    }

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove)
    robot.addEventListener('mouseenter', onMouseEnter)
    robot.addEventListener('mouseleave', onMouseLeave)
    
    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      robot.removeEventListener('mouseenter', onMouseEnter)
      robot.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={robotRef}
      className="relative w-64 h-64 mx-auto my-8 transition-all duration-300"
      style={{ transformStyle: 'preserve-3d', zIndex: 10 }}
    >
      {/* Robot Head */}
      <div className="relative transform-style-3d">
        {/* Rainbow Border Container */}
        <div className="absolute inset-0 rainbow-border rounded-xl p-[3px] transform-style-3d">
          {/* Display Screen */}
          <div className="robo-head w-64 h-64 bg-black rounded-lg relative overflow-hidden transform-style-3d">
            <div className="display absolute inset-4 bg-[#1a1a1a] rounded-lg grid place-items-center transform-style-3d">
              {/* Robot Face */}
              <div className="text-white text-6xl font-bold tracking-tighter transform-style-3d">🤖</div>
            </div>
          </div>
        </div>

        {/* Antenna */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center transform-style-3d">
          <div className="w-4 h-8 bg-gray-400 rounded-t-full" />
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
        </div>

        {/* Eyes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex gap-8 transform-style-3d">
          <div className="w-8 h-8 rounded-full bg-blue-500 animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-blue-500 animate-pulse" />
        </div>

        {/* Mouth */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 h-4 bg-gray-300 rounded-full transform-style-3d" />
      </div>
    </div>
  )
}