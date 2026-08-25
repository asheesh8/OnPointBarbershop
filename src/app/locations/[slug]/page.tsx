import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Navigation, Phone, Star } from 'lucide-react';
import ClosingCta from '@/components/ClosingCta';
import OpenStatus from '@/components/OpenStatus';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SetActiveLocation from '@/components/SetActiveLocation';
import { locations, services, site, team } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

const art: Record<string, { hero: string; heroAlt: string; mark: string }> = {
  williston: {
    hero: '/media/shop-wide.webp',
    heroAlt: 'Barber chairs lined up under lit mirror stations in a dark, warmly lit shop',
    mark: '/brand/mark-onpoint.png',
  },
  colchester: {
    hero: '/media/shop-colchester.webp',
    heroAlt: 'Bright barbering and cosmetology studio with styling chairs and daylight',
    mark: '/brand/mark-onpoint-2.png',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) return {};

  return {
    title: `${l.shortName}, VT`,
    description: `${l.name} at ${l.street}${l.unit ? `, ${l.unit}` : ''}, ${l.city}, Vermont. ${l.rating} from ${l.reviewCount} reviews. Hours, directions and online booking.`,
    alternates: { canonical: `/locations/${l.slug}` },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) notFound();

  const a = art[l.slug];
  const crew = team.filter((m) => m.at.includes(l.slug));
  const menu = services.filter((s) => s.at.includes(l.slug));
  const other = locations.find((x) => x.slug !== l.slug)!;

  return (
    <>
      {/* Landing here is itself a choice of shop — carry it into the header CTA */}
      <SetActiveLocation slug={l.slug} />

      <PageHero
        eyebrow={l.tagline}
        title={`${l.shortName},`}
        accent="Vermont."
        intro={`${l.street}${l.unit ? `, ${l.unit}` : ''} · ${l.city}, ${l.state} ${l.zip}`}
        image={a.hero}
        imageAlt={a.heroAlt}
        crumbs={[{ label: 'Shops', href: '/locations' }, { label: l.shortName }]}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <OpenStatus location={l} />
            <span className="inline-flex items-center gap-2 mono text-steel">
              <Star
                className="h-3.5 w-3.5 fill-crimson-bright text-crimson-bright"
                aria-hidden="true"
              />
              {l.rating} · {l.reviewCount} reviews
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={l.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--crimson min-w-[14rem]"
            >
              Book {l.shortName}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={l.phoneHref} className="btn btn--ghost">
              <Phone className="h-4 w-4" />
              {l.phone}
            </a>
            <a
              href={l.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <Navigation className="h-4 w-4" />
              Directions
            </a>
          </div>
        </div>
      </PageHero>

      {/* Hours + map */}
      <section className="section bg-ink">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="eyebrow mb-6">Opening hours</p>
            <h2 className="display mb-9 text-[clamp(1.9rem,5vw,3.2rem)] text-bone">
              When the doors are open
            </h2>
            <dl className="border-t border-[color:var(--line-dark)]">
              {l.hoursSummary.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-[color:var(--line-dark)] py-4"
                >
                  <dt className="mono text-steel-dim">{row.label}</dt>
                  <dd className="tnum text-bone">{row.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 flex flex-wrap gap-2">
              {l.amenities.map((am) => (
                <li
                  key={am}
                  className="mono border border-[color:var(--line-dark)] px-3 py-1.5 text-[0.6rem] text-steel"
                >
                  {am}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={110}>
            <div className="relative aspect-[4/3] overflow-hidden border border-[color:var(--line-dark)] bg-ink-3 lg:aspect-auto lg:h-full lg:min-h-[26rem]">
              <iframe
                src={l.mapEmbedUrl}
                title={`Map showing ${l.name} at ${l.street}, ${l.city}, Vermont`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 grayscale-[0.55] contrast-[1.05] invert-[0.9] hue-rotate-180"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who works here */}
      <section className="section bg-ink-2">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <p className="eyebrow mb-6">The chairs</p>
              <h2 className="display max-w-[16ch] text-[clamp(2.1rem,6vw,3.6rem)] text-bone">
                Who you&apos;ll{' '}
                <span className="text-crimson-bright">sit with.</span>
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <Link href="/team" className="btn btn--ghost">
                All {team.length} barbers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <ul className="section-body grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {crew.map((m, i) => (
              <Reveal as="li" key={m.slug} delay={Math.min(i * 70, 280)}>
                <Link
                  href="/team"
                  className="group block border border-[color:var(--line-dark)] bg-ink transition-colors duration-500 hover:border-steel-dim"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={m.photo}
                      alt={`${m.name}, ${m.role}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 18rem"
                      className="object-cover transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-ink/25 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="display text-[1.25rem] leading-none text-bone">
                        {m.name}
                      </h3>
                      <p className="mono mt-2 text-crimson-bright">{m.role}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* What this shop does */}
      <section className="section bg-ink">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <p className="eyebrow mb-6">On the menu here</p>
              <h2 className="display max-w-[16ch] text-[clamp(2.1rem,6vw,3.6rem)] text-bone">
                {l.slug === 'colchester'
                  ? 'Barbering and colour, one roof.'
                  : 'Cuts, beards and straight razors.'}
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <Link href="/services" className="btn btn--ghost">
                Full menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <ul className="section-body border-t border-[color:var(--line-dark)]">
            {menu.map((s, i) => (
              <Reveal as="li" key={s.name} delay={Math.min(i * 55, 280)}>
                <div className="flex items-baseline gap-3 border-b border-[color:var(--line-dark)] py-5 sm:gap-5">
                  <h3 className="display-wide shrink-0 text-[1.15rem] text-bone sm:text-[1.3rem]">
                    {s.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-[color:var(--line-dark)] sm:block"
                  />
                  <span className="display tnum ml-auto text-[1.4rem] leading-none text-bone sm:ml-0 sm:text-[1.7rem]">
                    {s.price}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Cross-link to the other shop */}
      <section className="section bg-ink-2">
        <div className="shell">
          <Reveal>
            <Link
              href={`/locations/${other.slug}`}
              className="group flex flex-col gap-6 border border-[color:var(--line-dark)] p-7 transition-colors duration-500 hover:border-crimson sm:flex-row sm:items-center sm:gap-8 sm:p-9"
            >
              <Image
                src={art[other.slug].mark}
                alt=""
                width={900}
                height={900}
                className="h-16 w-16 shrink-0 rounded-full bg-bone object-contain p-1.5 sm:h-20 sm:w-20"
              />
              <div className="min-w-0 flex-1">
                <p className="mono mb-2 text-steel-dim">Our other shop</p>
                <h2 className="display text-[clamp(1.6rem,4vw,2.4rem)] text-bone">
                  {other.shortName}
                </h2>
                <p className="mt-2 text-steel-light">
                  {other.street}
                  {other.unit ? `, ${other.unit}` : ''} · {other.city}, {other.state}
                  {' · '}
                  {other.tagline}
                </p>
              </div>
              <ArrowRight className="hidden h-6 w-6 shrink-0 text-steel transition-transform duration-500 group-hover:translate-x-1 group-hover:text-crimson-bright sm:block" />
            </Link>
          </Reveal>

          <Reveal delay={110}>
            <p className="mono mt-8 text-steel-dim">
              Serving {site.serviceArea.join(' · ')}
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
