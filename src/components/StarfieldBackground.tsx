'use client'

import { useEffect, useRef } from 'react'

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
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

    // Star properties
    const stars: Array<{
      x: number
      y: number
      z: number
      prevZ: number
      color: string
    }> = []

    // Create stars
    const createStars = () => {
      const numberOfStars = 200
      stars.length = 0

      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          prevZ: 0,
          color: `rgba(${155 + Math.random() * 100}, ${155 + Math.random() * 100}, ${255}, ${0.5 + Math.random() * 0.5})`
        })
      }
    }
    createStars()

    // Animation variables
    let speed = 1
    let animationFrameId: number

    // Draw stars
    const drawStars = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(19, 23, 34, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set origin to center of canvas
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      // Update and draw stars
      stars.forEach(star => {
        // Store previous z position
        star.prevZ = star.z

        // Move star closer to viewer
        star.z -= speed

        // Reset star if it passes the screen
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2
          star.y = Math.random() * canvas.height - canvas.height / 2
          star.z = 1000
          star.prevZ = 1000
        }

        // Project 3D position to 2D with perspective
        const sx = star.x / star.z * 300
        const sy = star.y / star.z * 300
        const prevSx = star.x / star.prevZ * 300
        const prevSy = star.y / star.prevZ * 300

        // Calculate size based on z position (closer = bigger)
        const size = Math.max(0.5, 2 * (1000 - star.z) / 1000)

        // Draw star trail
        ctx.beginPath()
        ctx.moveTo(prevSx, prevSy)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = star.color
        ctx.lineWidth = size
        ctx.stroke()

        // Draw star point
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()
      })

      ctx.restore()
    }

    // Main animation loop
    const animate = () => {
      drawStars()
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
      className="fixed top-0 left-0 w-full h-full -z-25"
      style={{ opacity: 0.6 }}
    />
  )
}