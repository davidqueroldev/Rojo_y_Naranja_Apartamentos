# M3 — AUTENTICACIÓN & ROLES
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S3 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Registro, login, confirmación por email y control de acceso por rol (Invitado / Usuario / Propietario).

## 📊 Estado actual

| Tarea | Estado |
|-------|--------|
| Registro e inicio de sesión | ⬜ Pendiente |
| Confirmación por email | ⬜ Pendiente |
| Middleware de rutas | ⬜ Pendiente |
| Vistas React: Login y Register | ⬜ Pendiente |
| Gestión estado global (Context) | ⬜ Pendiente |

---

## 👥 Roles y permisos

| Acción | Invitado | Usuario | Propietario |
|--------|----------|---------|-------------|
| Ver landing y apartamentos | ✅ | ✅ | ✅ |
| Ver disponibilidad | ✅ | ✅ | ✅ |
| Crear reserva | ❌ → /login | ✅ | ✅ |
| Ver sus reservas | ❌ | ✅ | ✅ |
| Chat con propietario | ❌ | ✅ | ✅ |
| Dashboard reservas global | ❌ | ❌ | ✅ |
| Confirmar/Anular reservas | ❌ | ❌ | ✅ |
| Gestionar precios/calendario | ❌ | ❌ | ✅ |
| Toggle IA/Manual chat | ❌ | ❌ | ✅ |

---

## 🔄 Flujo completo de autenticación

```
REGISTRO:
  /register → email + contraseña + nombre
    → Supabase Auth crea usuario en auth.users
    → Trigger on_auth_user_created → inserta en profiles (rol: 'user')
    → Email de confirmación enviado (plantilla personalizada)
    → Usuario hace clic en enlace → /confirm?token=...
    → Cuenta activada → redirect a /user/dashboard

LOGIN:
  /login → email + contraseña
    → Supabase verifica credenciales
    → Middleware lee rol desde profiles
    → rol = 'user'  → redirect /user/dashboard
    → rol = 'owner' → redirect /owner/dashboard

RECUPERAR CONTRASEÑA:
  /reset-password → email
    → Supabase envía email con enlace de reset
    → /reset-password?token=... → nueva contraseña
```

---

## 🛡️ Middleware Next.js

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { /* getAll/setAll handlers */ } }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Sin sesión → a /login
  if (!session && (pathname.startsWith('/user') || pathname.startsWith('/owner'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Rutas owner → verificar rol
  if (pathname.startsWith('/owner') && session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('rol')
      .eq('id', session.user.id)
      .single()

    if (profile?.rol !== 'owner') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/user/:path*', '/owner/:path*']
}
```

---

## 🔧 Configuración Supabase Auth

```typescript
// lib/supabase/client.ts — cliente browser
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// lib/supabase/server.ts — cliente servidor (SSR)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}
```

---

## 🖼️ Vistas de autenticación

### `/register`
- Campos: nombre, email, contraseña, confirmar contraseña
- Validación client-side + server-side
- Mensaje post-registro: "Revisa tu email para confirmar tu cuenta"

### `/login`
- Campos: email, contraseña
- Enlace "¿Olvidaste tu contraseña?"
- Enlace "¿No tienes cuenta? Regístrate"
- Redirección post-login según rol

### `/confirm`
- Procesa el token de Supabase Auth
- Mensaje de éxito + redirect automático a /user/dashboard

### `/reset-password`
- Paso 1: introducir email → enviar enlace
- Paso 2: nueva contraseña (con token de URL)

---

## 🌐 Estado global (Zustand)

```typescript
// store/authStore.ts
import { create } from 'zustand'

interface AuthStore {
  user: User | null
  role: 'user' | 'owner' | null
  setUser: (user: User | null) => void
  setRole: (role: 'user' | 'owner' | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  role: null,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
}))
```

---

## ✅ Checklist del módulo

- [ ] Supabase Auth configurado (proveedor email habilitado)
- [ ] Plantilla de email de confirmación personalizada (branding rojo/naranja)
- [ ] Trigger `on_auth_user_created` activo (ver M2)
- [ ] `/register` implementado y funcional
- [ ] `/login` implementado y funcional
- [ ] `/confirm` implementado y funcional
- [ ] `/reset-password` implementado y funcional
- [ ] Middleware Next.js protegiendo rutas /user/* y /owner/*
- [ ] Hook `useAuthStore` con Zustand
- [ ] Hook `useUser()` disponible en componentes
- [ ] Redireccionamiento correcto según rol post-login
- [ ] Prueba manual: registro → confirm email → login → dashboard

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M3 · Depende de: M1, M2 · Necesario para: M4, M5, M7, M8 · Ver 00_ROADMAP_GENERAL.md*
