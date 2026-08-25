'use client';

import Image from 'next/image';
import { ArrowUpRight, Info } from 'lucide-react';
import { services } from '@/lib/site';
import { useLocationCtx } from './LocationProvider';
import LocationSwitch from './LocationSwitch';
import Reveal from './Reveal';

/**
 * The price list, set like a barbershop wall menu: name and description on the
 * left, price on the right, joined by a leader rule. Services the selected shop
 * does not perform are kept visible but stated plainly rather than hidden — a
 * visitor looking for colour needs to learn it exists at Colchester, not that
 * it does not exist.
 */
export default function ServiceMenu({ heading = true }: { heading?: boolean }) {
  const { active, slug } = useLocationCtx();

  return (
    <section id="services" className="section bg-bone text-ink">
      <div className="shell">
        <div
          className={`grid gap-12 lg:items-end ${
            heading ? 'lg:grid-cols-[1fr_auto]' : 'lg:grid-cols-[1fr_auto] lg:justify-items-end'
          }`}
        >
          {heading ? (
            <Reveal>
              <p className="eyebrow eyebrow--on-light mb-6">The menu</p>
              <h2 className="display max-w-[15ch] text-[clamp(2.1rem,6vw,4.4rem)]">
                Priced plainly. <span className="text-crimson">No upsell.</span>
              </h2>
              <p className="mt-6 max-w-[50ch] text-ink/65">
                What you see is what you pay. Every cut is finished with a line
                up and a warm towel, whatever you booked.
              </p>
            </Reveal>
          ) : (
            <Reveal>
              <p className="max-w-[46ch] text-ink/65">
                Prices are identical at both shops. Switch the shop to see what
                each one actually performs.
              </p>
            </Reveal>
          )}

          <Reveal delay={120}>
            <div className="flex flex-col gap-3">
              <span className="mono text-ink/45">Showing prices for</span>
              <div className="w-[min(21rem,100%)]">
                <LocationSwitch tone="light" size="sm" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="section-body grid gap-x-20 gap-y-0 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          {/* The list */}
          <ul className="border-t border-[color:var(--line-light)]">
            {services.map((s, i) => {
              const offered = s.at.includes(slug);
              return (
                <Reveal as="li" key={s.name} delay={Math.min(i * 60, 300)}>
                  <div
                    className={`group border-b border-[color:var(--line-light)] py-6 transition-opacity duration-500 ${
                      offered ? '' : 'opacity-55'
                    }`}
                  >
                    {/* Name, leader rule and price share one baseline — the way
                        a printed menu sets it — so the description below can run
                        to any length without dragging the rule down with it. */}
                    <div className="flex items-baseline gap-3 sm:gap-5">
                      <h3 className="display-wide shrink-0 text-[1.22rem] sm:text-[1.4rem]">
                        {s.name}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="hidden h-px flex-1 bg-[color:var(--line-light)] sm:block"
                      />
                      <div className="ml-auto flex shrink-0 items-baseline gap-2.5 sm:ml-0">
                        {s.priceNote && (
                          <span className="mono hidden text-[0.56rem] text-ink/45 sm:inline">
                            {s.priceNote}
                          </span>
                        )}
                        <span className="display tnum text-[1.6rem] leading-none sm:text-[2rem]">
                          {s.price}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2.5 max-w-[52ch] text-[0.92rem] leading-relaxed text-ink/60">
                      {s.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                      {s.priceNote && (
                        <span className="mono text-[0.56rem] text-ink/45 sm:hidden">
                          {s.priceNote}
                        </span>
                      )}
                      {!offered && (
                        <span className="mono inline-flex items-center gap-2 text-crimson">
                          <Info className="h-3.5 w-3.5" />
                          Colchester only
                        </span>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          {/* Sticky booking rail */}
          <Reveal delay={160}>
            <div className="mt-12 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:mt-0">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/media/flatlay-tools.webp"
                  alt="Clippers, shears, a straight razor, comb, brush and a folded white towel laid out on oxblood leather"
                  fill
                  sizes="(max-width: 1024px) 100vw, 28rem"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="mono mb-2 text-steel-light">Booking at</p>
                  <p className="display mb-5 text-[1.9rem] text-bone">
                    {active.shortName}
                  </p>
                  <a
                    href={active.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--solid w-full"
                  >
                    Book online
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <p className="mono mt-4 text-center text-[0.58rem] text-steel">
                    Walk-ins welcome when a chair is free
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
