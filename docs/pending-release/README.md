# Held back pending model releases

Four photos from On Point's own Vagaro galleries show real client work, and each
one shows an **identifiable minor**.

They are deliberately **not in this repository**. This repo is public, so
committing them would publish those children's faces at a permanent, indexable
URL — a worse outcome than putting them on the website, which is the thing we
already declined to do.

The files live outside the repo, alongside it:

```
../OnPointBarbershop-client-assets/pending-release/   w1.jpg w3.jpg w4.jpg w6.jpg
../OnPointBarbershop-client-assets/source-photos/     c1.jpg c2.jpg w2.jpg w5.jpg
```

`source-photos/` holds the untouched originals of the four adult cut photos that
*are* live, in case the crops in `public/work/` need redoing.

## To publish one of the held-back photos

Only once the shop confirms in writing that it holds **parental consent for
commercial use** of that specific photo:

1. Crop it to 4:5 and convert to WebP — `scripts/prepare-photos.mjs` shows how
   the existing four were produced.
2. Save it into `public/work/`.
3. Add an entry to `realWork` in `src/lib/site.ts`.

Uploading a photo to a booking profile is not the same permission as publishing
it on a marketing site. Get it in writing.
