'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { byslug, locations, team, type Location } from '@/lib/site';
import Reveal from './Reveal';

type Filter = 'all' | Location['slug'];

export default function TeamGrid({ heading = true }: { heading?: boolean }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [openBio, setOpenBio] = useState<string | null>(null);
  const shown = team.filter((m) => filter === 'all' || m.at.includes(filter));

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: `All ${team.length}` },
    ...locations.map((l) => ({ key: l.slug as Filter, label: l.shortName })),
  ];

  return (
    <section id="team" className="section bg-ink">
      <div className="shell">
        <div
          className={`flex flex-wrap items-end gap-8 ${heading ? 'justify-between' : 'justify-end'}`}
        >
          {heading && (
            <Reveal>
              <p className="eyebrow mb-6">Behind the chair</p>
              <h2 className="display max-w-[14ch] text-[clamp(2.1rem,6vw,4.4rem)] text-bone">
                The people{' '}
                <span className="text-crimson-bright">holding the clippers.</span>
              </h2>
              <p className="mt-6 max-w-[52ch] text-steel-light">
                Seven barbers and stylists across two shops. Every word below is
                their own, taken from their booking profiles.
              </p>
            </Reveal>
          )}

          <Reveal delay={110}>
            <div
              className="flex gap-1 border border-[color:var(--line-dark)] p-1"
              role="tablist"
              aria-label="Filter team by shop"
            >
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === t.key}
                  onClick={() => setFilter(t.key)}
                  className={`mono px-4 py-2.5 transition-colors duration-300 ${
                    filter === t.key
                      ? 'bg-crimson text-white'
                      : 'text-steel hover:text-bone'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="section-body grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((m, i) => {
            const isOpen = openBio === m.slug;
            const shop = byslug(m.at[0]);

            return (
              <Reveal as="li" key={m.slug} delay={Math.min(i * 55, 280)}>
                <article className="group flex h-full flex-col border border-[color:var(--line-dark)] bg-ink-2 transition-colors duration-500 hover:border-steel-dim">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={m.photo}
                      alt={`${m.name}, ${m.role} at On Point Barbershop`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 26rem"
                      className="object-cover transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    {/* Unifies a set of very different source snapshots */}
                    <div className="absolute inset-0 bg-ink/25 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/25 to-transparent" />

                    <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 bg-ink/80 px-2.5 py-1.5 backdrop-blur-sm">
                      <Star
                        className="h-3 w-3 fill-crimson-bright text-crimson-bright"
                        aria-hidden="true"
                      />
                      <span className="mono tnum text-[0.58rem] text-bone">
                        {m.rating}
                      </span>
                      <span className="mono tnum text-[0.58rem] text-steel">
                        ({m.reviewCount})
                      </span>
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="display text-[1.55rem] leading-none text-bone">
                        {m.name}
                      </h3>
                      <p className="mono mt-2 text-crimson-bright">{m.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                    <p className="text-[0.95rem] leading-relaxed text-steel-light">
                      {m.specialty}
                    </p>

                    <div>
                      <button
                        type="button"
                        onClick={() => setOpenBio(isOpen ? null : m.slug)}
                        aria-expanded={isOpen}
                        aria-controls={`bio-${m.slug}`}
                        className="mono inline-flex items-center gap-2 border-b border-[color:var(--line-dark)] pb-1 text-steel transition-colors hover:border-crimson hover:text-bone"
                      >
                        {isOpen ? 'Hide bio' : 'Read bio'}
                        <span
                          className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                          aria-hidden="true"
                        >
                          ›
                        </span>
                      </button>

                      <div id={`bio-${m.slug}`} hidden={!isOpen}>
                        <p className="mt-4 text-[0.9rem] leading-relaxed text-steel">
                          {m.bio}
                        </p>
                      </div>
                    </div>

                    <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-[color:var(--line-dark)] pt-4">
                      <div>
                        <dt className="mono text-[0.55rem] text-steel-dim">
                          Works at
                        </dt>
                        <dd className="mt-1 text-sm text-steel-light">
                          {m.schedule ??
                            m.at.map((s) => byslug(s).shortName).join(' · ')}
                        </dd>
                      </div>
                    </dl>

                    <a
                      href={shop.staffUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost !min-h-[3rem] w-full"
                    >
                      Book with {m.name.split(' ')[0]}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
