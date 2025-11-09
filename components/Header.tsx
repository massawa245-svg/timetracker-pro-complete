"use client"

import Link from 'next/link'
import { Clock, User, BarChart3, Users } from 'lucide-react'

export default function Header(): JSX.Element {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TimeTracker Pro</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/timer" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Zeiterfassung
            </Link>
            <Link 
              href="/team" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Team
            </Link>
            <Link 
              href="/reports" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Berichte
            </Link>
            <Link 
              href="/auth/login" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <User className="h-4 w-4" />
              Anmelden
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
