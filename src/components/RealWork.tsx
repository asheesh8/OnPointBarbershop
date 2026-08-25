import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { realWork, site } from '@/lib/site';
import Reveal from './Reveal';
import { InstagramIcon } from './SocialIcons';

/**
 * Actual client work from the shop's own galleries — the proof section. Kept
 * deliberately separate from the atmosphere photography elsewhere on the page
 * so it is unambiguous which images are the barbers' real results.
 */
export default function RealWork({ heading = true }: { heading?: boolean }) {
  return (
    <section className="section bg-ink-2">
      <div className="shell">
        <div
          className={`flex flex-wrap items-end gap-8 ${heading ? 'justify-between' : 'justify-end'}`}
        >
          {heading && (
            <Reveal>
              <p className="eyebrow mb-6">Real cuts</p>
              <h2 className="display max-w-[16ch] text-[clamp(2.1rem,6vw,4.4rem)] text-bone">
                Out of these <span className="text-crimson-bright">chairs.</span>
              </h2>
              <p className="mt-6 max-w-[48ch] text-steel-light">
                Not stock photography. These came off the shop floor in Williston
                and Colchester.
              </p>
            </Reveal>
          )}

          <Reveal delay={110}>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <InstagramIcon className="h-4 w-4" />
              More on Instagram
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <ul className="section-body grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {realWork.map((w, i) => (
            <Reveal as="li" key={w.src} delay={Math.min(i * 80, 320)}>
              <figure className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={w.src}
                  alt={w.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 20rem"
                  className="object-cover transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-90" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <span className="mono text-bone">{w.label}</span>
                  <span
                    aria-hidden="true"
                    className="mt-2 block h-[2px] w-0 bg-crimson transition-all duration-500 group-hover:w-10"
                  />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
