import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            TimeTracker Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Die professionelle Lösung für Ihre Zeiterfassung. 
            Einfach, intuitiv und leistungsstark.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Einfache Zeiterfassung</h3>
              <p className="text-gray-600">
                Starten und stoppen Sie Timer mit einem Klick. 
                Verfolgen Sie Ihre Zeit mühelos.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detaillierte Reports</h3>
              <p className="text-gray-600">
                Erhalten Sie umfassende Einblicke in Ihre Arbeitszeiten 
                und Projektfortschritte.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="text-4xl mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Management</h3>
              <p className="text-gray-600">
                Verwalten Sie Ihr Team, erstellen Sie Wochenpläne 
                und optimieren Sie die Zusammenarbeit.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bereit zu starten?
            </h2>
            <p className="text-gray-600 mb-6">
              Melden Sie sich an oder registrieren Sie sich, um alle Funktionen 
              von TimeTracker Pro zu entdecken.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/auth/login" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Anmelden
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Registrieren
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
