'use client';

import { useEffect, useState } from 'react';
import { getOpenState, type OpenState } from '@/lib/hours';
import type { Location } from '@/lib/site';

/**
 * Live open/closed chip. Renders nothing on the server so the markup can never
 * disagree with the client clock, then ticks once a minute.
 */
export default function OpenStatus({
  location,
  variant = 'full',
  className = '',
}: {
  location: Location;
  variant?: 'full' | 'short';
  className?: string;
}) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const tick = () => setState(getOpenState(location));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [location]);

  if (!state) {
    // Reserve the row so nothing shifts when the real value lands.
    return <span className={`inline-block h-[1.1em] ${className}`} aria-hidden="true" />;
  }

  return (
    <span
      className={`inline-flex items-center gap-2 mono ${className}`}
      style={{ letterSpacing: '0.14em' }}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          state.isOpen ? 'animate-pulse-dot bg-[#4ade80]' : 'bg-steel-dim'
        }`}
        aria-hidden="true"
      />
      <span className={state.isOpen ? 'text-[#86efac]' : 'text-steel'}>
        {variant === 'full' ? state.label : state.short}
      </span>
    </span>
  );
}
