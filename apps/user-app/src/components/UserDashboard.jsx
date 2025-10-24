import React, { useState } from 'react';

function UserDashboard({ user, onReturnToHome }) {
  const [actionResult, setActionResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUserAction = async () => {
    setLoading(true)
    setActionResult(null)

    try {
      const response = await fetch('/api/user/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sample_action',
          timestamp: new Date().toISOString(),
          message: 'Esta es una acción de prueba desde la User App'
        }),
        credentials: 'include'
      })

      const data = await response.json()
      setActionResult(data)
    } catch (error) {
      setActionResult({ 
        error: 'Error realizando la acción',
        details: error.message 
      })
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        credentials: 'include'
      })
      const data = await response.json()
      console.log('🔗 Test connection:', data)
      setActionResult(data)
    } catch (error) {
      console.error('Test connection failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Aplicación de Usuario
              </h1>
              <p className="text-gray-600 mt-2">
                Aplicación externa integrada con autenticación compartida
              </p>
            </div>
            <button
              onClick={onReturnToHome}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              ← Volver a Casa
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Información del Usuario
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-800">
                      Nombre
                    </label>
                    <p className="text-lg text-gray-900 font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-800">
                      Teléfono
                    </label>
                    <p className="text-lg text-gray-900 font-semibold">{user.phone}</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded">
                  <p className="text-green-800 font-semibold flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    ✓ Autenticado mediante cookies de sesión compartidas
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Acciones Disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleUserAction}
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                {loading ? 'Procesando...' : 'Realizar Acción de Ejemplo'}
              </button>
              
              <button
                onClick={testConnection}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                🔗 Probar Conexión
              </button>
            </div>
          </div>

          {/* Results */}
          {actionResult && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-2 text-gray-800">Resultado:</h3>
              <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                {JSON.stringify(actionResult, null, 2)}
              </pre>
            </div>
          )}

          {/* Integration Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Información de Integración
            </h3>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 shadow-sm">
              <ul className="list-disc list-inside space-y-2 text-yellow-800">
                <li>Autenticación compartida mediante cookies de sesión</li>
                <li>Comunicación entre aplicaciones en diferentes puertos</li>
                <li>Navegación fluida sin necesidad de re-autenticación</li>
                <li>Sesión persistente entre aplicaciones</li>
                <li>Arquitectura multi-app con React + Express</li>
              </ul>
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded">
            <h3 className="font-semibold text-purple-800 mb-2">Información Técnica:</h3>
            <div className="text-sm text-purple-700 space-y-1">
              <p>Servidor: Express.js en puerto 3001</p>
              <p>Cliente: React + Vite</p>
              <p>API: /api/user/*</p>
              <p>Ruta actual: {window.location.href}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard