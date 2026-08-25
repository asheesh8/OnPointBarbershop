import { CalendarCheck, Palette, ShieldCheck, Tags } from 'lucide-react';
import Reveal from './Reveal';

/**
 * Only things that can be checked against the shop's own price list, booking
 * system and opening hours. No invented figures, no unverifiable awards.
 */
const standards = [
  {
    icon: Tags,
    title: 'One price list, two shops',
    body: 'A cut costs the same in Colchester as it does in Williston. No location surcharge, no "senior stylist" tier bolted on at the till.',
  },
  {
    icon: CalendarCheck,
    title: 'Book online or just turn up',
    body: 'Every chair is on Vagaro, so you can hold a specific barber and time. Walk in instead and we will take you as soon as a chair frees up.',
  },
  {
    icon: Palette,
    title: 'Barbering and colour together',
    body: 'Colchester runs a licensed cosmetology side, so colour, highlights and balayage happen in the same building as the fades.',
  },
  {
    icon: ShieldCheck,
    title: 'A standing rate for service',
    body: 'Active military, first responders and anyone 65 or over pay a set lower price. It is on the menu, not something you have to ask for.',
  },
];

export default function Standards() {
  return (
    <section className="section bg-bone text-ink">
      <div className="shell">
        <Reveal>
          <p className="eyebrow eyebrow--on-light mb-6">How we run it</p>
          <h2 className="display max-w-[16ch] text-[clamp(2.1rem,6vw,4.4rem)]">
            The things we <span className="text-crimson">won&apos;t bend on.</span>
          </h2>
        </Reveal>

        <ul className="section-body grid gap-px border border-[color:var(--line-light)] bg-[color:var(--line-light)] sm:grid-cols-2">
          {standards.map((s, i) => (
            <Reveal as="li" key={s.title} delay={Math.min(i * 80, 320)}>
              <div className="group flex h-full flex-col gap-4 bg-bone p-8 transition-colors duration-500 hover:bg-paper sm:p-10">
                <s.icon
                  className="h-6 w-6 text-crimson transition-transform duration-500 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <h3 className="display-wide text-[1.3rem] sm:text-[1.5rem]">
                  {s.title}
                </h3>
                <p className="max-w-[46ch] leading-relaxed text-ink/65">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
