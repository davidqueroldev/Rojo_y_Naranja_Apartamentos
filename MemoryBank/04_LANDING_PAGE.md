# M4 — LANDING PAGE PÚBLICA
> Proyecto: Apartamentos Rojo y Naranja  
> Sprint programa: S2/S4 · Estado: ✅ En producción (fotos reales integradas)

---

## 🎯 Objetivo
Landing de alto impacto visual que convierta visitantes en reservas directas. Cero comisiones a terceros.

## 📊 Estado actual

| Tarea | Estado |
|-------|--------|
| Sistema de tokens CSS (design system real) | ✅ Completado |
| Fuentes Lora + Montserrat (next/font) | ✅ Completado |
| Navbar sticky dark con versalita + mobile drawer | ✅ Completado |
| Hero con foto real Cloudinary + buscador inline | ✅ Completado |
| Cards de los 4 apartamentos (fotos reales) | ✅ Completado |
| Sección WhySection (ink dark) | ✅ Completado |
| Galería con filtros por tono + lightbox | ✅ Completado |
| Sección reseñas | ✅ Completado |
| Mapa Leaflet (C/ San Nicolás, 11) | ✅ Completado |
| CTA banner final + CTA flotante mobile | ✅ Completado |
| Footer con contacto y registros | ✅ Completado |
| Página detalle `/apartamentos/[slug]` | ✅ Completado |
| Responsive (mobile/tablet/desktop) | ✅ Completado |
| Fotos reales Cloudinary en todos los componentes | ✅ Completado |

---

## 📸 Integración Cloudinary

### Configuración
- **Cloud name:** `dssnptdcf`
- **Credenciales:** en `.env.local` (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
- **`next.config.mjs`:** `images.remotePatterns` configurado para `res.cloudinary.com/dssnptdcf/**`
- **Helper:** `lib/cloudinary.ts` → `cldUrl(publicId, transforms?)` y `cldHero(publicId)`

### Inventario de fotos por carpeta
| Carpeta Cloudinary | Fotos | Uso |
|-------------------|-------|-----|
| `Rojo_y_Naranja/Rojo` | 11 | Apartamento Rojo — card, detalle, galería |
| `Rojo_y_Naranja/Naranja` | 10 | Apartamento Naranja — card, detalle, galería |
| `Rojo_y_Naranja/Plata` | 8 | Apartamento Plata — card, detalle, galería |
| `Rojo_y_Naranja/Oro` | 25 | Ático Oro — card, detalle, galería + **hero landing** |
| `Rojo_y_Naranja/Morella` | 2 | Sección Experiencias (foto Morella) |

> **Nota técnica:** Los `public_id` en Cloudinary NO incluyen el path de la carpeta en la URL.
> La carpeta es solo metadato de organización. La URL base es:
> `https://res.cloudinary.com/dssnptdcf/image/upload/{transforms}/{public_id}`

### Fotos usadas como hero/principal por apartamento
| Apartamento | public_id principal |
|-------------|---------------------|
| Hero landing (Oro) | `53089ab83c023_v5rjfc` |
| Rojo | `60a54435cf19a_qb71bd` |
| Naranja | `530899d541be5_va2iha` |
| Plata | `53089a1e5845d_aquji0` |
| Oro | `53089ab83c023_v5rjfc` |
| Morella | `5f4c2c4626fa8_zpv2q4` |

---

## 🎨 Design System implementado

El design system real ("Rojo y Naranja Design System v1") se implementó como skill de Claude Code
en `.claude/skills/rojo-y-naranja-design/`. Los tokens CSS están en `app/globals.css`.

### Paleta real (del PDF de identidad corporativa)
- Rojo: `#AF2C0E` · Naranja: `#C25437` · Plata: `#CB9E78` · Oro: `#D5C4B0`
- Fuentes: **Lora** (display serif) + **Montserrat** (UI/body sans)

### Enfoque de layout
Todos los grids responsivos usan clases CSS propias con media queries en `globals.css`
(prefijo `ryn-`), NO clases Tailwind JIT. Esto evita problemas de caché `.next`.
Las clases Tailwind se usan solo para utilidades simples no responsivas.

---

## 🏗️ Secciones implementadas

### Componentes en `components/landing/`
| Componente | Descripción |
|-----------|-------------|
| `Navbar.tsx` | Sticky dark, versalita links, mobile drawer, logo Cloudinary |
| `Hero.tsx` | Foto real Oro como fondo, scrim izquierdo, buscador inline |
| `ApartmentsSection.tsx` | Grid 1→2→4 cols, ApartmentCard con foto Cloudinary |
| `WhySection.tsx` | Sección ink dark, 4 beneficios con iconos Lucide |
| `ExperienciasSection.tsx` | 2 cols, lista experiencias, foto real Morella |
| `GallerySection.tsx` | Filtros por tono, grid fotos reales, lightbox |
| `ReviewsSection.tsx` | 4 reseñas reales de EscapadaRural |
| `MapSection.tsx` | Leaflet dinámico (SSR false), CartoDB tiles |
| `CtaBanner.tsx` | Banner oscuro CTA "Reservar" |
| `Footer.tsx` | Grid 1→3 cols, datos contacto, registros, redes |
| `MobileCta.tsx` | Botón flotante mobile tras 400px scroll |

### Página detalle `/apartamentos/[slug]`
- Galería 2-col (foto principal + 2 thumbnails laterales) con fotos Cloudinary
- Amenities con iconos Lucide
- Aviso "Solo adultos" si `aceptaNinos = false`
- Sidebar sticky de reserva con fechas y personas
- Grid "Otros apartamentos" con fotos reales

---

## 📄 Rutas

```
/                             → Landing completa
/apartamentos/rojo            → Detalle Rojo (SSG)
/apartamentos/naranja         → Detalle Naranja (SSG)
/apartamentos/plata           → Detalle Plata (SSG)
/apartamentos/oro             → Detalle Oro (SSG)
```

---

## 🔍 SEO
- `generateMetadata` por slug en `app/(public)/apartamentos/[slug]/page.tsx`
- `generateStaticParams` para SSG en build time

---

## 🐛 Problemas conocidos / Notas

- Las fotos de Cloudinary son 750×500 (3:2), cards usan `c_fill,ar_4:3` para recortar
- `.next/trace` se bloquea en Windows si hay múltiples procesos node — cerrar todos antes de `npm run dev`
- Node 20 (miniconda3) necesario para el build — PowerShell hereda Node 16 del PATH global

---

*Módulo M4 · Depende de: M1, M2, M3 · Ver 00_ROADMAP_GENERAL.md*
