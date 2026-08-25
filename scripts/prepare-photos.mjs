import sharp from 'sharp';
import { mkdir, readdir, rename, writeFile } from 'node:fs/promises';

/**
 * One-off prep for the photography pulled from the shop's Vagaro profiles.
 * Kept in the repo so the crops are reproducible when the shop sends better
 * source files.
 */

// Jake's source is a three-person holiday selfie; attention-cropping picked the
// wrong face, so his frame is set by hand.
await sharp('/tmp/staffraw/jake.jpg')
  .rotate()
  .extract({ left: 660, top: 60, width: 900, height: 1125 })
  .resize(760, 950, { fit: 'cover' })
  .modulate({ saturation: 0.62, brightness: 1.02 })
  .linear(1.05, -5)
  .webp({ quality: 86, effort: 6 })
  .toFile('public/team/jake-sleeper.webp');
console.log('team/jake-sleeper.webp re-cropped');

// Real client work from the shop's own galleries.
await mkdir('public/work', { recursive: true });
const live = {
  c1: 'texture-fade',
  c2: 'crop-cut',
  w2: 'hard-part',
  w5: 'classic-fade',
};

for (const [src, name] of Object.entries(live)) {
  await sharp(`public/cuts/${src}.jpg`)
    .rotate()
    .resize(900, 1125, { fit: 'cover', position: sharp.strategy.attention })
    .modulate({ saturation: 0.72 })
    .linear(1.04, -4)
    .webp({ quality: 84, effort: 6 })
    .toFile(`public/work/${name}.webp`);
  console.log(`work/${name}.webp`);
}

// The remaining gallery shots are identifiable minors. They stay out of
// public/ until the shop confirms it holds parental releases.
await mkdir('docs/pending-release', { recursive: true });
for (const f of ['w1', 'w3', 'w4', 'w6']) {
  await rename(`public/cuts/${f}.jpg`, `docs/pending-release/${f}.jpg`);
}
await writeFile(
  'docs/pending-release/README.md',
  [
    '# Held back pending model releases',
    '',
    'These four photos come from On Point\'s own Vagaro galleries and show real',
    'client work. Each one shows an identifiable minor, so they are deliberately',
    'kept out of `public/` and off the live site.',
    '',
    'Publish them only once the shop confirms it holds written parental consent',
    'for commercial use. Drop them into `public/work/` and add them to',
    '`realWork` in `src/lib/site.ts` at that point.',
    '',
  ].join('\n')
);
console.log('held back:', (await readdir('docs/pending-release')).join(' '));
