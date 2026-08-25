'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { locations } from '@/lib/site';
import Reveal from './Reveal';

export default function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/media/storefront-dusk.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-ink/78" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />

      <div className="section">
        <div className="shell text-center">
          <Reveal>
            <p className="eyebrow mb-7 justify-center">Ready when you are</p>
            <h2 className="display display-tight mx-auto max-w-[14ch] text-[clamp(2.4rem,8.5vw,6.4rem)] text-bone">
              Book the chair.
            </h2>
            <p className="mx-auto mt-7 max-w-[46ch] text-steel-light">
              Same-day slots open up more often than you would think. Pick a shop
              and take one.
            </p>

            <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {locations.map((l) => (
                <a
                  key={l.slug}
                  href={l.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--crimson w-full min-w-[15rem] sm:w-auto"
                >
                  Book {l.shortName}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="pole-rule" aria-hidden="true" />
    </section>
  );
}
