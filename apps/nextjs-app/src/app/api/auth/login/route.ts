import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/lib/sessions';

// Simulación del almacenamiento de los datos en una base de datos
const users = [
  { phone: '+1234567890', otp: '123456', name: 'Usuario Demo' }
]

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json()
    
    console.log('Intento de login:', { phone, otp })

    const user = users.find(u => u.phone === phone && u.otp === otp)
    
    if (!user) {
      console.log('Credenciales incorrectas')
      return NextResponse.json(
        { error: 'Teléfono o OTP incorrecto' },
        { status: 401 }
      )
    }

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    sessionStore.create(sessionId, {
      userId: phone,
      user: { phone: user.phone, name: user.name }
    })

    const response = NextResponse.json(
      { 
        success: true, 
        user: { phone: user.phone, name: user.name },
        redirectUrl: '/dashboard'
      },
      { status: 200 }
    )

    // Configurar cookie
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/'
    })

    console.log('Cookie configurada:', sessionId)
    return response

  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}