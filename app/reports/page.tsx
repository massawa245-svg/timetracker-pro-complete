"use client"

import { BarChart3, Calendar, Download, Users, Clock } from 'lucide-react'

export default function ReportsPage() {
  // Demo Report Daten
  const weeklyData = [
    { day: 'Montag', hours: 7.5, projects: 3 },
    { day: 'Dienstag', hours: 8.0, projects: 2 },
    { day: 'Mittwoch', hours: 6.5, projects: 4 },
    { day: 'Donnerstag', hours: 7.0, projects: 3 },
    { day: 'Freitag', hours: 6.0, projects: 2 },
  ]

  const projectData = [
    { name: 'Website Redesign', hours: 25, progress: 75 },
    { name: 'Mobile App', hours: 18, progress: 45 },
    { name: 'Kundenmeetings', hours: 12, progress: 90 },
    { name: 'Bug Fixing', hours: 8, progress: 100 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Berichte & Analytics</h1>
            <p className="text-gray-600 mt-2">Detaillierte Einblicke in Arbeitszeiten und Produktivität</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="h-4 w-4" />
            Exportieren
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gesamtstunden</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">35h</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktive Projekte</p>
                <p className="text-3xl font-bold text-green-600 mt-2">4</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team-Mitglieder</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">8</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Zeitraum</p>
                <p className="text-lg font-bold text-orange-600 mt-2">Diese Woche</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Hours */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stunden pro Tag</h3>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{day.day}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{day.projects} Projekte</span>
                    <span className="text-sm font-semibold text-blue-600">{day.hours}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Projekt-Fortschritt</h3>
            <div className="space-y-4">
              {projectData.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{project.name}</span>
                    <span className="text-gray-600">{project.hours}h - {project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
