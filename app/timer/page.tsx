"use client"

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Square, Clock, Folder } from 'lucide-react'

export default function TimerPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [project, setProject] = useState('')
  const [description, setDescription] = useState('')
  const intervalRef = useRef<NodeJS.Timeout>()

  const projects = [
    'Website Redesign',
    'Mobile App Entwicklung',
    'Kundenmeeting',
    'Interne Schulung',
    'Bug Fixing',
    'Projektplanung'
  ]

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

  const startTimer = () => {
    if (!project) {
      alert('Bitte wählen Sie ein Projekt aus')
      return
    }
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const stopTimer = () => {
    setIsRunning(false)
    setTime(0)
    // Hier später: Zeit in Datenbank speichern
    console.log('Timer gestoppt:', { project, description, time })
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zeiterfassung</h1>
          <p className="text-gray-600">Erfassen Sie Ihre Arbeitszeit für verschiedene Projekte</p>
        </div>

        {/* Timer Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-gray-900 font-mono mb-4">
              {formatTime(time)}
            </div>
            <div className="text-sm text-gray-500">
              {isRunning ? `Aktives Projekt: ${project}` : 'Timer bereit'}
            </div>
          </div>

          {/* Project Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Folder className="h-4 w-4 inline mr-2" />
                Projekt
              </label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                disabled={isRunning}
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
                disabled={isRunning}
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
                disabled={!project}
                className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Start
              </button>
            ) : (
              <>
                <button
                  onClick={pauseTimer}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Pause className="h-5 w-5" />
                  Pause
                </button>
                <button
                  onClick={stopTimer}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Square className="h-5 w-5" />
                  Stopp
                </button>
              </>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Timer-Funktionalität</h3>
          <p className="text-blue-700">
            Der Timer zeichnet Ihre Arbeitszeit auf. Später werden wir die Zeiten in der Datenbank speichern 
            und Reports für Manager bereitstellen.
          </p>
        </div>
      </div>
    </div>
  )
}
