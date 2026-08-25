import type { Metadata } from 'next';
import ClosingCta from '@/components/ClosingCta';
import CraftSequence from '@/components/CraftSequence';
import GalleryMarquee from '@/components/GalleryMarquee';
import PageHero from '@/components/PageHero';
import RealWork from '@/components/RealWork';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Real cuts from the chairs at On Point Barbershop in Williston and Colchester, Vermont — fades, hard parts, textured crops and beard work.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="The work"
        title="Fades, edges,"
        accent="and the details."
        intro="Real client work from both shops, plus a look at how an appointment actually runs."
        image="/media/detail-clippers.webp"
        imageAlt="Clippers cutting a crisp line at the nape of a neck"
        crumbs={[{ label: 'Gallery' }]}
        titleWidth="max-w-[16ch]"
      />

      <RealWork heading={false} />
      <GalleryMarquee />
      <CraftSequence />
      <ClosingCta />
    </>
  );
}
