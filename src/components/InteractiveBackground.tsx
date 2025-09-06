'use client'

import { useEffect, useRef } from 'react'

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const particles = useRef<Array<{
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    baseColor: string
    glowColor: string
    pulsePhase: number
    pulseSpeed: number
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768

    // Set canvas size with device pixel ratio for sharp rendering
    const updateSize = () => {
      // Use a lower pixel ratio on mobile for better performance
      const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1) : (window.devicePixelRatio || 1)
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(pixelRatio, pixelRatio)
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Create particles with professional color scheme
    const createParticles = () => {
      // Reduce particle count on mobile for better performance
      const numberOfParticles = isMobile ? 40 : 80 // Reduced for better performance and cleaner look
      particles.current = []

      const colors = [
        { base: 'rgba(41, 98, 255, 0.4)', glow: 'rgba(41, 98, 255, 0.8)' },   // Primary blue
        { base: 'rgba(25, 82, 239, 0.4)', glow: 'rgba(25, 82, 239, 0.8)' },   // Secondary blue
        { base: 'rgba(78, 168, 222, 0.4)', glow: 'rgba(78, 168, 222, 0.8)' }, // Light blue
        { base: 'rgba(255, 255, 255, 0.3)', glow: 'rgba(255, 255, 255, 0.6)' }, // White
      ]

      for (let i = 0; i < numberOfParticles; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (isMobile ? 1.5 : 2) + 1,
          speedX: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3), // Slower, more subtle movement
          speedY: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
          baseColor: color.base,
          glowColor: color.glow,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02
        })
      }
    }
    createParticles()

    // Enhanced mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Professional animation with smooth transitions
    let animationFrameId: number
    let time = 0
    let lastFrameTime = 0
    // Frame rate control - use lower FPS on mobile
    const targetFPS = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS
    
    const animate = () => {
      const now = performance.now()
      const elapsed = now - lastFrameTime
      
      // Throttle frame rate on mobile
      if (elapsed < frameInterval) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }
      
      lastFrameTime = now - (elapsed % frameInterval)
      time += 0.01
      ctx.fillStyle = 'rgba(19, 23, 34, 0.15)' // Slower fade for smoother trails
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle) => {
        // Update particle position with smooth movement
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Professional mouse interaction with easing
        const dx = mousePosition.current.x - particle.x
        const dy = mousePosition.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const easing = force * 0.015 // Smoother repulsion
          particle.x -= dx * easing
          particle.y -= dy * easing
        }

        // Wrap around screen with smooth transition
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Pulse animation
        const pulse = Math.sin(time + particle.pulsePhase) * 0.5 + 0.5
        const size = particle.size * (1 + pulse * 0.3)

        // Draw particle with glow effect
        ctx.shadowBlur = size * 2
        ctx.shadowColor = particle.glowColor
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fillStyle = particle.baseColor
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw professional connections - optimized for mobile
        // On mobile, only connect to nearby particles to reduce calculations
        const connectionLimit = isMobile ? 3 : particles.current.length
        const maxLineDistance = isMobile ? 100 : 120
        
        // Sort particles by distance to current particle for mobile optimization
        let particlesToConnect = particles.current
        if (isMobile) {
          particlesToConnect = [...particles.current]
            .map(p => ({
              particle: p,
              distance: Math.sqrt(Math.pow(p.x - particle.x, 2) + Math.pow(p.y - particle.y, 2))
            }))
            .filter(p => p.particle !== particle && p.distance < maxLineDistance)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, connectionLimit)
            .map(p => p.particle)
        }
        
        particlesToConnect.forEach((otherParticle) => {
          if (particle === otherParticle) return
          
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < maxLineDistance) {
            const opacity = (1 - distance / maxLineDistance) * (isMobile ? 0.4 : 0.5)
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, 
              otherParticle.x, otherParticle.y
            )
            gradient.addColorStop(0, `rgba(41, 98, 255, ${opacity * pulse})`)
            gradient.addColorStop(1, `rgba(41, 98, 255, ${opacity * pulse})`)
            
            ctx.beginPath()
            ctx.strokeStyle = gradient
            ctx.lineWidth = isMobile ? 0.3 : 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        background: 'linear-gradient(135deg, #131722 0%, #161B2C 100%)',
        opacity: 0.9
      }}
    />
  )
}