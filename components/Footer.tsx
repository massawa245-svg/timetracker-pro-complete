import Link from 'next/link'
import { Clock, Github, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  TimeTracker Pro
                </h2>
                <p className="text-sm text-gray-400 font-medium">Professional Time Tracking</p>
              </div>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Die professionelle Lösung für Ihre Zeiterfassung. Einfach, intuitiv und leistungsstark - 
              vertraut von tausenden Profis weltweit.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
                <span className="text-sm">Twitter</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Produkt</h3>
            <ul className="space-y-3">
              {[
                { name: 'Features', href: '/features' },
                { name: 'Preise', href: '/pricing' },
                { name: 'Live Demo', href: '/demo' },
                { name: 'Integrationen', href: '/integrations' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-200 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Unternehmen</h3>
            <ul className="space-y-3">
              {[
                { name: 'Über uns', href: '/about' },
                { name: 'Blog', href: '/blog' },
                { name: 'Karriere', href: '/careers' },
                { name: 'Kontakt', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-200 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-gray-300">
              <Phone className="h-5 w-5 text-green-400" />
              <span>+49 (0) 123 456 789</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="h-5 w-5 text-green-400" />
              <span>hallo@timetracker.pro</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <MapPin className="h-5 w-5 text-green-400" />
              <span>Berlin, Deutschland</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
             2024 TimeTracker Pro. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Datenschutz
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Nutzungsbedingungen
            </Link>
            <Link href="/imprint" className="hover:text-white transition-colors duration-200">
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
