# M4 — LANDING PAGE PÚBLICA
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S2/S4 · Estado: ⬜ Pendiente

---

## 🎯 Objetivo
Landing de alto impacto visual que convierta visitantes en reservas directas. Cero comisiones a terceros.

## 📊 Estado actual

| Tarea | Estado |
|-------|--------|
| Sistema de colores Tailwind | ⬜ Pendiente |
| Sección Hero + Buscador | ⬜ Pendiente |
| Cards de los 4 apartamentos | ⬜ Pendiente |
| Galería con lightbox | ⬜ Pendiente |
| Sección reseñas | ⬜ Pendiente |
| Mapa de ubicación | ⬜ Pendiente |
| Página detalle apartamento | ⬜ Pendiente |
| Navbar sticky | ⬜ Pendiente |

---

## 🎨 Sistema de diseño (Tailwind)

```javascript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      rojo:    { DEFAULT: '#C0392B', dark: '#962d22', light: '#e74c3c' },
      naranja: { DEFAULT: '#E67E22', dark: '#ca6f1e', light: '#f0a500' },
      crema:   { DEFAULT: '#FDF6EC' },
      piedra:  { DEFAULT: '#8D8078' },
    },
    fontFamily: {
      serif:  ['Playfair Display', 'serif'],
      sans:   ['Inter', 'sans-serif'],
    }
  }
}
```

---

## 🏗️ Secciones de la landing

### 1. Navbar
- Logo + nombre "Apartamentos Rojo y Naranja"
- Links: Apartamentos · Galería · Morella · Contacto
- CTA "Reservar" (color rojo, destacado)
- Avatar / Login si autenticado
- Sticky con fondo semitransparente al hacer scroll

### 2. Hero
- Imagen de fondo: foto panorámica de Morella o del Ático Oro
- Titular: "Escapada de diseño en el corazón de Morella"
- Subtítulo: "4 apartamentos boutique · Jacuzzi · Terraza privada"
- **Buscador inline**: [Apartamento ▾] [Entrada 📅] [Salida 📅] [Personas ▾] [Buscar →]

### 3. Los apartamentos (4 cards)
Datos desde Supabase (`/api/apartamentos`):
- Foto principal
- Nombre + badge capacidad
- Íconos de amenities destacados
- "Desde 85€/noche"
- Badge "Solo adultos" si `acepta_ninos = false`
- CTA "Ver detalles" → `/apartamentos/[slug]`

### 4. Por qué reservar directo
- 🏘️ Centro histórico de Morella
- ✨ Diseño moderno y contemporáneo
- 🛁 Jacuzzi y spa en habitación
- 📵 Sin comisiones · Atención directa

### 5. Galería
- Grid masonry con fotos de todos los apartamentos
- Lightbox al clic (librería: `yet-another-react-lightbox`)
- Filtros por apartamento

### 6. Morella te espera
- Foto del pueblo + texto descriptivo
- Lista de actividades: senderismo, gastronomía, castillo, dinosaurios, astroturismo
- Puntos de interés: Iglesia Santa María, Castillo, Museos

### 7. Reseñas
- Carrusel con las 10 opiniones importadas de EscapadaRural
- Valoración media: ⭐ 10/10
- Foto avatar + nombre + texto + fecha

### 8. Mapa
- Leaflet.js (sin API key) centrado en C/ San Nicolás, 11
- Pins: el alojamiento + restaurantes + monumentos cercanos

### 9. CTA final
- Banner: "Reserva directa · Sin comisiones · Mejor precio garantizado"
- Botón grande: "Ver disponibilidad"

### 10. Footer
- Datos: C/ San Nicolás, 11 · Morella (Castellón)
- Teléfono + email
- Nº registro: 23750-CS · 23751-CS · 27852-CS · 27853-CS
- Aviso legal · Privacidad
- Redes sociales

---

## 📄 Página detalle apartamento `/apartamentos/[slug]`

```
- Galería de fotos específica (carrusel)
- Descripción completa del apartamento
- Grid de amenities con iconos
- Aviso si no acepta niños (Plata y Oro)
- Calendario de disponibilidad (solo lectura para invitados)
- Calculadora de precio (fechas → precio total)
- CTA "Reservar" → /login si invitado, /reservas/nueva si autenticado
- Sección "Otros apartamentos"
```

### Slugs y restricciones
| Slug | Capacidad | Niños | Precio base |
|------|-----------|-------|-------------|
| rojo | 1-4 | ✅ | 90€/noche |
| naranja | 1-4 | ✅ | 85€/noche |
| plata | 1-2 | ❌ | 120€/noche |
| oro | 1-2 | ❌ | 150€/noche |

---

## 🔍 SEO por página

```typescript
// app/(public)/apartamentos/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const apt = await getApartamento(params.slug)
  return {
    title: `${apt.nombre} — Apartamentos Rojo y Naranja · Morella`,
    description: apt.descripcion,
    openGraph: { images: [apt.fotos[0]] }
  }
}
```

---

## ✅ Checklist del módulo

- [ ] Tailwind config con paleta personalizada
- [ ] Fuentes Playfair Display + Inter cargadas (next/font)
- [ ] Componente `Navbar` sticky con scroll effect
- [ ] Componente `Hero` con buscador inline
- [ ] Componente `ApartamentoCard` (x4, datos dinámicos)
- [ ] Componente `Galeria` con lightbox
- [ ] Sección reseñas con datos reales importados
- [ ] Mapa Leaflet con pin en C/ San Nicolás, 11
- [ ] Footer completo
- [ ] Página `/apartamentos/[slug]` con datos dinámicos
- [ ] CTA flotante en mobile
- [ ] Responsive testado: mobile, tablet, desktop

---

## 🐛 Problemas conocidos / Notas

> *(Añadir aquí durante el desarrollo)*

---

*Módulo M4 · Depende de: M1, M2, M3 · Ver 00_ROADMAP_GENERAL.md*
