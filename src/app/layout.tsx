import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { LocationProvider } from '@/components/LocationProvider';
import MobileBar from '@/components/MobileBar';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { locations, site } from '@/lib/site';
import './globals.css';

/**
 * Archivo carries a real width axis, which is what lets the display face be
 * genuinely condensed and heavy — the voice of the arc lettering in the shop's
 * mark — instead of a transform-squashed fake.
 */
const archivo = Archivo({
  subsets: ['latin'],
  // Loading the full variable font (wght + wdth). `axes` and an explicit
  // `weight` list are mutually exclusive, and we need every weight anyway.
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0d12',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'On Point Barbershop — Barbering in Williston & Colchester, Vermont',
    template: '%s · On Point Barbershop',
  },
  description:
    'Two Vermont barbershops, one standard. Precision cuts, beard work and hot-towel straight-razor shaves in Williston and Colchester, plus full colour and cosmetology at our Colchester studio. Book online in under a minute.',
  keywords: [
    'barbershop Williston VT',
    'barbershop Colchester VT',
    'barber Burlington Vermont',
    'skin fade Vermont',
    'hot towel shave Vermont',
    'beard trim Williston',
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    locale: 'en_US',
    title: 'On Point Barbershop — Williston & Colchester, Vermont',
    description:
      'Two Vermont shops, one standard. Precision cuts, beard work and straight-razor shaves. Book online in under a minute.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'On Point Barbershop — Williston & Colchester, Vermont',
    description:
      'Two Vermont shops, one standard. Precision cuts, beard work and straight-razor shaves.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  other: {
    'geo.region': 'US-VT',
    'geo.placename': 'Williston, Colchester, Vermont',
  },
};

/** One HairSalon node per shop — two addresses on one node confuses local SEO. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': locations.map((l) => ({
    '@type': 'HairSalon',
    '@id': `${site.url}/#${l.slug}`,
    name: l.name,
    url: site.url,
    telephone: l.phone,
    email: site.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: [l.street, l.unit].filter(Boolean).join(', '),
      addressLocality: l.city,
      addressRegion: l.state,
      postalCode: l.zip,
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: l.rating,
      reviewCount: String(l.reviewCount),
      bestRating: '5',
    },
    areaServed: site.serviceArea.map((n) => ({ '@type': 'City', name: n })),
    sameAs: [site.instagram, site.facebook],
    openingHoursSpecification: (
      [
        ['Monday', 'mon'],
        ['Tuesday', 'tue'],
        ['Wednesday', 'wed'],
        ['Thursday', 'thu'],
        ['Friday', 'fri'],
        ['Saturday', 'sat'],
      ] as const
    )
      .filter(([, k]) => l.hours[k])
      .map(([label, k]) => {
        const hrs = l.hours[k]!;
        const fmt = (m: number) =>
          `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: label,
          opens: fmt(hrs.open),
          closes: fmt(hrs.close),
        };
      }),
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {/* The chosen shop lives above the router so it survives navigation */}
        <LocationProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <MobileBar />
        </LocationProvider>
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
