'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  imageUrl?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  technologies,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="trading-card overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--accent-blue)]/20 to-purple-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-sm text-gray-300">Project Preview</div>
            </div>
          </div>
        )}
        {isHovered && (
          <div className="absolute inset-0 bg-[var(--background-rgb)]/80 backdrop-blur-sm flex items-center justify-center space-x-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="trading-button"
              >
                Live Demo
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg font-medium border border-[var(--accent-blue)] text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10 transition-all duration-300"
              >
                View Code
              </a>
            )}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full border border-[var(--accent-blue)]/20 text-[var(--accent-blue)] bg-[var(--accent-blue)]/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 