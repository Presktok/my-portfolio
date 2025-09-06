'use client'

import { useEffect, useRef } from 'react'

export default function MatrixRainBackground() {
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

    // Matrix rain characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    
    // Drops - one per column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100 // Start above the canvas
    }

    // Drawing the characters
    let animationFrameId: number
    const draw = () => {
      // Black BG with opacity for the trail effect
      ctx.fillStyle = 'rgba(19, 23, 34, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text style
      ctx.font = `${fontSize}px monospace`
      ctx.textAlign = 'center'

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Generate random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        
        // Calculate position
        const x = i * fontSize
        const y = drops[i] * fontSize
        
        // Calculate gradient color based on position
        const progress = y / canvas.height
        const hue = 220 + progress * 40 // Blue range
        
        // Draw the character with gradient color
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${1 - progress * 0.8})`
        ctx.fillText(text, x, y)
        
        // Move drops down
        drops[i]++
        
        // Reset when drop reaches bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
      }
      
      animationFrameId = requestAnimationFrame(draw)
    }
    draw()

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-15"
      style={{ opacity: 0.15 }}
    />
  )
}