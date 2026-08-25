'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { useLocationCtx } from './LocationProvider';
import LocationSwitch from './LocationSwitch';
import OpenStatus from './OpenStatus';

const nav = [
  { label: 'Shops', href: '/locations' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Visit', href: '/contact' },
];

export default function SiteHeader() {
  const { active } = useLocationCtx();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-[color:var(--line-dark)] bg-ink/85 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[84rem] items-center gap-6 px-[var(--page-pad)]">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="On Point Barbershop, home"
          >
            <Image
              src="/brand/mark-onpoint.png"
              alt=""
              width={756}
              height={762}
              priority
              className="h-10 w-10 rounded-full bg-bone object-contain p-[3px]"
            />
            <span className="hidden sm:block">
              <span className="display block text-[1.02rem] leading-none text-bone">
                On Point
              </span>
              <span className="mono block text-[0.55rem] leading-none text-steel">
                Barbershop · VT
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((n) => {
              const isCurrent =
                pathname === n.href || pathname.startsWith(`${n.href}/`);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`mono transition-colors hover:text-bone ${
                    isCurrent ? 'text-bone' : 'text-steel-light'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <a
              href={active.phoneHref}
              className="hidden items-center gap-2 mono text-steel-light transition-colors hover:text-bone xl:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {active.phone}
            </a>
            <a
              href={active.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--crimson hidden !min-h-[2.9rem] !px-5 sm:inline-flex"
            >
              Book {active.shortName}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center border border-[color:var(--line-dark)] text-bone transition-colors hover:border-crimson lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-400 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[min(24rem,88vw)] flex-col bg-ink-2 transition-transform duration-[420ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pole-vertical absolute inset-y-0 left-0" aria-hidden="true" />

          <div className="flex h-[var(--header-h)] items-center justify-between pl-8 pr-[var(--page-pad)]">
            <span className="mono text-steel">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center border border-[color:var(--line-dark)] text-bone"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 pl-8 pr-[var(--page-pad)] pt-6" aria-label="Mobile">
            {nav.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="display border-b border-[color:var(--line-dark)] py-4 text-[1.9rem] text-bone transition-colors hover:text-crimson-bright"
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-4 pb-10 pl-8 pr-[var(--page-pad)]">
            <LocationSwitch size="sm" />
            <OpenStatus location={active} />
            <a
              href={active.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--crimson w-full"
            >
              Book {active.shortName}
            </a>
            <a href={active.phoneHref} className="btn btn--ghost w-full">
              <Phone className="h-4 w-4" />
              {active.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
