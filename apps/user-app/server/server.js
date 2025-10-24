import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());

// Servir archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, '../dist')));

// Simulación de almacenamiento de sesiones
const sessions = new Map();

// Middleware para verificar autenticación
const requireAuth = async (req, res, next) => {
  const sessionId = req.cookies.sessionId

  console.log('User App - Verificando sesión:', sessionId);

  if (!sessionId) {
    console.log('User App - No hay cookie de sesión');
    return res.status(401).json({ error: 'No autenticado' });
  }

  // Verificar con la aplicación Next.js
  try {
    const response = await fetch('http://localhost:3000/api/auth/verify', {
      headers: {
        Cookie: `sessionId=${sessionId}`
      }
    })
    
    const data = await response.json();
    console.log('User App - Respuesta de verificación:', data);
    
    if (data.authenticated) {
      // Crear sesión local en la user app
      sessions.set(sessionId, {
        user: data.user,
        createdAt: new Date().toISOString()
      })
      req.user = data.user
      console.log('User App - Sesión válida para:', data.user)
      return next()
    } else {
      console.log('User App - Sesión inválida en Next.js')
      return res.status(401).json({ error: 'Sesión inválida' })
    }
  } catch (error) {
    console.error('User App - Error verificando sesión:', error)
    return res.status(401).json({ error: 'Error verificando sesión' })
  }
}

// Rutas de API
app.get('/api/user/profile', requireAuth, (req, res) => {
  res.json({
    user: req.user,
    message: 'Perfil de usuario desde la aplicación externa',
    app: 'User App'
  })
})

app.post('/api/user/action', requireAuth, (req, res) => {
  res.json({
    success: true,
    message: 'Acción realizada exitosamente en la aplicación externa',
    data: req.body,
    app: 'User App'
  })
})

// Ruta para debug de sesiones
app.get('/api/user/debug', (req, res) => {
  res.json({
    sessions: Array.from(sessions.entries()),
    total: sessions.size,
    app: 'User App Debug'
  })
})

// Manejar todas las rutas para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`User app server running on http://localhost:${PORT}`)
  console.log(`Serving static files from: ${path.join(__dirname, '../dist')}`)
})