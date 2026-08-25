'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Navigation, Phone, Star } from 'lucide-react';
import { locations } from '@/lib/site';
import { useLocationCtx } from './LocationProvider';
import OpenStatus from './OpenStatus';
import Reveal from './Reveal';

const art: Record<string, { src: string; alt: string; mark: string }> = {
  williston: {
    src: '/media/chair-chrome.webp',
    alt: 'Chrome armrest and buttoned black leather seat of a vintage barber chair',
    mark: '/brand/mark-onpoint.png',
  },
  colchester: {
    src: '/media/color-work.webp',
    alt: 'Stylist painting balayage highlights onto a section of hair with a tint brush',
    mark: '/brand/mark-onpoint-2.png',
  },
};

export default function ShopCards({ heading = true }: { heading?: boolean }) {
  const { slug, setSlug } = useLocationCtx();

  return (
    <section id="shops" className="section bg-ink">
      <div className="shell">
        {heading && (
          <Reveal>
            <p className="eyebrow mb-6">Two shops</p>
            <h2 className="display max-w-[16ch] text-[clamp(2.1rem,6vw,4.4rem)] text-bone">
              Same standard,{' '}
              <span className="text-crimson-bright">either door.</span>
            </h2>
            <p className="mt-6 max-w-[52ch] text-steel-light">
              Williston is the original shop. Colchester added a full cosmetology
              side — colour, highlights and balayage — alongside the same
              barbering. Pick whichever is closer.
            </p>
          </Reveal>
        )}

        <div className="section-body grid gap-7 lg:grid-cols-2">
          {locations.map((l, i) => {
            const isActive = l.slug === slug;
            const a = art[l.slug];

            return (
              <Reveal key={l.slug} delay={i * 110} as="article">
                <div
                  className={`group relative flex h-full flex-col overflow-hidden border transition-colors duration-500 ${
                    isActive
                      ? 'border-crimson bg-ink-2'
                      : 'border-[color:var(--line-dark)] bg-ink-2/50 hover:border-steel-dim'
                  }`}
                >
                  {/* Media — the whole plate links through to the shop page */}
                  <Link
                    href={`/locations/${l.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden"
                  >
                    <Image
                      src={a.src}
                      alt={a.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42rem"
                      className="object-cover transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/35 to-transparent" />

                    <Image
                      src={a.mark}
                      alt=""
                      width={900}
                      height={900}
                      className="absolute right-5 top-5 h-16 w-16 rounded-full bg-bone/95 object-contain p-1.5 sm:h-20 sm:w-20"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <p className="mono mb-2 flex items-center gap-3 text-steel-light">
                        {l.tagline}
                        <span className="inline-flex items-center gap-1.5">
                          <Star
                            className="h-3 w-3 fill-crimson-bright text-crimson-bright"
                            aria-hidden="true"
                          />
                          <span className="tnum">
                            {l.rating} ({l.reviewCount})
                          </span>
                        </span>
                      </p>
                      <h3 className="display text-[clamp(1.9rem,4.5vw,2.9rem)] text-bone">
                        {l.shortName}
                      </h3>
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <OpenStatus location={l} />
                      {isActive && (
                        <span className="mono rounded-full bg-crimson px-3 py-1 text-[0.58rem] text-white">
                          Your shop
                        </span>
                      )}
                    </div>

                    <address className="not-italic">
                      <p className="text-[1.05rem] leading-snug text-bone">
                        {l.street}
                        {l.unit ? `, ${l.unit}` : ''}
                      </p>
                      <p className="text-steel">
                        {l.city}, {l.state} {l.zip}
                      </p>
                    </address>

                    {/* Hours table */}
                    <dl className="rule-dark divide-y divide-[color:var(--line-dark)] border-b border-[color:var(--line-dark)] pt-4">
                      {l.hoursSummary.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-baseline justify-between gap-4 py-2.5"
                        >
                          <dt className="mono text-steel-dim">{row.label}</dt>
                          <dd className="tnum text-sm text-steel-light">{row.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="flex flex-wrap gap-2">
                      {l.specialties.map((s) => (
                        <li
                          key={s}
                          className="mono border border-[color:var(--line-dark)] px-3 py-1.5 text-[0.6rem] text-steel"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-col gap-2.5 pt-2 sm:flex-row">
                      <a
                        href={l.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setSlug(l.slug)}
                        className="btn btn--crimson flex-1"
                      >
                        Book {l.shortName}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <a
                        href={l.phoneHref}
                        className="btn btn--ghost sm:!px-4"
                        aria-label={`Call ${l.shortName} at ${l.phone}`}
                      >
                        <Phone className="h-4 w-4" />
                        <span className="sm:hidden">{l.phone}</span>
                      </a>
                      <a
                        href={l.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--ghost sm:!px-4"
                        aria-label={`Directions to ${l.shortName}`}
                      >
                        <Navigation className="h-4 w-4" />
                        <span className="sm:hidden">Directions</span>
                      </a>
                    </div>

                    <Link
                      href={`/locations/${l.slug}`}
                      className="mono group/link inline-flex items-center gap-2 self-start border-b border-[color:var(--line-dark)] pb-1 text-steel transition-colors hover:border-crimson hover:text-bone"
                    >
                      Hours, team &amp; details
                      <span className="transition-transform group-hover/link:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
