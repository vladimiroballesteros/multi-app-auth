// Almacenamiento global compartido para sesiones

class SessionStore {
  private sessions: Map<string, any> = new Map();

  create(sessionId: string, sessionData: any) {
    console.log('Creando sesión:', sessionId);
    this.sessions.set(sessionId, {
      ...sessionData,
      id: sessionId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
    });
    console.log('Sesiones activas:', this.sessions.size);
  }

  get(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (session && new Date(session.expiresAt) < new Date()) {
      console.log('Sesión expirada:', sessionId);
      this.delete(sessionId);
      return null;
    }
    return session;
  }

  delete(sessionId: string) {
    console.log('Eliminando sesión:', sessionId);
    this.sessions.delete(sessionId);
    console.log('Sesiones activas después de eliminar:', this.sessions.size);
  }

  getAll() {
    return Array.from(this.sessions.entries()).map(([id, session]) => ({
      id,
      ...session
    }));
  }

  size() {
    return this.sessions.size;
  }
}

// Exportar una instancia única (singleton)
export const sessionStore = new SessionStore();