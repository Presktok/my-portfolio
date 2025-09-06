'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with device pixel ratio for sharp rendering
    const updateSize = () => {
      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(pixelRatio, pixelRatio)
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Wave parameters
    const waves = [
      { amplitude: 25, frequency: 0.02, speed: 0.01, color: 'rgba(41, 98, 255, 0.2)' },
      { amplitude: 15, frequency: 0.03, speed: 0.015, color: 'rgba(78, 168, 222, 0.15)' },
      { amplitude: 10, frequency: 0.01, speed: 0.02, color: 'rgba(255, 255, 255, 0.1)' },
    ]

    // Floating particles
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      pulseSpeed: number
      pulsePhase: number
    }> = []

    // Create particles
    const createParticles = () => {
      const numberOfParticles = 40
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: `rgba(${41 + Math.random() * 30}, ${98 + Math.random() * 50}, ${255}, 0.6)`,
          opacity: Math.random() * 0.5 + 0.3,
          pulseSpeed: 0.02 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI * 2
        })
      }
    }
    createParticles()

    // Animation variables
    let time = 0
    let animationFrameId: number

    // Draw waves
    const drawWaves = () => {
      waves.forEach(wave => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)
        
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude + canvas.height / 2
          ctx.lineTo(x, y)
        }
        
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        
        ctx.fillStyle = wave.color
        ctx.fill()
      })
    }

    // Draw floating particles
    const drawParticles = () => {
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY + Math.sin(time * 0.5 + particle.pulsePhase) * 0.2
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Pulse animation
        const pulse = Math.sin(time + particle.pulsePhase) * 0.5 + 0.5
        const size = particle.size * (1 + pulse * 0.3)
        
        // Draw particle with glow
        ctx.save()
        ctx.globalAlpha = particle.opacity * (0.7 + pulse * 0.3)
        ctx.shadowBlur = size * 2
        ctx.shadowColor = particle.color
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    // Draw animated gradient background
    const drawGradientBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      
      // Shift gradient colors over time
      const hueShift = (Math.sin(time * 0.1) * 10) + 220 // Blue range
      
      gradient.addColorStop(0, `hsl(${hueShift}, 70%, 10%)`)
      gradient.addColorStop(1, `hsl(${hueShift + 20}, 60%, 15%)`)
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Main animation loop
    const animate = () => {
      time += 0.01
      
      // Clear canvas with slight fade for trails
      ctx.fillStyle = 'rgba(19, 23, 34, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw elements
      drawGradientBackground()
      drawWaves()
      drawParticles()
      
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-20"
      style={{ opacity: 0.8 }}
    />
  )
}