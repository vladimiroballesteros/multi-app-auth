import React, { useEffect, useState } from 'react';

function LoginRedirect() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = 'http://localhost:3000'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Autenticado
          </h2>
          <p className="text-gray-600">
            Debes iniciar sesión en la aplicación principal para acceder a esta aplicación.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            Redirigiendo a la aplicación principal en{' '}
            <span className="font-semibold text-blue-600">{countdown}</span> segundos...
          </p>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => window.location.href = 'http://localhost:3000'}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ir Ahora
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRedirect;