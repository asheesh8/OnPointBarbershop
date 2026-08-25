'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { locations, type Location } from '@/lib/site';

type Slug = Location['slug'];

type Ctx = {
  active: Location;
  slug: Slug;
  setSlug: (s: Slug) => void;
};

const LocationCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = 'onpoint:shop';
const DEFAULT: Slug = 'williston';

const isSlug = (v: unknown): v is Slug =>
  v === 'williston' || v === 'colchester';

/* --------------------------------------------------------------------------
   localStorage really is an external store, so it is read through
   useSyncExternalStore rather than mirrored into state inside an effect. That
   gives a correct server snapshot (no hydration mismatch), no cascading render
   on mount, and cross-tab sync for free.
   -------------------------------------------------------------------------- */

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Another tab changing the choice should update this one too.
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

function getSnapshot(): Slug {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isSlug(saved) ? saved : DEFAULT;
  } catch {
    // Private mode, or storage disabled — the default is fine.
    return DEFAULT;
  }
}

const getServerSnapshot = (): Slug => DEFAULT;

function write(slug: Slug) {
  try {
    window.localStorage.setItem(STORAGE_KEY, slug);
  } catch {
    /* non-fatal; the choice just will not persist */
  }
  emit();
}

/**
 * Which shop the visitor is looking at. This is the spine of the site: the
 * header CTA, hero, hours, price list, mobile bar and booking links all read
 * from it, so choosing a shop once configures everything instead of making the
 * visitor re-pick at every booking button.
 */
export function LocationProvider({ children }: { children: ReactNode }) {
  const slug = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setSlug = useCallback((s: Slug) => write(s), []);

  const value = useMemo<Ctx>(
    () => ({
      active: locations.find((l) => l.slug === slug) ?? locations[0],
      slug,
      setSlug,
    }),
    [slug, setSlug]
  );

  return <LocationCtx.Provider value={value}>{children}</LocationCtx.Provider>;
}

export function useLocationCtx() {
  const ctx = useContext(LocationCtx);
  if (!ctx) throw new Error('useLocationCtx must be used inside <LocationProvider>');
  return ctx;
}
