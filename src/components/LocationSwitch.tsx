'use client';

import { useId } from 'react';
import { locations } from '@/lib/site';
import { useLocationCtx } from './LocationProvider';

/**
 * Two-up segmented control with a sliding crimson thumb. Implemented as real
 * radio inputs so it is keyboard- and screen-reader-native; the visible pill is
 * a sibling that follows the checked state.
 */
export default function LocationSwitch({
  size = 'md',
  tone = 'dark',
}: {
  size?: 'sm' | 'md';
  tone?: 'dark' | 'light';
}) {
  const { slug, setSlug } = useLocationCtx();
  const index = locations.findIndex((l) => l.slug === slug);
  // This control is rendered more than once per page (hero, menu, drawer).
  // Radios sharing a `name` form one group document-wide, so each instance
  // needs its own or they cancel each other out.
  const group = useId();

  const pad = size === 'sm' ? 'h-11 text-[0.62rem]' : 'h-14 text-[0.7rem]';
  const shell =
    tone === 'dark'
      ? 'border-[color:var(--line-dark)] bg-white/[0.04]'
      : 'border-[color:var(--line-light)] bg-black/[0.04]';

  return (
    <fieldset
      className={`relative grid grid-cols-2 rounded-full border p-1 backdrop-blur-sm ${shell}`}
    >
      <legend className="sr-only">Choose a shop</legend>

      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-crimson transition-transform duration-[420ms]"
        style={{
          transform: `translateX(${index * 100}%)`,
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {locations.map((l) => {
        const isActive = l.slug === slug;
        return (
          <label
            key={l.slug}
            className={`relative z-10 flex cursor-pointer items-center justify-center rounded-full px-4 font-mono font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${pad} ${
              isActive
                ? 'text-white'
                : tone === 'dark'
                  ? 'text-steel hover:text-bone'
                  : 'text-steel-dim hover:text-ink'
            }`}
          >
            <input
              type="radio"
              name={group}
              value={l.slug}
              checked={isActive}
              onChange={() => setSlug(l.slug)}
              className="sr-only"
            />
            {l.shortName}
          </label>
        );
      })}
    </fieldset>
  );
}
