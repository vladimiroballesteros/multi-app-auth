import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/sessions';

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('sessionId')?.value
    console.log('Cerrando sesión:', sessionId)

    if (sessionId) {
      sessionStore.delete(sessionId)
    }

    const response = NextResponse.json({ 
      success: true,
      message: 'Sesión cerrada correctamente'
    })
    
    // Eliminar cookie
    response.cookies.delete('sessionId')
    console.log('Cookie eliminada')
    
    return response

  } catch (error) {
    console.error('Error cerrando sesión:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}