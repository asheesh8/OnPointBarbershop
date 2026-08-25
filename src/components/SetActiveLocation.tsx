'use client';

import { useEffect } from 'react';
import type { Location } from '@/lib/site';
import { useLocationCtx } from './LocationProvider';

/**
 * Landing on a shop's own page is itself a choice of shop, so adopt it. Keeps
 * the header CTA, mobile bar and price list pointed at the shop the visitor is
 * actually reading about. Renders nothing.
 */
export default function SetActiveLocation({ slug }: { slug: Location['slug'] }) {
  const { slug: current, setSlug } = useLocationCtx();

  useEffect(() => {
    if (current !== slug) setSlug(slug);
    // Only react to the page's own slug — re-running when the visitor flips the
    // switcher would trap them on this shop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return null;
}
