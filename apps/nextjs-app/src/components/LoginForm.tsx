'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [phone, setPhone] = useState('+1234567890');
  const [otp, setOtp] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Enviando solicitud de login...')
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp }),
        credentials: 'include'
      })

      const data = await response.json()
      console.log('Respuesta del login:', data)

      if (response.ok) {
        console.log('Login exitoso')
        // Usar window.location para forzar recarga completa
        window.location.href = '/dashboard'
      } else {
        console.error('Error en login:', data.error)
        setError(data.error || 'Error en el inicio de sesión')
      }
    } catch (err) {
      console.error('Error de conexión:', err)
      setError('Error de conexión con el servidor')
    } finally {
      setLoading(false)
    }
  }

  // Verificar si ya está autenticado al cargar el componente
  useState(() => {
    fetch('/api/auth/verify', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (data.authenticated) {
          console.log('Ya autenticado, redirigiendo...')
          window.location.href = '/dashboard'
        }
      })
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Iniciar Sesión</h2>
        
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800 text-center">
            <strong>Credenciales de prueba:</strong><br />
            Teléfono: <code className="bg-blue-100 px-1 rounded">+1234567890</code><br />
            OTP: <code className="bg-blue-100 px-1 rounded">123456</code>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded text-xs">
          <p className="font-semibold mb-2">Debug Info:</p>
          <p>Phone: {phone}</p>
          <p>OTP: {otp}</p>
          <p>Loading: {loading ? 'Yes' : 'No'}</p>
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    </div>
  )
}