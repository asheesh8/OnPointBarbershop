import type { Metadata } from 'next';
import ClosingCta from '@/components/ClosingCta';
import PageHero from '@/components/PageHero';
import TeamGrid from '@/components/TeamGrid';

export const metadata: Metadata = {
  title: 'Meet the Barbers',
  description:
    'Seven barbers and stylists across On Point Barbershop’s Williston and Colchester shops, in their own words — training, experience and what each one is known for.',
  alternates: { canonical: '/team' },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Behind the chair"
        title="Seven barbers."
        accent="One standard."
        intro="Everyone here trained somewhere and worked somewhere before this. Every bio below is their own writing, lifted from their booking profiles."
        image="/media/detail-razor.webp"
        imageAlt="A straight razor edging a sharp beard line through white lather"
        crumbs={[{ label: 'Team' }]}
        titleWidth="max-w-[15ch]"
      />

      <TeamGrid heading={false} />
      <ClosingCta />
    </>
  );
}
