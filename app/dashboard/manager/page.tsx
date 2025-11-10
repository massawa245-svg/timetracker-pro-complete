"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Users, BarChart3, Clock, Settings, FileText, Eye, CheckCircle, Crown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function ManagerPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingRequests: 0,
    activeSchedules: 0,
    weeklyHours: 0
  })

  const features = [
    {
      title: 'Wochenplan erstellen',
      description: 'Wochenpläne für das gesamte Team erstellen und veröffentlichen',
      icon: Calendar,
      path: '/dashboard/manager/schedule',
      color: 'bg-blue-500',
      badge: 'Neu'
    },
    {
      title: 'Team Übersicht',
      description: 'Mitarbeiter verwalten und Teamleistung einsehen',
      icon: Users,
      path: '/dashboard/manager/team',
      color: 'bg-green-500'
    },
    {
      title: 'Zeiterfassung',
      description: 'Arbeitszeiten und Projekte der Mitarbeiter überwachen',
      icon: Clock,
      path: '/dashboard/manager/timesheets',
      color: 'bg-orange-500'
    },
    {
      title: 'Analytics & Reports',
      description: 'Detaillierte Auswertungen und Performance-Reports',
      icon: BarChart3,
      path: '/dashboard/manager/analytics',
      color: 'bg-purple-500'
    },
    {
      title: 'Urlaubsanträge',
      description: 'Urlaubs- und Abwesenheitsanträge bearbeiten',
      icon: FileText,
      path: '/dashboard/manager/requests',
      color: 'bg-red-500',
      badge: '3 neu'
    },
    {
      title: 'Einstellungen',
      description: 'Team-Einstellungen und Berechtigungen verwalten',
      icon: Settings,
      path: '/dashboard/manager/settings',
      color: 'bg-gray-500'
    },
  ]

  useEffect(() => {
    // Simuliere das Laden von Stats
    setTimeout(() => {
      setStats({
        totalEmployees: 15,
        pendingRequests: 3,
        activeSchedules: 12,
        weeklyHours: 487
      })
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Manager Dashboard
              </h1>
              <p className="text-xl text-gray-600">
                Willkommen, {user?.name} - Verwalten Sie Ihr Team und optimieren Sie die Arbeitsabläufe
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lg border border-gray-200 px-6 py-3">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">Manager Bereich</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-blue-600">{stats.totalEmployees}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Mitarbeiter</h3>
            <p className="text-gray-600 text-sm">Im Team</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Ausstehende Anträge</h3>
            <p className="text-gray-600 text-sm">Müssen bearbeitet werden</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{stats.activeSchedules}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Aktive Pläne</h3>
            <p className="text-gray-600 text-sm">Diese Woche</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-purple-600">{stats.weeklyHours}h</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Wochenstunden</h3>
            <p className="text-gray-600 text-sm">Team gesamt</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Schnellaktionen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/dashboard/manager/schedule"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            >
              <Calendar className="h-6 w-6 text-blue-500" />
              <span className="font-semibold text-gray-700">Wochenplan erstellen</span>
            </Link>
            <Link
              href="/dashboard/manager/requests"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200"
            >
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="font-semibold text-gray-700">Anträge bearbeiten</span>
            </Link>
            <Link
              href="/dashboard/manager/team"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
            >
              <Eye className="h-6 w-6 text-orange-500" />
              <span className="font-semibold text-gray-700">Team einsehen</span>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.path}
              className="group block bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${feature.color}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                {feature.badge && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {feature.badge}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                <span>Öffnen</span>
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Letzte Aktivitäten</h2>
          <div className="space-y-3">
            {[
              { action: 'Wochenplan veröffentlicht', time: 'Vor 2 Stunden', user: 'Max Mustermann' },
              { action: 'Urlaubsantrag genehmigt', time: 'Vor 4 Stunden', user: 'Anna Schmidt' },
              { action: 'Neuer Mitarbeiter hinzugefügt', time: 'Gestern', user: 'Tom Weber' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">{activity.action}</span>
                  <span className="text-gray-600 mx-2"></span>
                  <span className="text-gray-500 text-sm">{activity.user}</span>
                </div>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
