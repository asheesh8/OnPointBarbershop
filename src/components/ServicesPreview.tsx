'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/site';
import { useLocationCtx } from './LocationProvider';
import Reveal from './Reveal';

/** The four everyday services. The full menu lives on /services. */
const headline = ['Hair Cut', 'Cut & Beard Combo', 'Hair & Face Shave Combo', 'Beard Trim & Edge'];

export default function ServicesPreview() {
  const { slug } = useLocationCtx();
  const shown = headline
    .map((n) => services.find((s) => s.name === n)!)
    .filter(Boolean);

  return (
    <section className="section bg-bone text-ink">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <p className="eyebrow eyebrow--on-light mb-6">The menu</p>
            <h2 className="display max-w-[15ch] text-[clamp(2.1rem,6vw,4.4rem)]">
              Priced plainly. <span className="text-crimson">No upsell.</span>
            </h2>
            <p className="mt-6 max-w-[50ch] text-ink/65">
              What you see is what you pay. Every cut is finished with a line up
              and a warm towel, whatever you booked.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Link href="/services" className="btn btn--ghost-dark">
              Full menu &amp; prices
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="section-body grid gap-x-20 gap-y-0 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <ul className="border-t border-[color:var(--line-light)]">
            {shown.map((s, i) => (
              <Reveal as="li" key={s.name} delay={Math.min(i * 60, 240)}>
                <div className="border-b border-[color:var(--line-light)] py-6">
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
                </div>
              </Reveal>
            ))}
            <Reveal as="li" delay={280}>
              <Link
                href="/services"
                className="mono group flex items-center justify-between gap-4 border-b border-[color:var(--line-light)] py-6 text-crimson"
              >
                See all {services.length} services, including colour at Colchester
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </ul>

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
                  <p className="mono mb-2 text-steel-light">Every cut includes</p>
                  <p className="display mb-5 text-[1.6rem] leading-tight text-bone">
                    A line up and a warm towel
                  </p>
                  <Link
                    href={`/locations/${slug}`}
                    className="btn btn--solid w-full"
                  >
                    Book a chair
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
