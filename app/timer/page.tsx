"use client"

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Square, Clock, Folder, Save, Database, WifiOff } from 'lucide-react'

interface TimerSession {
  _id: string;
  project: string;
  description: string;
  startTime: string;
  duration: number;
  status: string;
}

export default function TimerPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [project, setProject] = useState('')
  const [description, setDescription] = useState('')
  const [currentSession, setCurrentSession] = useState<TimerSession | null>(null)
  const [sessions, setSessions] = useState<TimerSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [useDemoMode, setUseDemoMode] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  const projects = [
    'Website Redesign',
    'Mobile App Entwicklung',
    'Kundenmeeting',
    'Interne Schulung',
    'Bug Fixing',
    'Projektplanung'
  ]

  // Timer Logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const loadSessions = async () => {
    try {
      const response = await fetch('/api/timer?userId=demo-user-id')
      const data = await response.json()
      
      if (data.success) {
        if (data.runningSession) {
          setCurrentSession(data.runningSession)
          setIsRunning(true)
          const startTime = new Date(data.runningSession.startTime)
          const now = new Date()
          const elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000)
          setTime(elapsedSeconds)
        }
        setSessions(data.pastSessions || [])
        setUseDemoMode(false)
      }
    } catch (error) {
      console.error('Fehler beim Laden der Sessions:', error)
      setUseDemoMode(true)
    }
  }

  const startTimer = async () => {
    if (!project) {
      alert('Bitte wählen Sie ein Projekt aus')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/timer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: 'demo-user-id',
          project, 
          description 
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setCurrentSession(data.session)
        setIsRunning(true)
        setTime(0)
        setUseDemoMode(false)
      } else {
        // Fallback zu Demo Mode
        setUseDemoMode(true)
        startDemoTimer()
      }
    } catch (error) {
      // Fallback zu Demo Mode bei Netzwerk Fehler
      setUseDemoMode(true)
      startDemoTimer()
    }
    setIsLoading(false)
  }

  const startDemoTimer = () => {
    const demoSession: TimerSession = {
      _id: 'demo-' + Date.now(),
      project,
      description,
      startTime: new Date().toISOString(),
      duration: 0,
      status: 'running'
    }
    setCurrentSession(demoSession)
    setIsRunning(true)
    setTime(0)
    alert('Demo-Modus: Timer läuft lokal (keine Datenbank)')
  }

  const stopTimer = async () => {
    if (!currentSession) return

    setIsLoading(true)
    
    if (useDemoMode) {
      // Demo Mode: Lokal speichern
      const completedSession = {
        ...currentSession,
        duration: time,
        status: 'completed',
        endTime: new Date().toISOString()
      }
      setSessions(prev => [completedSession, ...prev])
      setCurrentSession(null)
      setIsRunning(false)
      setTime(0)
      setProject('')
      setDescription('')
      alert('Demo: Timer lokal gespeichert')
    } else {
      try {
        const response = await fetch('/api/timer', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId: currentSession._id }),
        })

        const data = await response.json()
        
        if (data.success) {
          setCurrentSession(null)
          setIsRunning(false)
          setTime(0)
          setProject('')
          setDescription('')
          loadSessions()
          alert('Timer erfolgreich gespeichert!')
        } else {
          alert('Fehler beim Stoppen: ' + data.error)
        }
      } catch (error) {
        alert('Netzwerk Fehler. Wechsle zu Demo-Modus.')
        setUseDemoMode(true)
      }
    }
    setIsLoading(false)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zeiterfassung</h1>
          <p className="text-gray-600">Erfassen und verwalten Sie Ihre Arbeitszeit</p>
        </div>

        {/* Connection Status */}
        {useDemoMode && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <WifiOff className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">Demo-Modus aktiv</h3>
                <p className="text-yellow-700 text-sm">
                  Timer läuft lokal. Daten werden nicht in der Datenbank gespeichert.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timer Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-gray-900 font-mono mb-4">
                {formatTime(time)}
              </div>
              <div className="text-sm text-gray-500">
                {isRunning ? `Aktives Projekt: ${project}` : 'Timer bereit'}
                {currentSession && ` (${useDemoMode ? 'Demo' : 'DB'})`}
              </div>
            </div>

            {/* Project Selection */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Folder className="h-4 w-4 inline mr-2" />
                  Projekt *
                </label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  disabled={isRunning || isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Projekt auswählen</option>
                  {projects.map(proj => (
                    <option key={proj} value={proj}>{proj}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Beschreibung (optional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isRunning || isLoading}
                  placeholder="Was arbeiten Sie an?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <button
                  onClick={startTimer}
                  disabled={!project || isLoading}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  {isLoading ? 'Starte...' : 'Start'}
                </button>
              ) : (
                <>
                  <button
                    onClick={pauseTimer}
                    disabled={isLoading}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Pause className="h-5 w-5" />
                    Pause
                  </button>
                  <button
                    onClick={stopTimer}
                    disabled={isLoading}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Square className="h-5 w-5" />
                    {isLoading ? 'Speichere...' : 'Stopp & Speichern'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Sessions History */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Save className="h-5 w-5" />
              Letzte Timer-Sessions
              {useDemoMode && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Demo</span>}
            </h2>
            
            {sessions.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Noch keine Sessions aufgezeichnet</p>
                <p className="text-sm">Starten Sie Ihren ersten Timer!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {sessions.map((session) => (
                  <div key={session._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{session.project}</h3>
                      <span className="text-sm font-mono text-blue-600">
                        {formatTime(session.duration)}
                      </span>
                    </div>
                    {session.description && (
                      <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                    )}
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Start: {formatDate(session.startTime)}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        session.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {session.status === 'completed' ? 'Abgeschlossen' : 'Laufend'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Timer-Funktionalität</h3>
          <p className="text-blue-700">
            {useDemoMode 
              ? 'Demo-Modus: Timer läuft lokal. Perfekt zum Testen ohne Datenbank!'
              : 'Datenbank-Modus: Sessions werden in MongoDB gespeichert.'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
