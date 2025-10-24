# Sistema de Autenticación Multi-App

Este proyecto demuestra la integración de múltiples aplicaciones con autenticación compartida usando sesiones.

## Estructura del Proyecto

multi-app-auth/
├── apps/
│ ├── nextjs-app/ # Aplicación Next.js principal
│ └── user-app/ # Aplicación de usuario (React + Express)
├── shared/ # Código compartido (futuro)
└── package.json # Configuración global con workspaces

## Tecnologías aplicada

- **Next.js 14** con App Router
- **React 18** con TypeScript
- **Node.js** con Express
- **Autenticación** con sesiones y cookies
- **Tailwind CSS** para estilos

## Configuración del Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd multi-app-auth
   

2. ### Instalar dependencias generales
   npm install

3. ### Instalar dependencias de cada aplicación
    # Next.js App
    cd apps/nextjs-app
    npm install

    # User App
    cd ../user-app
    npm install

4. ### Ejecutar de forma global de aplicación con
    # Desde la raíz del proyecto
    cd multi-app-auth
    npm run dev

    #### y si desea realizala por separado 
    #### Terminal 1 - Next.js App:
    cd apps/nextjs-app
    npm run dev

    #### Terminal 2 - User App::
    cd apps/user-app
    npm run build
    npm run dev:server

5. ### URLs de Desarrollo
    #### Next.js App: http://localhost:3000

    #### User App: http://localhost:3001

    #### Vite Dev Server: http://localhost:3002

6. ###Credenciales de Prueba
    #### Teléfono: +1234567890
    #### OTP: 123456





