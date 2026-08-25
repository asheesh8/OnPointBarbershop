import Image from 'next/image';
import { site } from '@/lib/site';
import { InstagramIcon } from './SocialIcons';
import Reveal from './Reveal';

const rowA = [
  { src: '/media/detail-clippers.webp', alt: 'Clippers cutting a crisp line at the nape of a neck' },
  { src: '/media/fade-back.webp', alt: 'The back of a freshly cut skin fade' },
  { src: '/media/detail-hot-towel.webp', alt: 'A steaming hot towel laid over a reclining client' },
  { src: '/media/beard-profile.webp', alt: 'A sculpted full beard traced by hard rim light' },
  { src: '/media/detail-shears.webp', alt: 'Shears cutting over a comb with hair caught in backlight' },
];

const rowB = [
  { src: '/media/barber-pole.webp', alt: 'A glowing red, white and blue barber pole at night' },
  { src: '/media/product-shelf.webp', alt: 'Grooming products and folded towels on a warm-lit walnut shelf' },
  { src: '/media/chair-chrome.webp', alt: 'Chrome and black leather detail of a vintage barber chair' },
  { src: '/media/storefront-dusk.webp', alt: 'A Vermont barbershop lit from within at blue hour in the snow' },
  { src: '/media/color-work.webp', alt: 'Balayage highlights being painted onto a section of hair' },
];

function Strip({
  items,
  reverse,
}: {
  items: { src: string; alt: string }[];
  reverse?: boolean;
}) {
  // Duplicated once so the -50% translate loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div
      className={`flex w-max gap-4 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}
    >
      {loop.map((item, i) => (
        <div
          key={`${item.src}-${i}`}
          className="relative h-[13rem] w-[19rem] shrink-0 overflow-hidden sm:h-[17rem] sm:w-[25rem]"
        >
          <Image
            src={item.src}
            // The second copy is decorative — announcing it twice helps no one.
            alt={i < items.length ? item.alt : ''}
            aria-hidden={i >= items.length}
            fill
            sizes="25rem"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default function GalleryMarquee() {
  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(6rem,11vw,10rem)]">
      <div className="shell mb-[clamp(3rem,5vw,4.5rem)] px-[var(--page-pad)]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-6">The work</p>
              <h2 className="display max-w-[16ch] text-[clamp(2.1rem,6vw,4.4rem)] text-bone">
                Fades, edges, <span className="text-crimson-bright">and the details.</span>
              </h2>
            </div>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              <InstagramIcon className="h-4 w-4" />
              {site.instagramHandle}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="marquee-host flex flex-col gap-4">
        <Strip items={rowA} />
        <Strip items={rowB} reverse />
      </div>

      {/* Feather the strips into the page edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-ink to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-ink to-transparent"
      />
    </section>
  );
}
