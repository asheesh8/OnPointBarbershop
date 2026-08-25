# On Point Barbershop

Marketing site for On Point Barbershop — two shops in Williston and Colchester,
Vermont. Next.js 16 (App Router) · React 19 · Tailwind 4 · Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## The brand: "Precision Americana"

The shop's real mark is a red-white-and-blue flag roundel with clippers and
shears crossed over it — loud, patriotic, blue-collar, unpretentious.

The previous site buried that under a brown-and-gold "luxury barbershop"
template: serif type, gold gradients, a stock leather chair. That palette
belonged to no one, and it actively fought the logo it was sitting next to.

This build keeps the flag DNA and finds the premium feeling somewhere the old
site didn't look — in craft:

| | |
| --- | --- |
| **Ground** | `--ink` `#0a0d12`, a near-black with a navy cast. Never brown. |
| **Paper** | `--bone` `#f2efe8`, warm off-white for the light bands. |
| **Accent** | `--crimson` `#c8102e` — flag red, one accent, used surgically. |
| **Steel** | `--steel` `#7c8899` and a chrome gradient for rules and the mark. |
| **Display** | Archivo Variable at weight 800, `font-stretch: 79%`. |
| **Labels** | IBM Plex Mono, uppercase, wide tracking. |

Archivo carries a real width axis, so the display face is genuinely condensed
and heavy — the same voice as the arc lettering in the logo — rather than a
transform-squashed fake.

Gold is gone entirely. It was the clearest tell that the old site came out of a
template.

### Accessibility notes worth keeping

`--crimson` at `#c8102e` only hits 2.9:1 on the dark ground, so it is never used
for text there — only for fills, rules and large display type. Text accents on
dark use `--crimson-bright` `#ff3b52` at 5.4:1. On bone, `--crimson` itself
passes at 5.7:1. The two tokens exist for that reason; don't collapse them.

---

## Structure

```
/                       Hero, both shops, menu preview, real cuts, reviews, standards
/locations              Both shops side by side
/locations/williston    Hours, map, the crew there, that shop's menu
/locations/colchester   Same, plus the cosmetology side
/services               Full price list, shop-aware, plus menu FAQs
/team                   All seven, real photos, bios in their own words
/gallery                Real client cuts, atmosphere strip, how a visit runs
/contact                Both maps, hours, phone numbers, pre-visit FAQs
```

All 13 routes prerender as static HTML.

---

## The one idea worth understanding

**Choosing a shop configures the whole site.**

A two-location business has one real UX problem: every "Book now" button is
ambiguous. The old site solved it by asking twice on every CTA — "Book
Williston" *and* "Book Colchester", everywhere, forever.

Here, `LocationProvider` (`src/components/LocationProvider.tsx`) holds the
chosen shop above the router, persists it to `localStorage`, and every surface
reads from it: the header CTA, the hero backdrop, the price list, the mobile
bar. Landing on `/locations/colchester` adopts Colchester automatically via
`SetActiveLocation`.

`LocationSwitch` renders more than once per page, so each instance generates its
own radio-group name with `useId`. Radios sharing a `name` form a single group
document-wide and silently cancel each other out — that bug is worth not
reintroducing.

### Other components with something in them

- **`OpenStatus`** — live open/closed, computed in `America/New_York` rather
  than the visitor's timezone, because someone in Denver still needs to know
  whether the chair in Williston is open. Renders nothing server-side to avoid a
  hydration mismatch, then ticks once a minute.
- **`CraftSequence`** — sticky image column driven by an IntersectionObserver on
  the four steps.
- **`.pole-rule`** — the barber pole as a section divider: a repeating gradient
  translating along its own axis, the same illusion the real pole uses.
- **`.btn`** — hover wipes a crimson panel up from the baseline, the gesture of
  a clipper pass, rather than cross-fading a colour.

Everything honours `prefers-reduced-motion`.

---

## Content and photography

**Read [`docs/content-audit.md`](docs/content-audit.md) before changing any
copy.** Every claim on the site is sourced there, and it lists what was
corrected and removed from the old site — including a review count that was
overstated by roughly 3×, and a Saturday-hours conflict at Colchester that still
needs the shop to settle it.

`src/lib/site.ts` is the single source of truth. Nothing factual is hard-coded
into a component.

### Two things must happen before launch

1. **Replace the generated atmosphere imagery in `public/media/`.** No real
   interior photography of either shop exists publicly, so those plates are
   AI-generated placeholders holding the art direction. Real client work
   (`public/work/`) and the staff portraits (`public/team/`) are genuine and are
   kept visually separate from it.
2. **Get parental releases before touching the held-back photos.** Four real
   gallery photos show identifiable minors. They are kept out of `public/` and
   out of this repository entirely — see `docs/pending-release/README.md`.

Proper headshots would be the single biggest upgrade available; the grid already
expects 4:5 and new files need no code changes. `scripts/prepare-photos.mjs`
documents how the current crops were produced.

---

## Conventions

- Facts live in `src/lib/site.ts`; components take props, not literals.
- Design tokens live in `:root` in `globals.css` and are exposed to Tailwind
  through `@theme inline`. No raw hex in components.
- Section components accept `heading={false}` when a `PageHero` already carries
  the page's headline.
- Interior pages use `PageHero`; only the home page gets the full-height hero.
