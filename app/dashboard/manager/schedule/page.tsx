"use client"

import { useState, useEffect } from 'react'
import { Calendar, Save, Send, Clock, Users, CheckCircle } from 'lucide-react'

interface DayPlan {
  start: string
  end: string
  pause: number
  hours: number
  enabled: boolean
}

interface WeeklyPlanData {
  monday: DayPlan
  tuesday: DayPlan
  wednesday: DayPlan
  thursday: DayPlan
  friday: DayPlan
  saturday: DayPlan
  sunday: DayPlan
}

export default function ManagerSchedulePage() {
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlanData>({
    monday: { start: '08:00', end: '17:00', pause: 45, hours: 8.25, enabled: true },
    tuesday: { start: '08:00', end: '17:00', pause: 45, hours: 8.25, enabled: true },
    wednesday: { start: '08:00', end: '17:00', pause: 45, hours: 8.25, enabled: true },
    thursday: { start: '08:00', end: '17:00', pause: 45, hours: 8.25, enabled: true },
    friday: { start: '08:00', end: '16:00', pause: 30, hours: 7.5, enabled: true },
    saturday: { start: '00:00', end: '00:00', pause: 0, hours: 0, enabled: false },
    sunday: { start: '00:00', end: '00:00', pause: 0, hours: 0, enabled: false }
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const dayNames = {
    monday: 'Montag',
    tuesday: 'Dienstag', 
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag'
  }

  const calculateHours = (start: string, end: string, pause: number): number => {
    const [startHour, startMinute] = start.split(':').map(Number)
    const [endHour, endMinute] = end.split(':').map(Number)
    
    const startTotal = startHour * 60 + startMinute
    const endTotal = endHour * 60 + endMinute
    const totalMinutes = endTotal - startTotal - pause
    
    return Math.round((totalMinutes / 60) * 100) / 100
  }

  const updateDayPlan = (day: keyof WeeklyPlanData, field: keyof DayPlan, value: any) => {
    setWeeklyPlan(prev => {
      const updatedPlan = { ...prev }
      const dayPlan = { ...updatedPlan[day] }
      
      if (field === 'enabled') {
        dayPlan.enabled = value
        if (!value) {
          // Wenn Tag deaktiviert wird, setze Standardwerte
          dayPlan.start = '00:00'
          dayPlan.end = '00:00'
          dayPlan.pause = 0
          dayPlan.hours = 0
        } else {
          // Wenn Tag aktiviert wird, setze Standardwerte
          dayPlan.start = '08:00'
          dayPlan.end = '17:00'
          dayPlan.pause = 45
          dayPlan.hours = 8.25
        }
      } else {
        dayPlan[field] = value
        
        // Automatisch Stunden berechnen wenn Start/Ende/Pause geändert wird
        if (['start', 'end', 'pause'].includes(field) && dayPlan.enabled) {
          dayPlan.hours = calculateHours(dayPlan.start, dayPlan.end, dayPlan.pause)
        }
      }
      
      updatedPlan[day] = dayPlan
      return updatedPlan
    })
  }

  const getTotalWeeklyHours = () => {
    return Object.values(weeklyPlan).reduce((total, day) => total + (day.enabled ? day.hours : 0), 0)
  }

  const getWorkDaysCount = () => {
    return Object.values(weeklyPlan).filter(day => day.enabled).length
  }

  const publishWeeklyPlan = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/weekly-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weeklyPlan,
          publishedBy: {
            userId: "manager-user-id",
            name: "Manager",
            email: "manager@company.com"
          }
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setMessage('✅ Wochenplan erfolgreich veröffentlicht!')
      } else {
        setMessage('❌ Fehler: ' + (data.error || 'Unbekannter Fehler'))
      }
    } catch (error) {
      setMessage('❌ Netzwerkfehler beim Veröffentlichen')
    } finally {
      setIsLoading(false)
    }
  }

  const saveDraft = () => {
    setMessage('💾 Entwurf gespeichert (lokal)')
    // Hier könnte man den Entwurf in localStorage speichern
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Wochenplan erstellen</h1>
              <p className="text-gray-600">
                Erstellen und veröffentlichen Sie einen Wochenplan für Ihr Team
              </p>
            </div>
          </div>
        </div>

        {/* Wochenplan Editor */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-500" />
            Wochenplan Editor
          </h2>

          {/* Tage Grid */}
          <div className="space-y-4 mb-8">
            {(Object.keys(weeklyPlan) as Array<keyof WeeklyPlanData>).map((day) => {
              const dayPlan = weeklyPlan[day]
              
              return (
                <div 
                  key={day}
                  className={`grid grid-cols-1 md:grid-cols-6 gap-4 p-4 rounded-xl border transition-all ${
                    dayPlan.enabled 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {/* Tag Name mit Toggle */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={dayPlan.enabled}
                      onChange={(e) => updateDayPlan(day, 'enabled', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className={`font-semibold ${dayPlan.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                      {dayNames[day]}
                    </span>
                  </div>

                  {/* Startzeit */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Start</label>
                    <input
                      type="time"
                      value={dayPlan.start}
                      onChange={(e) => updateDayPlan(day, 'start', e.target.value)}
                      disabled={!dayPlan.enabled}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${
                        dayPlan.enabled 
                          ? 'bg-white border-gray-300 text-gray-900' 
                          : 'bg-gray-100 border-gray-200 text-gray-500'
                      }`}
                    />
                  </div>

                  {/* Endzeit */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ende</label>
                    <input
                      type="time"
                      value={dayPlan.end}
                      onChange={(e) => updateDayPlan(day, 'end', e.target.value)}
                      disabled={!dayPlan.enabled}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${
                        dayPlan.enabled 
                          ? 'bg-white border-gray-300 text-gray-900' 
                          : 'bg-gray-100 border-gray-200 text-gray-500'
                      }`}
                    />
                  </div>

                  {/* Pause */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pause (min)</label>
                    <select
                      value={dayPlan.pause}
                      onChange={(e) => updateDayPlan(day, 'pause', parseInt(e.target.value))}
                      disabled={!dayPlan.enabled}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${
                        dayPlan.enabled 
                          ? 'bg-white border-gray-300 text-gray-900' 
                          : 'bg-gray-100 border-gray-200 text-gray-500'
                      }`}
                    >
                      <option value={0}>0 min</option>
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                      <option value={45}>45 min</option>
                      <option value={60}>60 min</option>
                    </select>
                  </div>

                  {/* Stunden Anzeige */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Arbeitszeit</label>
                    <div className={`px-3 py-2 border rounded-lg text-sm font-semibold text-center ${
                      dayPlan.enabled 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-gray-100 border-gray-200 text-gray-500'
                    }`}>
                      {dayPlan.hours}h
                    </div>
                  </div>

                  {/* Tagessumme */}
                  <div className="flex items-center justify-center">
                    <span className={`font-semibold ${dayPlan.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                      {dayPlan.enabled ? `${dayPlan.hours}h` : '-'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Wochensumme */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-1">Wochengesamtstunden</div>
                <div className="text-3xl font-bold text-green-600">
                  {getTotalWeeklyHours()} Stunden
                </div>
              </div>
              
              <div className="text-sm text-gray-600 text-center md:text-right mt-4 md:mt-0">
                <div>{getWorkDaysCount()} Arbeitstage</div>
                <div>
                  Ø {getWorkDaysCount() > 0 
                    ? `${Math.round((getTotalWeeklyHours() / getWorkDaysCount()) * 100) / 100}h` 
                    : '0h'} pro Tag
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={saveDraft}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            Entwurf speichern
          </button>
          
          <button
            onClick={publishWeeklyPlan}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? (
              <Clock className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            {isLoading ? 'Wird veröffentlicht...' : 'Wochenplan veröffentlichen'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-4 rounded-xl ${
            message.includes('') 
              ? 'bg-green-50 border border-green-200 text-green-700'
              : message.includes('')
              ? 'bg-blue-50 border border-blue-200 text-blue-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <div className="flex items-center gap-2">
              {message.includes('') && <CheckCircle className="h-5 w-5" />}
              {message}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">Information für Manager</span>
          </div>
          <p className="text-blue-700 text-sm">
            Der veröffentlichte Wochenplan ist für alle Mitarbeiter verbindlich und wird 
            automatisch im System angezeigt. Änderungen sind nur durch erneutes Veröffentlichen möglich.
          </p>
        </div>
      </div>
    </div>
  )
}
