import React, { useState, useEffect } from 'react';
import UserDashboard from './components/UserDashboard';
import LoginRedirect from './components/LoginRedirect';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication()
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        setIsAuthenticated(true)
        setUser(data.user)
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const handleReturnToHome = () => {
    window.location.href = 'http://localhost:3000/dashboard'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Verificando autenticación...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginRedirect />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserDashboard user={user} onReturnToHome={handleReturnToHome} />
    </div>
  )
}

export default App;