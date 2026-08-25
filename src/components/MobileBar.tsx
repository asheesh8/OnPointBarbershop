'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import { useLocationCtx } from './LocationProvider';

/**
 * Persistent call/book pair on small screens. Held back until the hero is off
 * screen so it never covers the hero's own buttons.
 */
export default function MobileBar() {
  const { active } = useLocationCtx();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-[color:var(--line-dark)] bg-ink/95 backdrop-blur-xl transition-transform duration-[420ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] sm:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={active.phoneHref}
        className="mono flex items-center justify-center gap-2 py-4 text-bone"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>
      <a
        href={active.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mono flex items-center justify-center gap-2 bg-crimson py-4 text-white"
      >
        <CalendarCheck className="h-4 w-4" />
        Book {active.shortName}
      </a>
    </div>
  );
}
