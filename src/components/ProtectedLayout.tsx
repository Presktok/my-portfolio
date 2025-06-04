'use client'

import { useEffect } from 'react'
import RoboCursor from './RoboCursor'
import InteractiveBackground from './InteractiveBackground'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Prevent right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // Prevent copying
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'c' || e.key === 's' || e.key === 'u' || e.key === 'p')
      ) {
        e.preventDefault()
      }
    }

    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('dragstart', handleDragStart)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('dragstart', handleDragStart)
    }
  }, [])

  return (
    <>
      <RoboCursor />
      <InteractiveBackground />
      <div className="relative min-h-screen">
        {children}
      </div>
    </>
  )
} 