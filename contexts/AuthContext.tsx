"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'employee' | 'manager' | 'admin'
  department?: string
  position?: string
  avatar?: string
  timezone?: string
  isActive?: boolean
  lastLogin?: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isManager: boolean
  isAdmin: boolean
  hasRole: (role: string) => boolean
  hasPermission: (permission: string) => boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    setIsLoading(true)
    try {
      // Try to get from localStorage first (client-side)
      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('currentUser')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          setIsLoading(false)
          return
        }
      }
      
      // Try API check if no localStorage data
      const response = await fetch('/api/auth/check')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.user) {
          setUser(data.user)
          if (typeof window !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(data.user))
          }
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      
      if (data.success && data.user) {
        setUser(data.user)
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(data.user))
        }
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      setUser(null)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser')
      }
    }
  }

  const refreshUser = async () => {
    try {
      const response = await fetch('/api/auth/check')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.user) {
          setUser(data.user)
          if (typeof window !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(data.user))
          }
        }
      }
    } catch (error) {
      console.error('Refresh user error:', error)
    }
  }

  const isManager = user?.role === 'manager' || user?.role === 'admin'
  const isAdmin = user?.role === 'admin'
  
  const hasRole = (role: string): boolean => {
    return user?.role === role
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    
    const permissions: { [key: string]: string[] } = {
      employee: [
        'view_schedule', 
        'track_time', 
        'view_own_data',
        'edit_own_profile'
      ],
      manager: [
        'view_schedule', 
        'track_time', 
        'view_own_data',
        'edit_own_profile',
        'manage_schedule', 
        'view_team_data', 
        'approve_requests',
        'export_reports'
      ],
      admin: [
        'view_schedule', 
        'track_time', 
        'view_own_data',
        'edit_own_profile',
        'manage_schedule', 
        'view_team_data', 
        'approve_requests',
        'export_reports',
        'manage_users', 
        'system_settings',
        'view_analytics',
        'manage_departments'
      ]
    }
    
    const userPermissions = permissions[user.role] || []
    return userPermissions.includes(permission)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isManager,
    isAdmin,
    hasRole,
    hasPermission,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
