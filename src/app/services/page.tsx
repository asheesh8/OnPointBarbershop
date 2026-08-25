import type { Metadata } from 'next';
import ClosingCta from '@/components/ClosingCta';
import FaqAccordion from '@/components/FaqAccordion';
import PageHero from '@/components/PageHero';
import ServiceMenu from '@/components/ServiceMenu';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Services & Prices',
  description:
    'Cuts, beard work, hot-towel straight-razor shaves and colour at On Point Barbershop in Williston and Colchester, Vermont. Full price list, no upsell.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & prices"
        title="Everything we do,"
        accent="and what it costs."
        intro="One price list across both shops. Every cut is finished with a line up and a warm towel, whatever you booked."
        image="/media/detail-shears.webp"
        imageAlt="Shears cutting over a comb with hair caught in backlight"
        crumbs={[{ label: 'Services' }]}
        titleWidth="max-w-[20ch]"
      />

      <ServiceMenu heading={false} />

      <section className="section bg-ink-2">
        <div className="shell max-w-[62rem]">
          <Reveal>
            <p className="eyebrow mb-6">Good to know</p>
            <h2 className="display mb-[clamp(2.5rem,5vw,4rem)] max-w-[16ch] text-[clamp(2.1rem,6vw,3.6rem)] text-bone">
              Questions about the menu
            </h2>
          </Reveal>
          <FaqAccordion />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
