// components/Header.tsx
"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Clock, BarChart3, Home, User, LogOut, Users, Timer, Calendar, Crown } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout, isManager } = useAuth()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen)
  
  const closeAllMenus = () => {
    setIsMenuOpen(false)
    setUserMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    setIsMenuOpen(false)
  }

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" }
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  }

  const userMenuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -10 },
    open: { opacity: 1, scale: 1, y: 0 }
  }

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Zeiterfassung', href: '/dashboard/timer', icon: Timer },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Wochenplan', href: '/dashboard/schedule', icon: Calendar },
  ]

  if (isManager) {
    navigation.push({ name: 'Manager', href: '/dashboard/manager', icon: Crown })
  }

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={headerContentStyle}>
          {/* Logo */}
          <Link href="/" style={logoStyle} onClick={closeAllMenus}>
            <Clock style={logoIconStyle} />
            <span style={logoTextStyle}>TimeTracker Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={desktopNavStyle}>
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={navLinkStyle}
                  className="nav-link"
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Bereich */}
          <div style={userAreaStyle}>
            {user ? (
              // EINGELOGGT
              <div style={userInfoDesktopStyle} className="user-info-desktop">
                <span style={welcomeTextStyle}>
                  Hallo, <strong>{user.name}</strong>! 👋
                </span>
                <div style={userMenuContainerStyle}>
                  <button 
                    onClick={toggleUserMenu} 
                    style={userMenuButtonStyle}
                    className="user-menu-button"
                  >
                    <User size={20} />
                  </button>
                  
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        variants={userMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={userDropdownStyle}
                      >
                        <div style={userDropdownHeaderStyle}>
                          <div style={userNameStyle}>{user.name}</div>
                          <div style={userEmailStyle}>{user.email}</div>
                          <div style={userRoleStyle}>
                            {user.role === 'manager' ? '👑 Manager' : '👨‍💼 Mitarbeiter'}
                          </div>
                        </div>
                        
                        <div style={dropdownDividerStyle}></div>
                        
                        <button 
                          onClick={handleLogout} 
                          style={logoutButtonStyle}
                          className="logout-button"
                        >
                          <LogOut size={16} />
                          Abmelden
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              // NICHT EINGELOGGT
              <div style={authButtonsStyle} className="auth-buttons">
                <Link href="/auth/login" style={loginBtnStyle} className="login-btn">
                  Login
                </Link>
                <Link href="/auth/register" style={registerBtnStyle} className="register-btn">
                  Registrieren
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu} 
              style={mobileMenuBtnStyle}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={mobileMenuStyle}
            >
              <motion.div style={mobileMenuContentStyle}>
                {/* User Info im Mobile Menu */}
                {user && (
                  <div style={mobileUserInfoStyle}>
                    <div style={mobileUserAvatarStyle}>
                      <User size={24} />
                    </div>
                    <div style={mobileUserDetailsStyle}>
                      <div style={mobileUserNameStyle}>{user.name}</div>
                      <div style={mobileUserRoleStyle}>
                        {user.role === 'manager' ? 'Manager' : 'Mitarbeiter'}
                      </div>
                    </div>
                  </div>
                )}

                {navigation.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={item.name} variants={itemVariants}>
                      <Link 
                        href={item.href} 
                        style={mobileNavLinkStyle} 
                        onClick={closeAllMenus}
                        className="mobile-nav-link"
                      >
                        <Icon size={22} />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
                
                {/* Auth im Mobile Menu */}
                {user ? (
                  <motion.div variants={itemVariants}>
                    <button 
                      onClick={handleLogout} 
                      style={mobileLogoutButtonStyle}
                      className="mobile-logout-button"
                    >
                      <LogOut size={22} />
                      <span>Abmelden</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div style={mobileAuthButtonsStyle} variants={itemVariants}>
                    <Link 
                      href="/auth/login" 
                      style={mobileLoginBtnStyle} 
                      onClick={closeAllMenus}
                      className="mobile-login-btn"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/auth/register" 
                      style={mobileRegisterBtnStyle} 
                      onClick={closeAllMenus}
                      className="mobile-register-btn"
                    >
                      Registrieren
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CSS Styles */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          
          .auth-buttons {
            display: flex !important;
          }
          
          .user-info-desktop {
            display: flex !important;
          }
          
          .mobile-menu-btn {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .logo-text {
            font-size: 1.5rem !important;
          }
          
          .desktop-nav {
            display: none !important;
          }
          
          .auth-buttons {
            display: none !important;
          }
          
          .user-info-desktop {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex !important;
          }
        }

        /* Hover Effects */
        .nav-link:hover {
          color: #34d399 !important;
          background: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-2px) !important;
        }

        .login-btn:hover {
          background: #f0fdf4 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }

        .register-btn:hover {
          background: #047857 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.15) !important;
        }

        .mobile-nav-link:hover {
          color: #34d399 !important;
          background: rgba(255, 255, 255, 0.1) !important;
        }

        .mobile-login-btn:hover {
          background: #f0fdf4 !important;
          transform: translateY(-2px) !important;
        }

        .mobile-register-btn:hover {
          background: #047857 !important;
          transform: translateY(-2px) !important;
        }

        .user-menu-button:hover {
          background: rgba(255, 255, 255, 0.2) !important;
        }

        .logout-button:hover {
          background: #fef2f2 !important;
        }

        .mobile-logout-button:hover {
          background: rgba(220, 38, 38, 0.1) !important;
          color: #fca5a5 !important;
        }
      `}</style>
    </header>
  )
}

// CSS Styles mit JavaScript Objects
const headerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
  color: 'white',
  boxShadow: '0 4px 25px rgba(0, 0, 0, 0.15)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  height: '80px',
  width: '100%'
}

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
  height: '100%'
}

const headerContentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%'
}

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.875rem',
  textDecoration: 'none',
  height: '100%'
}

const logoIconStyle: React.CSSProperties = {
  height: '36px',
  width: '36px',
  color: '#34d399'
}

const logoTextStyle: React.CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

// Desktop Navigation
const desktopNavStyle: React.CSSProperties = {
  display: 'none',
  alignItems: 'center',
  gap: '0.5rem',
  height: '100%'
}

const navLinkStyle: React.CSSProperties = {
  color: 'white',
  fontWeight: 600,
  textDecoration: 'none',
  borderRadius: '0.75rem',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.25rem',
  fontSize: '1rem',
  height: '48px'
}

// User Area
const userAreaStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  height: '100%'
}

// Desktop User Info
const userInfoDesktopStyle: React.CSSProperties = {
  display: 'none',
  alignItems: 'center',
  gap: '1rem',
  height: '100%'
}

const welcomeTextStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
  color: 'white'
}

const userMenuContainerStyle: React.CSSProperties = {
  position: 'relative'
}

const userMenuButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  height: '44px',
  width: '44px'
}

const userDropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  right: 0,
  background: 'white',
  borderRadius: '0.75rem',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  padding: '1rem',
  minWidth: '220px',
  marginTop: '0.5rem',
  zIndex: 1001
}

const userDropdownHeaderStyle: React.CSSProperties = {
  paddingBottom: '0.75rem'
}

const userNameStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 700,
  color: '#1f2937',
  marginBottom: '0.25rem'
}

const userEmailStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#6b7280',
  marginBottom: '0.5rem'
}

const userRoleStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#059669',
  fontWeight: 600,
  background: '#f0fdf4',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.375rem',
  display: 'inline-block'
}

const dropdownDividerStyle: React.CSSProperties = {
  height: '1px',
  background: '#e5e7eb',
  margin: '0.75rem 0'
}

const logoutButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'transparent',
  border: 'none',
  borderRadius: '0.5rem',
  color: '#dc2626',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '0.875rem'
}

// Auth Buttons
const authButtonsStyle: React.CSSProperties = {
  display: 'none',
  alignItems: 'center',
  gap: '1rem',
  height: '100%'
}

const loginBtnStyle: React.CSSProperties = {
  background: 'white',
  color: '#1e40af',
  padding: '0.75rem 1.5rem',
  borderRadius: '0.75rem',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  fontSize: '1rem',
  height: '44px',
  display: 'flex',
  alignItems: 'center'
}

const registerBtnStyle: React.CSSProperties = {
  background: '#059669',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '0.75rem',
  fontWeight: 600,
  textDecoration: 'none',
  border: '2px solid #60a5fa',
  transition: 'all 0.3s ease',
  fontSize: '1rem',
  height: '44px',
  display: 'flex',
  alignItems: 'center'
}

// Mobile Menu Button
const mobileMenuBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.75rem',
  borderRadius: '0.75rem',
  background: 'transparent',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  height: '48px',
  width: '48px'
}

// Mobile Menu
const mobileMenuStyle: React.CSSProperties = {
  background: '#1e3a8a',
  borderTop: '1px solid rgba(255, 255, 255, 0.15)',
  position: 'absolute',
  left: 0,
  right: 0,
  top: '80px',
  zIndex: 1000,
  overflow: 'hidden'
}

const mobileMenuContentStyle: React.CSSProperties = {
  padding: '1rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
}

const mobileUserInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem 1.5rem',
  background: 'rgba(255, 255, 255, 0.1)',
  margin: '0 0.5rem 1rem 0.5rem',
  borderRadius: '0.75rem'
}

const mobileUserAvatarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '50%',
  color: 'white'
}

const mobileUserDetailsStyle: React.CSSProperties = {
  flex: 1
}

const mobileUserNameStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 700,
  color: 'white',
  marginBottom: '0.25rem'
}

const mobileUserRoleStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#34d399',
  fontWeight: 600
}

const mobileNavLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: 'white',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  borderRadius: '0.75rem',
  margin: '0 0.5rem',
  padding: '1rem 1.5rem',
  fontSize: '1rem'
}

const mobileLogoutButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: '#fca5a5',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  borderRadius: '0.75rem',
  margin: '0 0.5rem',
  padding: '1rem 1.5rem',
  fontSize: '1rem',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  width: 'calc(100% - 1rem)'
}

const mobileAuthButtonsStyle: React.CSSProperties = {
  borderTop: '1px solid rgba(255, 255, 255, 0.15)',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginTop: '0.5rem'
}

const mobileLoginBtnStyle: React.CSSProperties = {
  display: 'block',
  textAlign: 'center',
  background: 'white',
  color: '#1e40af',
  padding: '1rem 1.5rem',
  borderRadius: '0.75rem',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  fontSize: '1rem'
}

const mobileRegisterBtnStyle: React.CSSProperties = {
  display: 'block',
  textAlign: 'center',
  background: '#059669',
  color: 'white',
  padding: '1rem 1.5rem',
  borderRadius: '0.75rem',
  fontWeight: 600,
  textDecoration: 'none',
  border: '2px solid #60a5fa',
  transition: 'all 0.3s ease',
  fontSize: '1rem'
}