import Image from 'next/image';
import { Star } from 'lucide-react';
import { combinedReviews, featuredReview, locations } from '@/lib/site';
import Reveal from './Reveal';

/**
 * One quote, set large, instead of a wall of cards. The previous site carried
 * six testimonials we could not source; rather than reproduce them, this leans
 * on the aggregate and sends people to the live profiles to read the rest.
 */
export default function ReviewPull() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-2">
      <Image
        src="/media/detail-hot-towel.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-[0.22]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/70 to-ink" />

      <div className="section">
        <div className="shell max-w-[62rem] text-center">
          <Reveal>
            <div className="mb-8 flex items-center justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-crimson-bright text-crimson-bright"
                  aria-hidden="true"
                />
              ))}
              <span className="mono ml-3 text-steel-light">
                {combinedReviews.rating} · {combinedReviews.count} verified reviews
              </span>
            </div>

            <blockquote>
              <p className="display display-tight text-[clamp(1.8rem,5.6vw,4rem)] text-bone">
                &ldquo;{featuredReview.quote}&rdquo;
              </p>
              <footer className="mono mt-8 text-steel">
                {featuredReview.author} — {featuredReview.meta}
              </footer>
            </blockquote>

            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              {locations.map((l) => (
                <a
                  key={l.slug}
                  href={l.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                >
                  {l.rating} · {l.reviewCount} at {l.shortName}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
