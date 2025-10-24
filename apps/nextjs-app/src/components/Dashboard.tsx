'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  phone: string
  name: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log('🔍 Verificando autenticación...')
      const response = await fetch('/api/auth/verify', {
        credentials: 'include',
        cache: 'no-store'
      })
      
      const data = await response.json()
      console.log('Estado de autenticación:', data)

      if (data.authenticated) {
        setUser(data.user)
        setAuthStatus('authenticated')
        console.log('Usuario autenticado:', data.user)
      } else {
        setAuthStatus('unauthenticated')
        console.log(' Usuario no autenticado')
        // Usar replace en lugar de push para evitar historial
        router.replace('/')
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error)
      setAuthStatus('unauthenticated')
      router.replace('/')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      console.log('Cerrando sesión...')
      const response = await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      })
      
      const data = await response.json()
      console.log('📨 Respuesta de logout:', data)

      if (data.success) {
        // Forzar recarga completa para limpiar estado
        window.location.href = '/'
      } else {
        console.error('Error en logout:', data.error)
      }
    } catch (error) {
      console.error('Error cerrando sesión:', error)
      // Fallback: redirigir directamente
      window.location.href = '/'
    }
  }

  const redirectToUserApp = () => {
    console.log('Redirigiendo a aplicación de usuario...')
    window.location.href = 'http://localhost:3001'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          Verificando autenticación...
        </div>
      </div>
    )
  }

  if (authStatus !== 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">No autenticado</div>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Volver al Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <div className="mt-2 flex items-center space-x-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">Autenticado</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Información del Usuario</h2>
              <div className="bg-gray-50 p-4 rounded border">
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Teléfono:</strong> {user.phone}</p>
              </div>
            </div>
          )}

          {/* Applications */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Aplicaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Aplicación Next.js</h3>
                <p className="text-gray-600 mb-4">Esta es la aplicación principal</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Activa
                </span>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Aplicación de Usuario</h3>
                <p className="text-gray-600 mb-4">Aplicación externa integrada</p>
                <button
                  onClick={redirectToUserApp}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Reanudar Aplicación
                </button>
              </div>
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h3 className="font-semibold text-yellow-800 mb-2">Información de Depuración:</h3>
            <div className="space-y-2 text-sm">
              <p>Usuario: {user?.name} ({user?.phone})</p>
              <p>Estado: {authStatus}</p>
              <p>
                <button 
                  onClick={() => fetch('/api/auth/debug').then(r => r.json()).then(console.log)}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                >
                  Ver Sesiones Activas
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}