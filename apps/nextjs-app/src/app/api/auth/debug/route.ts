import { NextResponse } from 'next/server';
import { sessionStore } from '@/lib/sessions';

export async function GET() {
  const sessions = sessionStore.getAll()

  return NextResponse.json({
    totalSessions: sessionStore.size(),
    sessions: sessions,
    timestamp: new Date().toISOString()
  })
};