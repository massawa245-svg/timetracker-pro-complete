export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Willkommen zurück! Hier ist Ihre Übersicht.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Diese Woche</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">32.5h</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <span className="text-2xl"></span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktive Projekte</p>
                <p className="text-3xl font-bold text-green-600 mt-2">5</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <span className="text-2xl">📁</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">12</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <span className="text-2xl"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Schnellnavigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/timer" className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="text-lg font-semibold text-gray-900">Zeiterfassung</div>
              <div className="text-sm text-gray-600">Timer starten</div>
            </a>
            
            <a href="/reports" className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
              <div className="text-lg font-semibold text-gray-900">Berichte</div>
              <div className="text-sm text-gray-600">Auswertungen</div>
            </a>
            
            <a href="/team" className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <div className="text-lg font-semibold text-gray-900">Team</div>
              <div className="text-sm text-gray-600">Mitarbeiter</div>
            </a>
            
            <a href="/projects" className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
              <div className="text-lg font-semibold text-gray-900">Projekte</div>
              <div className="text-sm text-gray-600">Verwalten</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
