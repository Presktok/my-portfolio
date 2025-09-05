import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prince Kumar - Portfolio',
  description: 'Software Developer & Cyber Security Specialist',
  metadataBase: new URL('http://localhost:3002'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
} 