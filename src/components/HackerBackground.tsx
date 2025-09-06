'use client'

import { useEffect, useRef } from 'react'

export default function HackerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with high resolution
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

    // Matrix rain characters - using more hacker-like symbols
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?\\'
    const binaryChars = '01'
    const hexChars = '0123456789ABCDEF'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    
    // Drops - one per column
    const drops: Array<{
      pos: number,
      speed: number,
      charType: 'matrix' | 'binary' | 'hex',
      glitching: boolean,
      glitchTimer: number,
      highlight: boolean
    }> = []
    
    for (let i = 0; i < columns; i++) {
      drops.push({
        pos: Math.random() * -100, // Start above the canvas
        speed: 0.5 + Math.random() * 1.5,
        charType: Math.random() > 0.7 ? 'binary' : Math.random() > 0.5 ? 'hex' : 'matrix',
        glitching: false,
        glitchTimer: 0,
        highlight: Math.random() > 0.97 // Highlight some columns
      })
    }

    // Binary code blocks - floating in background
    const codeBlocks: Array<{
      x: number,
      y: number,
      width: number,
      height: number,
      text: string[],
      alpha: number,
      fadeDirection: 'in' | 'out',
      glitching: boolean
    }> = []

    // Generate code blocks
    const generateCodeBlock = () => {
      const width = 100 + Math.random() * 200
      const height = 80 + Math.random() * 150
      const x = Math.random() * (canvas.width - width)
      const y = Math.random() * (canvas.height - height)
      
      // Generate binary/hex text for the block
      const text: string[] = []
      const lines = Math.floor(height / 20)
      
      for (let i = 0; i < lines; i++) {
        let line = ''
        const lineLength = 10 + Math.floor(Math.random() * 20)
        const isHex = Math.random() > 0.6
        
        for (let j = 0; j < lineLength; j++) {
          if (isHex) {
            line += hexChars.charAt(Math.floor(Math.random() * hexChars.length))
          } else {
            line += binaryChars.charAt(Math.floor(Math.random() * binaryChars.length))
          }
        }
        text.push(line)
      }
      
      codeBlocks.push({
        x,
        y,
        width,
        height,
        text,
        alpha: 0,
        fadeDirection: 'in',
        glitching: false
      })
    }

    // Generate initial code blocks - fewer for a cleaner look
    for (let i = 0; i < 3; i++) {
      generateCodeBlock()
    }

    // Subtle glitch effect for professional look
    const applyGlitch = (x: number, y: number, width: number, height: number) => {
      if (Math.random() > 0.95) return // Apply very rarely for subtlety
      
      // Fewer, more subtle glitch slices
      const slices = 2 + Math.floor(Math.random() * 3)
      const sliceHeight = height / slices
      
      for (let i = 0; i < slices; i++) {
        const sliceY = y + i * sliceHeight
        const sliceOffset = (Math.random() - 0.5) * 5 // Reduced offset for subtlety
        
        // Get image data from canvas
        const imageData = ctx.getImageData(x, sliceY, width, sliceHeight)
        
        // Clear the slice area
        ctx.clearRect(x, sliceY, width, sliceHeight)
        
        // Draw the slice with offset
        ctx.putImageData(imageData, x + sliceOffset, sliceY)
      }
      
      // Add subtle color aberration
      if (Math.random() > 0.9) {
        ctx.fillStyle = `rgba(0, 120, 255, ${Math.random() * 0.05})` // More professional blue tone
        ctx.fillRect(x, y, width, height)
      }
    }

    // Subtle scan line effect for professional appearance
    const drawScanLines = () => {
      const scanLineHeight = 1 // Thinner lines
      const scanLineSpacing = 8 // More spacing
      const scanLineCount = Math.ceil(canvas.height / (scanLineHeight + scanLineSpacing))
      
      ctx.fillStyle = 'rgba(0, 150, 255, 0.01)' // More subtle blue tone
      
      for (let i = 0; i < scanLineCount; i++) {
        const y = i * (scanLineHeight + scanLineSpacing)
        ctx.fillRect(0, y, canvas.width, scanLineHeight)
      }
    }

    // Drawing the animation
    let animationFrameId: number
    let time = 0
    
    const draw = () => {
      time += 0.016 // Approximately 60fps
      
      // Dark blue BG with lower opacity for a more professional trail effect
      ctx.fillStyle = 'rgba(0, 15, 30, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw scan lines
      drawScanLines()
      
      // Draw code blocks
      codeBlocks.forEach((block, index) => {
        // Update alpha based on fade direction
        if (block.fadeDirection === 'in') {
          block.alpha += 0.005
          if (block.alpha >= 0.3) {
            block.fadeDirection = 'out'
          }
        } else {
          block.alpha -= 0.003
          if (block.alpha <= 0) {
            // Remove and create a new block
            codeBlocks.splice(index, 1)
            generateCodeBlock()
            return
          }
        }
        
        // Random glitching
        block.glitching = Math.random() > 0.995
        
        // Draw the code block
        ctx.save()
        ctx.globalAlpha = block.alpha
        
        // Draw text lines
        ctx.font = '12px monospace'
        ctx.textAlign = 'left'
        
        block.text.forEach((line, lineIndex) => {
          const lineY = block.y + 15 + lineIndex * 20
          
          // Glitch effect on text
          if (block.glitching && Math.random() > 0.7) {
            ctx.fillStyle = `rgba(0, 120, 200, ${0.2 + Math.random() * 0.3})` // Professional blue tone
          } else {
            ctx.fillStyle = `rgba(0, 100, 180, ${0.15 + Math.random() * 0.1})` // Subtle blue for regular text
          }
          
          ctx.fillText(line, block.x, lineY)
          
          // Randomly change some characters for animation
          if (Math.random() > 0.9) {
            const charIndex = Math.floor(Math.random() * line.length)
            const newChar = Math.random() > 0.5 ? 
              binaryChars.charAt(Math.floor(Math.random() * binaryChars.length)) :
              hexChars.charAt(Math.floor(Math.random() * hexChars.length))
            
            block.text[lineIndex] = line.substring(0, charIndex) + newChar + line.substring(charIndex + 1)
          }
        })
        
        // Apply glitch effect
        if (block.glitching) {
          applyGlitch(block.x, block.y, block.width, block.height)
        }
        
        ctx.restore()
      })
      
      // Set text style for matrix rain
      ctx.font = `${fontSize}px monospace`
      ctx.textAlign = 'center'

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        
        // Update glitch state - less frequent for professional look
        if (Math.random() > 0.999) {
          drop.glitching = true
          drop.glitchTimer = 5 + Math.floor(Math.random() * 10) // Shorter glitch duration
        }
        
        if (drop.glitching) {
          drop.glitchTimer--
          if (drop.glitchTimer <= 0) {
            drop.glitching = false
          }
        }
        
        // Generate random character based on type
        let text
        if (drop.charType === 'binary') {
          text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length))
        } else if (drop.charType === 'hex') {
          text = hexChars.charAt(Math.floor(Math.random() * hexChars.length))
        } else {
          text = characters.charAt(Math.floor(Math.random() * characters.length))
        }
        
        // Calculate position
        const x = i * fontSize
        const y = drop.pos * fontSize
        
        // Calculate color based on position and type
        let hue, saturation, lightness, alpha
        
        if (drop.glitching) {
          // Subtle glitching colors
          hue = 210 // Professional blue
          saturation = 80
          lightness = 50 + Math.random() * 10
          alpha = 0.6 + Math.random() * 0.2
        } else if (drop.highlight) {
          // Highlighted columns - more subtle
          hue = 200 // Blue
          saturation = 70
          lightness = 50 + Math.sin(time * 2) * 10
          alpha = 0.7
        } else {
          // Normal colors - professional palette
          const progress = y / canvas.height
          hue = drop.charType === 'binary' ? 210 : drop.charType === 'hex' ? 190 : 220
          saturation = 70
          lightness = 40 + progress * 15
          alpha = 0.8 - progress * 0.7
        }
        
        // Draw the character with calculated color
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
        ctx.fillText(text, x, y)
        
        // Add subtle glow effect for highlighted columns
        if (drop.highlight || drop.glitching) {
          ctx.shadowColor = drop.glitching ? 'rgba(0, 100, 200, 0.5)' : 'rgba(0, 120, 220, 0.4)'
          ctx.shadowBlur = 5 // Reduced blur for subtlety
          ctx.fillText(text, x, y)
          ctx.shadowBlur = 0
        }
        
        // Move drops down at variable speed
        drop.pos += drop.speed
        
        // Reset when drop reaches bottom or randomly
        if (drop.pos * fontSize > canvas.height && Math.random() > 0.95) {
          drop.pos = 0
          drop.speed = 0.5 + Math.random() * 1.5
          drop.charType = Math.random() > 0.7 ? 'binary' : Math.random() > 0.5 ? 'hex' : 'matrix'
          drop.highlight = Math.random() > 0.97
        }
      }
      
      // Occasional global glitch effect
      if (Math.random() > 0.995) {
        const glitchHeight = 20 + Math.random() * 100
        const glitchY = Math.random() * (canvas.height - glitchHeight)
        applyGlitch(0, glitchY, canvas.width, glitchHeight)
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
      className="fixed top-0 left-0 w-full h-full"
      style={{ opacity: 0.05, zIndex: 0 }}
    />
  )
}