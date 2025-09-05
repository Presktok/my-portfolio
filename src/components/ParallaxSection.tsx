'use client'

import { useEffect, useRef } from 'react'

interface ParallaxSectionProps {
  children: React.ReactNode
  offset?: number
  className?: string
  id?: string
}

export default function ParallaxSection({
  children,
  offset = 50,
  className = '',
  id
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const viewHeight = window.innerHeight
      
      // Check if section is in view
      if (rect.top < viewHeight && rect.bottom > 0) {
        // Calculate progress (0 when entering view, 1 when leaving)
        const progress = 1 - (rect.top + rect.height) / (viewHeight + rect.height)
        
        // Apply smooth parallax transform
        const translateY = progress * offset
        content.style.transform = `translateY(${translateY.toString()}px)`
        content.style.opacity = Math.min(1, 1 - Math.abs(progress - 0.5)).toString()
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset])

  return (
    <div ref={sectionRef} id={id} className={`relative overflow-hidden ${className}`}>
      <div
        ref={contentRef}
        className="transform transition-transform duration-300 ease-out"
      >
        {children}
      </div>
    </div>
  )
} 