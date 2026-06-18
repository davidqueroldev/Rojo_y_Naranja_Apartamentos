---
name: rojo-y-naranja-design
description: Use this skill to generate well-branded interfaces and assets for Apartamentos Rojo y Naranja (four boutique holiday apartments in Morella, Spain), either for production or throwaway prototypes/mocks. Contains the brand's colours, type, fonts, logo assets, UI components and a full landing/booking/admin UI kit.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files
(`styles.css` and `tokens/` for foundations, `guidelines/` for specimen cards,
`components/` for React primitives, `ui_kits/landing/` for the full site recreation,
`assets/` for the logo).

Brand in one line: warm, editorial, minimalist boutique apartments in medieval Morella —
**Lora** (serif display) + **Montserrat** (sans, with Versalita small-caps nav), a warm
earthy palette built on four apartment-identity colours (Rojo `#AF2C0E`, Naranja `#C25437`,
Plata `#CB9E78`, Oro `#D5C4B0`), dark photographic heroes with a left-weighted scrim, soft
warm shadows, pill buttons, and **no emoji**. Copy is Spanish, addresses the guest as *tú*,
and sells place and design over features.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy the assets you need
out of `assets/`, link `styles.css`, and produce static/standalone HTML for the user to view.
For photography, use warm low-key placeholders unless the user supplies real photos.

If working on production code, copy the assets, link `styles.css`, read components off the
compiled bundle (`window.RojoYNaranjaDesignSystem_3c785d`), and follow the rules in
`readme.md` to design faithfully. For real product behaviour (database schema, reservation
state machine, Stripe, email, chat), consult the reference repo noted in the readme.

If the user invokes this skill without other guidance, ask what they want to build or design,
ask a few focused questions (surface, audience, which apartments, light/dark, variations),
and act as an expert designer who outputs HTML artifacts *or* production code as needed.
