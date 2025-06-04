'use client'

import Image from 'next/image'

interface SkillCardProps {
  name: string
  icon: string
  proficiency: number
}

export default function SkillCard({ name, icon, proficiency }: SkillCardProps) {
  return (
    <div className="trading-card p-6 text-center transform transition-all duration-300 hover:scale-105">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <Image
          src={icon}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-lg font-medium mb-3 text-white">{name}</h3>
      <div className="w-full bg-[var(--background-rgb)] rounded-full h-1.5 mb-1">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-[var(--accent-blue)] to-blue-400"
          style={{ width: `${proficiency}%` }}
        ></div>
      </div>
      <span className="text-sm text-[var(--accent-blue)]">{proficiency}%</span>
    </div>
  )
} 