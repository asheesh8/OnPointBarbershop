import type { Metadata } from 'next';
import ClosingCta from '@/components/ClosingCta';
import PageHero from '@/components/PageHero';
import VisitSection from '@/components/VisitSection';

export const metadata: Metadata = {
  title: 'Visit & Contact',
  description:
    'Find On Point Barbershop at 777 Zephyr Road, Williston and 97 Blakely Rd, Colchester, Vermont. Hours, directions, phone numbers and answers before your first visit.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit"
        title="Find us."
        accent="Both of us."
        intro="Two shops, ten minutes apart. Hours, directions and the answers to what people usually ask before a first visit."
        image="/media/storefront-dusk.webp"
        imageAlt="A Vermont barbershop lit from within at blue hour in the snow"
        crumbs={[{ label: 'Visit' }]}
        titleWidth="max-w-[11ch]"
      />

      <VisitSection heading={false} />
      <ClosingCta />
    </>
  );
}
