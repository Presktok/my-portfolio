'use client'

import { useState, useEffect } from 'react'
import StarfieldBackground from './StarfieldBackground'
import AnimatedBackground from './AnimatedBackground'
import MatrixRainBackground from './MatrixRainBackground'
import ParticleBackground from './ParticleBackground'
import InteractiveBackground from './InteractiveBackground'
import HackerBackground from './HackerBackground'

export default function BackgroundManager() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {/* Always show starfield as base background */}
      <StarfieldBackground />
      
      {/* Only show these heavier animations on desktop */}
      {!isMobile && <AnimatedBackground />}
      {!isMobile && <MatrixRainBackground />}
      {!isMobile && <ParticleBackground />}
      
      {/* Interactive background provides the main visual effect */}
      <InteractiveBackground />
      
      {/* Only show hacker background on desktop */}
      {!isMobile && <HackerBackground />}
    </>
  )
}