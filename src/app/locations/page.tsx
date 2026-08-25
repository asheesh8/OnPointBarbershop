import type { Metadata } from 'next';
import ClosingCta from '@/components/ClosingCta';
import PageHero from '@/components/PageHero';
import ShopCards from '@/components/ShopCards';
import Standards from '@/components/Standards';

export const metadata: Metadata = {
  title: 'Our Two Shops',
  description:
    'On Point Barbershop has two Vermont shops: the original on Zephyr Road in Williston, and On Point Barbershop 2 on Blakely Road in Colchester, which adds full colour and cosmetology.',
  alternates: { canonical: '/locations' },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Two shops"
        title="Same standard,"
        accent="either door."
        intro="Williston is the original. Colchester added a full cosmetology side alongside the same barbering. Pick whichever is closer."
        image="/media/shop-wide.webp"
        imageAlt="Barber chairs lined up under lit mirror stations in a dark, warmly lit shop"
        crumbs={[{ label: 'Shops' }]}
        titleWidth="max-w-[15ch]"
      />

      <ShopCards heading={false} />
      <Standards />
      <ClosingCta />
    </>
  );
}
