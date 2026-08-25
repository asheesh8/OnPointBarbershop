'use client';

import { Mail, Navigation, Phone } from 'lucide-react';
import { locations, site } from '@/lib/site';
import FaqAccordion from './FaqAccordion';
import OpenStatus from './OpenStatus';
import Reveal from './Reveal';

export default function VisitSection({ heading = true }: { heading?: boolean }) {
  return (
    <section id="visit" className="section bg-ink-2">
      <div className="shell">
        {heading && (
          <Reveal>
            <p className="eyebrow mb-6">Visit</p>
            <h2 className="display max-w-[15ch] text-[clamp(2.1rem,6vw,4.4rem)] text-bone">
              Find us. <span className="text-crimson-bright">Both of us.</span>
            </h2>
          </Reveal>
        )}

        {/* Maps */}
        <div className="section-body grid gap-7 lg:grid-cols-2">
          {locations.map((l, i) => (
            <Reveal key={l.slug} delay={i * 110}>
              <div className="flex h-full flex-col border border-[color:var(--line-dark)] bg-ink">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
                  <iframe
                    src={l.mapEmbedUrl}
                    title={`Map showing ${l.name} at ${l.street}, ${l.city}, Vermont`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0 grayscale-[0.55] contrast-[1.05] invert-[0.9] hue-rotate-180"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="display text-[1.7rem] text-bone">{l.shortName}</h3>
                    <OpenStatus location={l} variant="short" />
                  </div>

                  <address className="not-italic text-steel-light">
                    {l.street}
                    {l.unit ? `, ${l.unit}` : ''}
                    <br />
                    {l.city}, {l.state} {l.zip}
                  </address>

                  <div className="mt-auto flex flex-col gap-2.5 pt-1 sm:flex-row">
                    <a href={l.phoneHref} className="btn btn--ghost flex-1">
                      <Phone className="h-4 w-4" />
                      {l.phone}
                    </a>
                    <a
                      href={l.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost flex-1"
                    >
                      <Navigation className="h-4 w-4" />
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ + contact rail */}
        <div className="mt-[clamp(4.5rem,8vw,7rem)] grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <h3 className="display mb-9 text-[clamp(1.7rem,4vw,2.6rem)] text-bone">
                Before you come in
              </h3>
            </Reveal>
            <FaqAccordion />
          </div>

          <Reveal delay={140}>
            <div className="border border-[color:var(--line-dark)] bg-ink p-7 sm:p-8">
              <p className="eyebrow mb-6">Still stuck?</p>
              <p className="mb-7 leading-relaxed text-steel-light">
                Call the shop you want and someone behind the chair will pick up.
                For anything else, Jake reads the inbox.
              </p>

              <ul className="flex flex-col gap-3">
                {locations.map((l) => (
                  <li key={l.slug}>
                    <a
                      href={l.phoneHref}
                      className="flex items-center justify-between gap-4 border border-[color:var(--line-dark)] px-5 py-4 transition-colors duration-300 hover:border-crimson"
                    >
                      <span className="mono text-steel">{l.shortName}</span>
                      <span className="tnum text-bone">{l.phone}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={site.emailHref}
                    className="flex items-center gap-3 border border-[color:var(--line-dark)] px-5 py-4 transition-colors duration-300 hover:border-crimson"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-steel" />
                    <span className="truncate text-bone">{site.email}</span>
                  </a>
                </li>
              </ul>

              <div className="mt-8 border-t border-[color:var(--line-dark)] pt-6">
                <p className="mono mb-3 text-steel-dim">Serving</p>
                <p className="leading-relaxed text-steel-light">
                  {site.serviceArea.join(' · ')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
