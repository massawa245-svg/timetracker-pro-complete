"use client"

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, CheckCircle, XCircle, Eye, Download, Loader2 } from 'lucide-react'

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

interface WorkSchedule {
  _id: string
  weeklyPlan: WeeklyPlanData
  publishedAt: string
  publishedBy: {
    name: string
    email: string
  }
}

export default function SchedulePage() {
  const [weeklyPlan, setWeeklyPlan] = useState<WorkSchedule | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadWeeklyPlan()
  }, [])

  const loadWeeklyPlan = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log(' Loading weekly plan...')
      const response = await fetch('/api/weekly-plan')
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      
      const data = await response.json()
      
      console.log(' API Response:', data)
      
      if (data.success && data.weeklyPlan) {
        console.log(' Weekly plan data loaded')
        setWeeklyPlan(data.weeklyPlan)
      } else {
        console.log('ℹ No weekly plan available')
        setWeeklyPlan(null)
      }
    } catch (error) {
      console.error(' Error loading weekly plan:', error)
      setError('Fehler beim Laden des Wochenplans')
    } finally {
      setLoading(false)
    }
  }

  const getTotalWeeklyHours = () => {
    if (!weeklyPlan?.weeklyPlan) return 0
    return Object.values(weeklyPlan.weeklyPlan).reduce((total, day) => total + (day.enabled ? day.hours : 0), 0)
  }

  const getWorkDaysCount = () => {
    if (!weeklyPlan?.weeklyPlan) return 0
    return Object.values(weeklyPlan.weeklyPlan).filter(day => day.enabled).length
  }

  const formatTime = (time: string) => {
    if (time === '00:00') return '12:00 AM'
    const [hours, minutes] = time.split(':')
    const hourNum = parseInt(hours)
    const period = hourNum >= 12 ? 'PM' : 'AM'
    const displayHour = hourNum % 12 || 12
    return `${displayHour}:${minutes} ${period}`
  }

  const formatPause = (minutes: number) => {
    if (minutes === 0) return '0 min'
    return `${minutes} min`
  }

  const dayNames = {
    monday: 'Montag',
    tuesday: 'Dienstag', 
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag'
  }

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Lade Wochenplan...</h2>
            <p className="text-gray-600">Bitte warten, Daten werden geladen</p>
          </div>
        </div>
      </div>
    )
  }

  // ✅ ERROR STATE
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fehler beim Laden</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadWeeklyPlan}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </div>
    )
  }

  //  KEIN WOCHENPLAN VERFÜGBAR
  if (!weeklyPlan || !weeklyPlan.weeklyPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Kein Wochenplan verfügbar</h2>
            <p className="text-gray-600 mb-4">
               <strong>Der Manager hat noch keinen Wochenplan veröffentlicht.</strong>
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Sobald Ihr Teamleiter einen Wochenplan erstellt und veröffentlicht, 
              sehen Sie ihn hier. Bei Fragen wenden Sie sich bitte an Ihren Vorgesetzten.
            </p>
            <button
              onClick={loadWeeklyPlan}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </div>
    )
  }

  //  WOCHENPLAN VERFÜGBAR
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Wochenplan</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Veröffentlicht am {new Date(weeklyPlan.publishedAt).toLocaleDateString('de-DE')}
                {weeklyPlan.publishedBy && ` von ${weeklyPlan.publishedBy.name}`}
              </p>
            </div>
          </div>
        </div>

        {/* Wochenplan Übersicht */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Eye className="h-6 w-6 text-blue-500" />
            Aktueller Wochenplan
          </h2>

          {/* Tage Grid */}
          <div className="space-y-4 mb-8">
            {(Object.keys(weeklyPlan.weeklyPlan) as Array<keyof WeeklyPlanData>).map((day) => {
              const dayPlan = weeklyPlan.weeklyPlan[day]
              if (!dayPlan) return null
              
              return (
                <div 
                  key={day}
                  className={`grid grid-cols-1 md:grid-cols-6 gap-4 p-4 rounded-xl border transition-all ${
                    dayPlan.enabled 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  {/* Tag Name */}
                  <div className="flex items-center gap-3">
                    {dayPlan.enabled ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className={`font-semibold ${dayPlan.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
                      {dayNames[day]}
                    </span>
                  </div>

                  {/* Startzeit */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Start</label>
                    <div className={`px-3 py-2 border rounded-lg text-sm ${
                      dayPlan.enabled ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-100 border-gray-200 text-gray-500'
                    }`}>
                      {formatTime(dayPlan.start)}
                    </div>
                  </div>

                  {/* Endzeit */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ende</label>
                    <div className={`px-3 py-2 border rounded-lg text-sm ${
                      dayPlan.enabled ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-100 border-gray-200 text-gray-500'
                    }`}>
                      {formatTime(dayPlan.end)}
                    </div>
                  </div>

                  {/* Pause */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pause</label>
                    <div className={`px-3 py-2 border rounded-lg text-sm text-center ${
                      dayPlan.enabled ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-100 border-gray-200 text-gray-500'
                    }`}>
                      {formatPause(dayPlan.pause)}
                    </div>
                  </div>

                  {/* Stunden */}
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
        <div className="flex justify-end gap-4">
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl">
            <Download className="h-5 w-5" />
            PDF Export
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">Wichtige Information</span>
          </div>
          <p className="text-blue-700 text-sm">
            Dieser Wochenplan wurde vom Management erstellt und ist für alle Mitarbeiter verbindlich.
            Bei Fragen wenden Sie sich bitte an Ihren Vorgesetzten.
          </p>
        </div>
      </div>
    </div>
  )
}
