'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center p-8 max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg border border-blue-500">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">404 - Page Not Found</h1>
        <p className="mb-6 text-gray-300">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="glitch-effect mb-8 p-4 bg-gray-900 rounded border border-blue-400">
          <code className="text-red-400">Error: Route not found in application routes</code>
        </div>
        <Link 
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}