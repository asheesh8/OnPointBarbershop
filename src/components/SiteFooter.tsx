import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { locations, site } from '@/lib/site';
import { FacebookIcon, InstagramIcon } from './SocialIcons';

const year = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="bg-ink px-[var(--page-pad)] pb-10 pt-[clamp(3.5rem,7vw,6rem)]">
      <div className="shell">
        <div className="grid gap-12 border-b border-[color:var(--line-dark)] pb-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/mark-onpoint.png"
                alt=""
                width={756}
                height={762}
                className="h-12 w-12 rounded-full bg-bone object-contain p-1"
              />
              <span>
                <span className="display block text-[1.2rem] leading-none text-bone">
                  On Point
                </span>
                <span className="mono block text-[0.55rem] leading-none text-steel">
                  Barbershop · Vermont
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-[38ch] leading-relaxed text-steel">
              Barbering in Williston and Colchester, Vermont. Cuts, beard work
              and straight-razor shaves, plus full colour at our Colchester studio.
            </p>
            <div className="mt-7 flex gap-2.5">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="On Point Barbershop on Instagram"
                className="flex h-11 w-11 items-center justify-center border border-[color:var(--line-dark)] text-steel-light transition-colors hover:border-crimson hover:text-bone"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="On Point Barbershop on Facebook"
                className="flex h-11 w-11 items-center justify-center border border-[color:var(--line-dark)] text-steel-light transition-colors hover:border-crimson hover:text-bone"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={site.emailHref}
                aria-label={`Email ${site.email}`}
                className="flex h-11 w-11 items-center justify-center border border-[color:var(--line-dark)] text-steel-light transition-colors hover:border-crimson hover:text-bone"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {locations.map((l) => (
            <div key={l.slug}>
              <Link
                href={`/locations/${l.slug}`}
                className="mono mb-5 block text-steel-dim transition-colors hover:text-bone"
              >
                {l.shortName}
              </Link>
              <address className="not-italic leading-relaxed text-steel-light">
                {l.street}
                {l.unit ? `, ${l.unit}` : ''}
                <br />
                {l.city}, {l.state} {l.zip}
              </address>
              <a
                href={l.phoneHref}
                className="tnum mt-3 block text-bone transition-colors hover:text-crimson-bright"
              >
                {l.phone}
              </a>
              <a
                href={l.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mono mt-5 inline-block border-b border-crimson pb-1 text-crimson-bright"
              >
                Book online
              </a>
              <dl className="mt-6 space-y-1.5">
                {l.hoursSummary.map((r) => (
                  <div key={r.label} className="flex justify-between gap-3 text-[0.82rem]">
                    <dt className="text-steel-dim">{r.label}</dt>
                    <dd className="tnum text-steel">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 pt-8">
          {[
            { label: 'Shops', href: '/locations' },
            { label: 'Services', href: '/services' },
            { label: 'Team', href: '/team' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Visit', href: '/contact' },
          ].map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="mono text-steel transition-colors hover:text-bone"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-5 border-t border-[color:var(--line-dark)] pt-8 sm:flex-row sm:items-center">
          <p className="mono text-steel-dim">
            © {year} {site.legalName}
          </p>
          <p className="mono text-steel-dim">
            Site by{' '}
            <span className="text-steel">ArkiTech Solutions</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
