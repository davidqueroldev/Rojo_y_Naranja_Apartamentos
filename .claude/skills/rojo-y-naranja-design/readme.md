# Rojo y Naranja — Design System

A brand & UI design system for **Apartamentos Rojo y Naranja**, four boutique
holiday apartments in the walled medieval town of **Morella** (Castellón, Spain).
This system powers a direct-booking landing site (no third-party commissions),
each apartment's detail page, a reservation flow with **email validation**, and an
**owner admin** panel for managing and cancelling reservations.

> **Tagline:** *tu lugar en Morella* · **Promise:** diseño moderno, reserva directa, sin comisiones.

---

## The product at a glance

Four apartments, each named after a colour in the brand identity:

| Apartment | Capacity | Children | From | Signature |
|-----------|----------|----------|------|-----------|
| **Apartamento Rojo** | up to 4 | ✅ | 95€/noche | 2 bedrooms, 2 baths, bathtub + hidromasaje |
| **Apartamento Naranja** | up to 4 | ✅ | 90€/noche | 2 bedrooms, ducha de hidromasaje |
| **Apartamento Plata** | 2 | ❌ adults only | 110€/noche | Jacuzzi for 2, cromoterapia, chimenea |
| **Ático Oro** | 2 | ❌ adults only | 130€/noche | Lujo: jacuzzi, terraza privada 16 m², vistas |

- **Location:** C/ San Nicolás, 11 · Morella (Castellón) · 40.6181, -0.1002
- **Registro de turismo:** 23750-CS · 23751-CS · 27852-CS · 27853-CS
- **Reputation:** 10/10 average across 10 reviews (imported from EscapadaRural).
- **Reservation lifecycle:** `pendiente_pago → pendiente_confirmacion → confirmada → completada / anulada`.

---

## Sources

This system was built from materials supplied by the owner:

- **Brand book** — `uploads/base ryn.pdf` (palette + type specification, logo applications).
- **Approved mockup** — `uploads/PHOTO-2026-05-09-00-37-59.jpg` (the hero / nav direction we followed).
- **Logo artwork** — `uploads/PHOTO-2026-05-10-12-57-38.jpg` (the wordmark, extracted into `assets/`).
- **Reference codebase** — [`davidqueroldev/Rojo_y_Naranja_Apartamentos`](https://github.com/davidqueroldev/Rojo_y_Naranja_Apartamentos)
  (Next.js 14 + Supabase + Stripe + Resend). Its `MemoryBank/` contains the full product
  spec — database schema, reservation state machine, landing-page section list, email and
  chat modules. **Explore that repo to build production features faithfully.**
- **Live listing copy** — the property's public EscapadaRural listing (descriptions,
  amenities, reviews, registration numbers).

> ⚠️ **Note on the reference codebase:** its `tailwind.config` / `globals.css` carry an
> *earlier* exploratory palette (Playfair Display + Inter, `#C0392B`). We deliberately did
> **not** use those — the owner's instruction was to follow the **brand book PDF and the
> mockup**, which define the real identity below (Lora + Montserrat, warm earthy palette).

---

## CONTENT FUNDAMENTALS

**Language.** Spanish (Castilian), always. Warm, hospitable, confident — the voice of a
proud local host, not a faceless platform.

**Address & person.** Speaks to the guest as **tú** ("*tu lugar en Morella*", "*Valida tu
correo*", "*Reserva directa*"). The brand refers to itself as **nosotros** sparingly
("*nuestros huéspedes*", "*reservar con nosotros*"). Never corporate "we are pleased to…".

**Tone.** Editorial and understated. Short, evocative sentences that sell *place* and
*design*, not features. e.g. *"Apartamentos exclusivos en el centro de Morella"*,
*"Cuatro estancias, cuatro caracteres"*, *"Una villa medieval entre murallas"*.

**Casing.** Sentence case for headlines and body. **Versalita (all-small-caps) + wide
tracking** for navigation and eyebrows — this is the signature typographic move
("INICIO · APARTAMENTOS · MORELLA"). The lockup uses middot bullets: *· MORELLA ·*.

**Recurring phrases.** *tu lugar en Morella* · *reserva directa, sin comisiones* ·
*mejor precio garantizado* · *diseño moderno y actual* · *ciudad medieval amurallada* ·
*solo adultos* (Plata & Oro) · *desde {precio}€/noche*.

**Numbers & specifics.** Concrete, never padded: "16 m²", "jacuzzi para 2", "a 1 minuto de
los restaurantes". Prices as "desde 95€/noche". Reservation codes as `ARN-2026-0042`.

**Emoji.** **None.** The brand is minimalist and editorial; iconography is line icons, not
emoji. (The reference spec sketched emoji bullets — we replaced them with Lucide icons.)

**Vibe.** Boutique, warm, slightly nocturnal — candle-lit stone interiors, terracotta and
sand. Calm and unhurried. Premium but personal.

---

## VISUAL FOUNDATIONS

**Palette.** Four apartment-identity colours anchor everything: **Rojo `#AF2C0E`**
(deep terracotta), **Naranja `#C25437`** (burnt orange), **Plata `#CB9E78`** (warm camel),
**Oro `#D5C4B0`** (soft sand). Neutrals are warm and earthy — near-black **Ink `#1C1916`**
for dark sections, **Cream `#FBF6EE`** as the default page surface, **Stone `#8D8078`**
("piedra") for secondary text. Status colours are muted and warm (sage success, amber
warning, rojo for danger). Rojo/Naranja are the action/accent pair; Plata/Oro are calm,
luxe surfaces. See `tokens/colors.css`.

**Type.** Two families. **Lora** (serif) carries the editorial voice — apartment names,
headlines, prices, pull-quotes; used at 600 weight with tight tracking for display, and in
*italic* for soft subheads. **Montserrat** (sans) carries everything functional — nav,
buttons, body, labels — including the **Versalita** small-caps treatment for navigation and
the wide-tracked uppercase overline. Scale runs 11 → 76px. See `tokens/typography.css`.

> **Font substitution flag:** the brand book lists Lora + Montserrat, both available on
> Google Fonts, so we load them from there (`tokens/fonts.css`). The PDF's *"Montserrat
> Versalita"* weights are reproduced with `font-variant-caps: all-small-caps` + tracking
> rather than a dedicated small-caps font file. If you need self-hosted `.woff2` binaries
> (offline / production), drop them into `assets/fonts/` and swap the `@import` for
> `@font-face` rules — **please send the licensed font files and we'll wire them in.**

**Backgrounds.** Photography-led. Dark, moody interior shots (charcoal walls, warm wood,
candle light) and views of Morella. Over photography we use a **left-weighted dark scrim**
(`--scrim-hero`) so white type stays legible — see the Brand specimen cards. Light sections
sit on Cream or Sand; dark feature sections on Ink. No gradients-as-decoration, no noise
textures beyond a faint highlight on photo placeholders.

> **Imagery flag:** we do not ship the owner's photographs (rights). In the UI kit, photos
> are represented by warm gradient placeholders captioned *"Foto · …"*. Replace these with
> real apartment photography — warm, low-key, architectural — in production.

**Corners & cards.** Modest, architectural radii — `sm 6px` for controls, `md 10px` /
`lg 16px` for cards, `xl 24px` for modals; pills (`999px`) for buttons and badges. Cards are
white on a `1px` warm hairline border (`--border #E4D9C8`) with a soft, low, warm-tinted
shadow (`--shadow-card`). Apartment cards carry a 4px **identity-colour seam** along the
bottom of the photo.

**Shadows.** Soft, warm-tinted, low elevation (`rgba(28,25,22,…)`) — never hard or grey.
Elevation rises with overlays (modals use `--shadow-lg`).

**Motion.** Quiet and editorial. Ease-out `cubic-bezier(0.22,0.61,0.36,1)`, durations
140 / 240 / 420ms. **No bounce.** Cards lift `-4px` on hover; buttons darken (`brightness
0.95`) on hover and nudge down `1px` on press. Fades and short translations only.

**Hover / press states.** Hover = subtle brightness drop + soft shadow (primary/sand), or a
tinted fill (outline → `--ryn-rojo-soft`; ghost → `--surface-sunken`). Press = `brightness
0.9` + `translateY(1px)`. Apartment card = lift. Links in nav go to **Oro** on active.

**Focus.** 2px **Naranja** outline, 2px offset; inputs get a 3px `--ryn-naranja-soft` ring.

**Borders & dividers.** Hairlines in warm beige (`--border`), stronger `--border-strong` on
controls; on dark, `--border-on-dark` (`#3A332D`).

**Transparency & blur.** Sticky navbar is translucent Ink with `backdrop-filter: blur(10px)`,
opaque-ish on scroll. The hero search bar is a translucent cream panel with blur. Modals dim
the page with `rgba(20,17,15,0.55)` + slight blur.

**Layout.** Centered `1200px` container, `24px` gutters, generous `96px` section rhythm.
Detail pages use a sticky booking sidebar. Four-up apartment grid on desktop.

---

## ICONOGRAPHY

- **System:** [**Lucide**](https://lucide.dev) line icons, loaded from CDN
  (`unpkg.com/lucide`). Thin `1.6` stroke, rounded — matches the minimalist, modern,
  boutique feel. Used for amenities (wifi, bath, waves/jacuzzi, flame/chimenea, bed,
  coffee, sun/terraza…), nav affordances, the booking/admin UI and footer contact lines.
- **Why a substitution:** the brand has no proprietary icon font or SVG set, and the
  reference spec sketched **emoji** bullets (🏘️ ✨ 🛁). Emoji clash with the editorial,
  minimalist identity, so we standardised on Lucide. **Flag:** if you have a bespoke icon
  set, send it and we'll vendor it into `assets/icons/`.
- **Emoji:** not used anywhere in the brand.
- **Unicode:** the **middot `·`** is used decoratively in the logo lockup (*· MORELLA ·*)
  and as a separator in nav/registry strings. Stars (reviews) use the Lucide `star` icon,
  filled for the rating.
- **Logo:** the *Rojo y Naranja* wordmark, extracted from the supplied artwork into three
  recoloured variants in `assets/` — see Brand cards. Use **white** on dark/photography,
  **rojo** or **dark** on light surfaces. Give it clear space; never place the white logo on
  a busy photo without the scrim.

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link (imports only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`.
- `assets/` — `logo-white.png`, `logo-dark.png`, `logo-rojo.png` (the wordmark).
- `SKILL.md` — Agent-Skills wrapper so this system can be used in Claude Code.

**Foundation specimen cards** (`guidelines/`) — render in the Design System tab:
- Colors: identity · neutrals · status
- Type: Lora · Montserrat · Versalita & overline · scale
- Spacing: scale · radii & shadows
- Brand: logo lockup · hero scrim treatment

**Components** (`components/`) — React primitives, bundled for consumers:
- `core/` — **Button** (5 variants incl. the sand "Reservar" CTA), **Badge** (apartment + status tones)
- `forms/` — **Input** (booking & email-validation fields, with error/hint)
- `booking/` — **ReservationStatus** (the state-machine pill)
- `cards/` — **ApartmentCard** (the signature four-apartment listing card)

**UI kit** (`ui_kits/landing/`) — the full interactive site recreation:
`index.html` (home → apartment detail → booking modal with email validation → owner admin),
composed from `Navbar`, `Hero`, `LandingSections`, `Calendar`, `ApartmentDetail`,
`BookingModal`, `AdminPanel`, plus `data.js` and `kit-shared.jsx`.

---

## Using this system

Link the stylesheet and read components off the compiled bundle:

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<script>
  const { Button, Badge, Input, ApartmentCard, ReservationStatus } =
    window.RojoYNaranjaDesignSystem_3c785d;
</script>
```

All colour, type, spacing and motion is available as CSS custom properties (e.g.
`var(--accent)`, `var(--font-serif)`, `var(--space-6)`, `var(--shadow-card)`). Prefer the
semantic aliases (`--text-body`, `--surface-card`, `--accent`) over raw hues.
