import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { byslug, team } from '@/lib/site';
import Reveal from './Reveal';

/**
 * The whole crew at a glance. Showing all seven rather than a curated four is
 * the point — the roster size is itself the argument. Bios and booking links
 * live on /team.
 */
export default function TeamPreview() {
  return (
    <section className="section bg-ink">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="eyebrow mb-6">Behind the chair</p>
            <h2 className="display max-w-[14ch] text-[clamp(2.1rem,6vw,4.4rem)] text-bone">
              The people{' '}
              <span className="text-crimson-bright">holding the clippers.</span>
            </h2>
            <p className="mt-6 max-w-[50ch] text-steel-light">
              Seven barbers and stylists across the two shops. Everyone trained
              somewhere and worked somewhere before this.
            </p>
          </Reveal>

          <Reveal delay={110}>
            <Link href="/team" className="btn btn--ghost">
              Meet the team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <ul className="section-body grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
          {team.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={Math.min(i * 55, 320)}>
              <Link
                href="/team"
                className="group block"
                aria-label={`${m.name}, ${m.role} — read bio`}
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-[color:var(--line-dark)] transition-colors duration-500 group-hover:border-crimson">
                  <Image
                    src={m.photo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12rem"
                    className="object-cover transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  {/* Same grade as the full grid, so a very mixed set of source
                      snapshots still reads as one row */}
                  <div className="absolute inset-0 bg-ink/25 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
                </div>

                <div className="mt-3">
                  <h3 className="display-wide text-[0.98rem] leading-tight text-bone">
                    {m.name}
                  </h3>
                  <p className="mono mt-1.5 text-[0.55rem] text-steel">
                    {m.role}
                  </p>
                  <p className="mono mt-1 text-[0.55rem] text-steel-dim">
                    {m.at.map((s) => byslug(s).shortName).join(' · ')}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
