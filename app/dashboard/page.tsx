// app/dashboard/page.tsx
"use client"

import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Clock, BarChart3, Calendar, Users, Crown } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, isManager, isAdmin } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Welcome Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Willkommen, {user?.name}!
                </h1>
                <p className="text-gray-600">
                  {user?.position} • {user?.department}
                  {isManager && <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">Manager</span>}
                  {isAdmin && <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">Admin</span>}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Letzte Anmeldung</p>
                <p className="text-gray-700 font-semibold">
                  {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString('de-DE') : 'Heute'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link
              href="/timer"
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-xl group-hover:bg-blue-600 transition-colors">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Zeiterfassung</h3>
                  <p className="text-sm text-gray-600">Zeit tracken</p>
                </div>
              </div>
            </Link>

            <Link
              href="/schedule"
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-green-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-xl group-hover:bg-green-600 transition-colors">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Wochenplan</h3>
                  <p className="text-sm text-gray-600">Aktuelle Pläne</p>
                </div>
              </div>
            </Link>

            <Link
              href="/team"
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-orange-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500 rounded-xl group-hover:bg-orange-600 transition-colors">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Team</h3>
                  <p className="text-sm text-gray-600">Mitarbeiter</p>
                </div>
              </div>
            </Link>

            {(isManager || isAdmin) && (
              <Link
                href="/dashboard/manager"
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-purple-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500 rounded-xl group-hover:bg-purple-600 transition-colors">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Manager</h3>
                    <p className="text-sm text-gray-600">Administration</p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              Übersicht
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-blue-600">0h</div>
                <div className="text-gray-600">Heute gearbeitet</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-gray-600">Aktive Projekte</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-gray-600">Erledigte Tasks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}