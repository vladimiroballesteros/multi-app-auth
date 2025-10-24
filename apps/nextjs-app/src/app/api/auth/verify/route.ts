import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/sessions';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value
    console.log('Verificando sesión, cookie sessionId:', sessionId)
    console.log('Total de sesiones activas:', sessionStore.size())

    if (!sessionId) {
      console.log('No hay cookie de sesión')
      return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    const session = sessionStore.get(sessionId)
    console.log('Sesión encontrada:', session ? 'Sí' : 'No')
    
    if (!session) {
      console.log('Sesión no encontrada en almacenamiento')
      const response = NextResponse.json({ authenticated: false }, { status: 200 })
      response.cookies.delete('sessionId')
      return response
    }

    console.log('Sesión válida para usuario:', session.user)
    return NextResponse.json({
      authenticated: true,
      user: session.user
    }, { status: 200 })

  } catch (error) {
    console.error('Error verificando autenticación:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}