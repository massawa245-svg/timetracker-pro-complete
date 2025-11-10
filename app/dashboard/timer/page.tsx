"use client"

import ProtectedRoute from '@/components/ProtectedRoute'

export default function DashboardTimerPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Zeiterfassung</h1>
            <p className="text-gray-600 mb-8">Timer-Funktionalität kommt bald...</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-blue-700">
                Diese Seite wurde unter das Dashboard verschoben. Die Timer-Funktionalität wird demnächst implementiert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
