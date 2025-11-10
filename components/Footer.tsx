// components/Footer.tsx
"use client"
import { Clock, Github, Twitter, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      padding: '4rem 1rem 2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <Clock style={{ width: '2rem', height: '2rem', color: '#34d399' }} />
              <span style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                TimeTracker Pro
              </span>
            </div>
            <p style={{
              color: '#94a3b8',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Professionelle Zeiterfassung mit intelligenten Analytics und Team-Features. 
              Vertraut von tausenden Profis weltweit.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#cbd5e1',
                fontSize: '0.875rem'
              }}>
                <Phone style={{ width: '1rem', height: '1rem' }} />
                <span>+49 (0) 123 456 789</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#cbd5e1',
                fontSize: '0.875rem'
              }}>
                <Mail style={{ width: '1rem', height: '1rem' }} />
                <span>hallo@timetracker.pro</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Produkt
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <li><Link href="/features" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Features</Link></li>
              <li><Link href="/pricing" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Preise</Link></li>
              <li><Link href="/demo" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Live Demo</Link></li>
              <li><Link href="/integrations" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Integrationen</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Unternehmen
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <li><Link href="/about" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Über uns</Link></li>
              <li><Link href="/blog" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Blog</Link></li>
              <li><Link href="/careers" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Karriere</Link></li>
              <li><Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#34d399'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Kontakt</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{
            color: '#64748b',
            textAlign: 'center',
            margin: 0
          }}>
            © 2024 TimeTracker Pro. Alle Rechte vorbehalten.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <a href="#" style={{
              color: '#94a3b8',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.color = '#34d399';
              e.currentTarget.style.background = 'rgba(52, 211, 153, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.background = 'transparent';
            }}>
              <Github style={{ width: '1.25rem', height: '1.25rem' }} />
            </a>
            <a href="#" style={{
              color: '#94a3b8',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.color = '#34d399';
              e.currentTarget.style.background = 'rgba(52, 211, 153, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.background = 'transparent';
            }}>
              <Twitter style={{ width: '1.25rem', height: '1.25rem' }} />
            </a>
            <a href="#" style={{
              color: '#94a3b8',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.color = '#34d399';
              e.currentTarget.style.background = 'rgba(52, 211, 153, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.background = 'transparent';
            }}>
              <Mail style={{ width: '1.25rem', height: '1.25rem' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}