# Content audit

Every factual claim on this site was checked against a source before it was
written into `src/lib/site.ts`. This file records what was verified, what was
corrected, what was removed, and what still needs the shop to confirm.

Sources, in order of authority:

1. **Vagaro** — `vagaro.com/onpointbarbershop` and `/onpointbarbershop2`, plus
   both `/staff` pages. This is the shop's live booking system, so it is treated
   as the record for hours, staff, ratings and services.
2. **The previous site** — `onpointbarbershopvt.com`.
3. **Google Business** — the two `share.google` links the old site pointed at.

---

## Corrected

### Review counts were significantly overstated

The old site claimed **"5.0 Google Rating · 500+ Five-Star Reviews"** in the
hero, the reviews section and the JSON-LD (`reviewCount: "500"`).

What the live profiles actually show:

| Shop | Rating | Reviews |
| --- | --- | --- |
| Williston | 5.0 | 146 |
| Colchester | 4.8 | 16 |
| **Combined** | **4.9** | **162** |

The site now uses these numbers and attributes them. 162 genuine reviews at 4.9
is a strong, defensible claim; "500+" was not supportable from any source we
could reach, and an inflated `aggregateRating` in structured data is the kind of
thing Google penalises.

**Action:** if the shop has a separate Google review count that reaches 500+,
send us the profile and we will cite Google instead of Vagaro.

### Colchester's hours disagree between sources

| Day | Old site | Vagaro (live) |
| --- | --- | --- |
| Monday | 8:00 – 19:00 | 8:00 – 19:00 |
| Tuesday | 8:00 – 17:00 | 8:00 – 17:00 |
| Wednesday | 8:00 – 17:00 | 8:00 – 17:00 |
| Thursday | 8:00 – 19:00 | **9:00 – 19:00** |
| Friday | 8:00 – 17:00 | 8:00 – 17:00 |
| **Saturday** | **9:00 – 14:00** | **Closed** |
| Sunday | Closed | Closed |

The site follows Vagaro, because that is what customers can actually book
against. **This needs confirming** — a wrong Saturday is the single most
expensive error on a barbershop site, in either direction. Williston's hours
matched across both sources and were left alone.

### Service names and the discount tier

Colchester's Vagaro description states discounts for **"Military, EMS, and
Police professionals"**. The old site said "Military, first responders &
seniors (65+)". The menu entry now covers both framings.

---

## Removed

These appeared on the old site and could not be sourced anywhere. They were cut
rather than reproduced:

- **"$50K+ given back to community since 2019"** — no supporting source.
- **"Local Youth Sports"** sponsorship of Williston and Colchester baseball and
  basketball programmes.
- **"Vermont Veterans Program"** — complimentary services every Veterans Day.
- **"Barber Apprenticeship"** — paid apprenticeships and mentorship programme.
- **"7 Years Serving Vermont"** — unverifiable, and it conflicts with Jake's own
  bio, which describes a longer arc.
- **Five of six testimonials** — "Michael R.", "Sarah T.", "David L.",
  "Jennifer M." and "Marcus W." Several were dated only "Recent", and none could
  be matched to a public review. One quote from **Kaden D.** was specific and
  dated, so it was kept as the single pull quote.

If any of these are true, they are good material — send proof and they go back
in. The community work in particular deserves its own page.

---

## Photography

### Real photographs now on the site

- **Seven staff portraits** pulled from the barbers' own Vagaro profiles.
- **Four client cut photos** from the shops' Vagaro galleries.
- **Two brand marks** — the Williston roundel and the Colchester "2" variant.

### Held back pending consent

Four further gallery photos show an **identifiable minor** each. They are off
the live site *and* out of this repository, which is public — see
`docs/pending-release/README.md` for where they live and what has to happen
before any of them can be used. Publishing them on a commercial site needs
written parental consent; uploading them to a booking profile is not the same
permission.

### Staff portraits need re-shooting

The seven portraits are real but they are personal snapshots, not headshots:
a holiday selfie, a phone screenshot of a shared post, a beach photo. They have
been cropped and tonally graded to hold together as a set, and they are honest,
but they undersell the shop.

Jake's is the weakest — his only source is a three-person selfie in which his
shoulders overlap the person beside him, so no crop isolates him cleanly.

**Recommendation:** one hour with a photographer in the Williston shop, seven
people, same chair, same light. The team grid already expects a 4:5 portrait, so
new files drop straight into `public/team/` with no code changes.

### Generated atmosphere imagery — must be replaced before launch

The site's backgrounds, hero plates, texture shots and the marquee strip are
**AI-generated placeholders**, created because no real interior or detail
photography of either shop could be found anywhere public. They exist to hold
the art direction, and they are deliberately kept separate from the "Real cuts"
section so no visitor is misled about which images are the barbers' work.

They still show a barbershop that is not On Point's. **They should be replaced
with real photography of the two shops before this goes live.** Files are in
`public/media/`; swapping them requires no code changes.

For the record, the old site's own hero image had the same problem — its
`og-image.png` was a generated interior with invented gold signage.

---

## Verified and used as-is

- Both addresses, including the Colchester unit number.
- Both phone numbers, mapped to the correct shop.
- `jake@onpointbarbershopvt.com`.
- Williston's hours.
- The full service menu and every price.
- All seven names, roles and per-barber review counts.
- Every barber bio — their own words, edited only for punctuation, sentence
  breaks and the spelling of school names.
- Both Vagaro booking URLs and both Google Business links.
- Instagram and Facebook profiles.

## Deliberately not published

Five of the seven barbers list a **personal mobile number** on their public
Vagaro profile. Those numbers are not reproduced here. Re-publishing someone's
personal number on a marketing site is a different act from them listing it on a
booking tool, and it should be their call. The two shop numbers cover every
need. The numbers are recorded in our client file if the shop wants them added.

---

## Open questions for the shop

1. **Is Colchester open on Saturdays?** Vagaro says no; the old site said
   9:00 AM – 2:00 PM.
2. **Is Colchester's Thursday opening 8:00 or 9:00 AM?**
3. **Where does the 500+ review figure come from?** If there is a Google profile
   with that volume, we will cite it.
4. **Are the community programmes real?** Youth sports, veterans' day, and the
   apprenticeship. They are strong differentiators and worth a page.
5. **Can we get real photography** of both interiors, and proper headshots?
6. **Do you hold parental releases** for the four held-back gallery photos?
