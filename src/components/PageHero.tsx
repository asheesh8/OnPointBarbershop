import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Crumb = { label: string; href?: string };

/**
 * Compact header for interior pages. Shorter than the home hero on purpose —
 * the visitor already committed to a destination, so the job here is to place
 * them, not to sell them again.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  image,
  imageAlt,
  crumbs = [],
  titleWidth = 'max-w-[18ch]',
  children,
}: {
  eyebrow: string;
  title: string;
  /** Trailing fragment rendered in crimson. */
  accent?: string;
  intro?: string;
  image: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  /** Tailwind max-width that decides where the headline wraps. */
  titleWidth?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-ink pt-[var(--header-h)]">
      <Image
        src={image}
        alt={imageAlt ?? ''}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />

      <div className="w-full px-[var(--page-pad)] pb-14 pt-16 sm:pb-20">
        <div className="mx-auto max-w-[84rem]">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex flex-wrap items-center gap-2">
                <li className="flex items-center gap-2">
                  <Link href="/" className="mono text-steel transition-colors hover:text-bone">
                    Home
                  </Link>
                  <ChevronRight className="h-3 w-3 text-steel-dim" aria-hidden="true" />
                </li>
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {c.href ? (
                      <Link
                        href={c.href}
                        className="mono text-steel transition-colors hover:text-bone"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span className="mono text-bone" aria-current="page">
                        {c.label}
                      </span>
                    )}
                    {i < crumbs.length - 1 && (
                      <ChevronRight className="h-3 w-3 text-steel-dim" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <p className="eyebrow mb-6">{eyebrow}</p>
          <h1
            className={`display display-tight text-[clamp(2.5rem,7.5vw,6rem)] text-bone ${titleWidth}`}
          >
            {title}
            {accent && <> <span className="text-crimson-bright">{accent}</span></>}
          </h1>
          {intro && (
            <p className="mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-steel-light sm:text-[1.1rem]">
              {intro}
            </p>
          )}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}
