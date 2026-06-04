# 🗺️ ROADMAP GENERAL — Apartamentos Rojo y Naranja
> **Repositorio:** https://github.com/davidqueroldev/Rojo_y_Naranja_Apartamentos  
> **Stack:** Next.js 14 · Tailwind CSS · Supabase · Stripe · Vercel · Claude API  
> **Última actualización:** Junio 2025

---

## 📌 CÓMO USAR ESTE BANCO DE MEMORIA

Este directorio contiene un archivo `.md` por módulo técnico. Cada archivo es **autocontenido**: puedes pegarlo en una nueva sesión de Claude y retomar el trabajo exactamente donde lo dejaste.

```
memory-bank/
├── 00_ROADMAP_GENERAL.md        ← Este archivo (visión completa)
├── 01_SETUP_Y_ARQUITECTURA.md
├── 02_BASE_DE_DATOS.md
├── 03_AUTENTICACION_Y_ROLES.md
├── 04_LANDING_PAGE.md
├── 05_RESERVAS_Y_DISPONIBILIDAD.md
├── 06_STRIPE_PAGOS.md
├── 07_PANEL_USUARIO.md
├── 08_DASHBOARD_PROPIETARIO.md
├── 09_CHAT_HIBRIDO_IA.md
├── 10_EMAIL_TRANSACCIONAL.md
├── 11_SEO_TECNICO.md
├── 12_ANALYTICS.md
├── 13_TESTING_QA.md
└── 14_DESPLIEGUE_GOLIVE.md
```

**Instrucción para nuevas sesiones:**
> "Trabajamos en el proyecto Apartamentos Rojo y Naranja (repo: github.com/davidqueroldev/WEB_ROJO_Y_NARANJA). Lee el contexto y continúa donde lo dejamos: [pega el .md del módulo en curso]"

---

## 🎓 SPRINTS DEL PROGRAMA FORMATIVO (4Geeks)

Estado actual del programa y mapeo con los módulos técnicos.

| ID | Sprint | Tarea | Tipo | Estado | Módulo técnico |
|----|--------|-------|------|--------|----------------|
| 1 | S1 · Planificación | Definir idea y alcance | Diseño | ✅ Completada | M1 |
| 2 | S1 · Planificación | Configurar repo GitHub | Setup | ✅ Completada | M1 |
| 3 | S1 · Planificación | Crear backlog en GitHub Projects | Setup | ✅ Pendiente | M1 |
| 4 | S1 · Planificación | Definir stack, DB, deploy | Diseño | ✅ Completada | M1 |
| 5 | S1 · Planificación | Completar módulo Full Stack con IA | Formación | ✅ Completada | — |
| 6 | S1 · Planificación | Primer commit con README y estructura | Código | ✅ Completada | M1 |
| 7 | S2 · Core | Diseñar y crear BD / modelos | Backend | 🔄 En progreso | **M2** |
| 8 | S2 · Core | API REST: endpoints CRUD principales | Backend | 🔄 En progreso | **M2 / M5** |
| 9 | S2 · Core | Configurar variables de entorno (.env) | Backend | 🔄 En progreso | **M1** |
| 10 | S2 · Core | Tests endpoints Postman/ThunderClient | QA | 🚫 Bloqueada | M13 |
| 11 | S2 · Core | Documentar rutas API en README | Docs | 🚫 Bloqueada | M13 |
| 12 | S2 · Core | Demo mentoría S2 | Scrum | ✅ Completada | — |
| 13 | S3 · Auth | Implementar registro e inicio de sesión | Backend | ⬜ Pendiente | **M3** |
| 14 | S3 · Auth | Auth JWT: generación y validación | Backend | ⬜ Pendiente | **M3** |
| 15 | S3 · Auth | Proteger rutas privadas con middleware | Backend | ⬜ Pendiente | **M3** |
| 16 | S3 · Auth | Vistas React: Login y Register | Frontend | ⬜ Pendiente | **M3** |
| 17 | S3 · Auth | Gestión estado global (Context/Redux) | Frontend | ⬜ Pendiente | **M3** |
| 18 | S3 · Auth | Demo mentoría S3 | Scrum | ⬜ Pendiente | — |
| 19 | S4 · Mejoras | Funcionalidades complementarias | Código | ⬜ Pendiente | M7 / M8 / M9 |
| 20 | S4 · Mejoras | Refactoring: limpiar código | QA | ⬜ Pendiente | M13 |
| 21 | S4 · Mejoras | Mejorar UX: loading, errores, feedback | Frontend | ⬜ Pendiente | M7 / M8 |
| 22 | S4 · Mejoras | Revisión técnica (Dojo) | Scrum | ⬜ Pendiente | — |
| 23 | S4 · Mejoras | Actualizar README con nuevas features | Docs | ⬜ Pendiente | — |
| 24 | S4 · Mejoras | Demo mentoría S4 | Scrum | ⬜ Pendiente | — |
| 25 | S5 · Deploy | Deploy backend en producción | Deploy | ⬜ Pendiente | **M14** |
| 26 | S5 · Deploy | Deploy frontend en producción (Vercel) | Deploy | ⬜ Pendiente | **M14** |
| 27 | S5 · Deploy | Verificar app funcional en URL pública | QA | ⬜ Pendiente | **M14** |
| 28 | S5 · Deploy | README completo con capturas | Docs | ⬜ Pendiente | — |
| 29 | S5 · Deploy | Grabar video demo (máx. 3 min) | Entrega | ⬜ Pendiente | — |
| 30 | S5 · Deploy | Demo mentoría S5 | Scrum | ⬜ Pendiente | — |
| 32 | S6 · Cierre | Vídeo Demo Day | Entrega | ⬜ Pendiente | — |
| 33 | S6 · Cierre | Post LinkedIn (repo + deploy + reflexión) | Entrega | ⬜ Pendiente | — |
| 35 | S6 · Cierre | Plan de 30 días: siguientes pasos | Carrera | ⬜ Pendiente | — |
| 36 | S6 · Cierre | Feedback mentor y cierre programa | Scrum | ⬜ Pendiente | — |

---

## 🏗️ MÓDULOS TÉCNICOS — ESTADO Y DEPENDENCIAS

| # | Módulo | Estado | Sprint programa | Prioridad |
|---|--------|--------|-----------------|-----------|
| M1 | Setup & Arquitectura | 🔄 En progreso | S1 | 🔴 Crítico |
| M2 | Base de datos (Supabase) | 🔄 En progreso | S2 | 🔴 Crítico |
| M3 | Autenticación & Roles | ⬜ Pendiente | S3 | 🔴 Crítico |
| M4 | Landing Page | ⬜ Pendiente | S2/S4 | 🔴 Crítico |
| M5 | Reservas & Disponibilidad | ⬜ Pendiente | S2/S4 | 🔴 Crítico |
| M6 | Pagos con Stripe | ⬜ Pendiente | S4 | 🔴 Crítico |
| M7 | Panel de usuario | ⬜ Pendiente | S4 | 🟠 Alto |
| M8 | Dashboard propietario | ⬜ Pendiente | S4 | 🟠 Alto |
| M9 | Chat híbrido IA/Manual | ⬜ Pendiente | S4 | 🟠 Alto |
| M10 | Email transaccional | ⬜ Pendiente | S4 | 🟠 Alto |
| M11 | SEO técnico | ⬜ Pendiente | S4/S5 | 🟡 Medio |
| M12 | Analytics básico | ⬜ Pendiente | S5 | 🟡 Medio |
| M13 | Testing & QA | ⬜ Pendiente | S2/S5 | 🟡 Medio |
| M14 | Despliegue & Go-live | ⬜ Pendiente | S5 | 🔴 Crítico |

### Árbol de dependencias

```
M1 (Setup)
  └─► M2 (Base de datos)
        └─► M3 (Auth & Roles)
              ├─► M4 (Landing)
              ├─► M5 (Reservas)  ◄── S2 en progreso
              │     └─► M6 (Stripe)
              │           ├─► M7 (Panel usuario)
              │           └─► M8 (Dashboard propietario)
              │                 └─► M9 (Chat IA)
              └─► M10 (Emails)  ◄── se alimenta de M6 y M8

M11 (SEO) ──────────────► M4
M12 (Analytics) ─────────► M8
M13 (Testing) ───────────► Todos
M14 (Deploy) ────────────► Todos completados
```

---

## 📅 TIMELINE ESTIMADO

```
Semana 1  │ M1 completo · M2 completo · inicio M3         │ S1 ✅ · S2 🔄
Semana 2  │ M3 completo · M4 visible · inicio M5          │ S3
Semana 3  │ M5 + M6 completos · inicio M7/M8              │ S4
Semana 4  │ M7 + M8 completos · M9 (chat IA)              │ S4
Semana 5  │ M10 + M11 + M12 · inicio M13                  │ S5
Semana 6  │ M13 + M14 · go-live · Demo Day                │ S5 · S6
```

---

## 🧠 DECISIONES TÉCNICAS GLOBALES

| Decisión | Alternativas | Razón | Sprint |
|----------|-------------|-------|--------|
| Next.js 14 App Router | Pages Router | SSR nativo, layouts anidados, metadatos por ruta | S1 |
| Supabase Auth (no JWT custom) | NextAuth, Clerk, JWT propio | Todo en uno con la DB, RLS nativo, menos código | S1 |
| Supabase Realtime para chat | Socket.io, Pusher | Ya incluido en Supabase, sin infraestructura extra | S1 |
| Stripe Checkout hosted | Stripe Elements custom | PCI compliance delegado, más rápido de implementar | S1 |
| Resend para emails | Nodemailer/Gmail SMTP | React Email + API simple + alta entregabilidad | S1 |
| Claude API vía webhook Vercel | Supabase Edge Function | Logs en Vercel, mismo entorno, más control | S1 |
| Vercel para deploy | Render, Railway, Netlify | Integración nativa con Next.js, previews por PR | S1 |

---

## 🔗 RECURSOS Y ENLACES CLAVE

| Recurso | URL |
|---------|-----|
| Repositorio GitHub | https://github.com/davidqueroldev/WEB_ROJO_Y_NARANJA |
| Web de referencia | https://www.escapadarural.com/casa-rural/castellon/apartamentos-rojo-y-naranja |
| Supabase Dashboard | — (añadir al crear proyecto) |
| Vercel Dashboard | — (añadir al crear proyecto) |
| Stripe Dashboard | — (añadir al crear cuenta) |
| Docs Next.js | https://nextjs.org/docs |
| Docs Supabase | https://supabase.com/docs |
| Docs Stripe | https://docs.stripe.com |
| Docs Anthropic | https://docs.anthropic.com |

---

*Fichero maestro · No editar módulos aquí · Ver cada `0X_NOMBRE.md` para detalle*
