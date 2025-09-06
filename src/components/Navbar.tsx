'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-[var(--nav-background)] shadow-lg backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg md:text-xl font-bold text-white hover:text-[var(--accent-blue)] transition">
              Prince Kumar
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition">
                About
              </Link>
              <Link href="#projects" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition">
                Projects
              </Link>
              <Link href="#skills" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition">
                Skills
              </Link>
              <Link 
                href="#contact" 
                className="trading-button text-white text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-[var(--card-background)] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="px-2 pt-1 pb-2 sm:px-3 bg-[var(--nav-background)] shadow-lg flex justify-center items-center space-x-3">
          <Link href="#projects" className="text-gray-300 hover:text-white px-2 py-1.5 text-sm font-medium">
            Projects
          </Link>
          <Link href="#skills" className="text-gray-300 hover:text-white px-2 py-1.5 text-sm font-medium">
            Skills
          </Link>
          <Link href="#about" className="text-gray-300 hover:text-white px-2 py-1.5 text-sm font-medium">
            About
          </Link>
          <Link href="#contact" className="trading-button text-white text-sm px-3 py-1">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}