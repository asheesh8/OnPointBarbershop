'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Phone } from 'lucide-react';
import { useLocationCtx } from './LocationProvider';
import LocationSwitch from './LocationSwitch';
import OpenStatus from './OpenStatus';

/** Each shop gets its own backdrop, so switching shops re-skins the hero. */
const backdrop: Record<string, { src: string; alt: string }> = {
  williston: {
    src: '/media/shop-wide.webp',
    alt: 'Barber chairs and lit mirrors inside the Williston shop, looking out on a snowy Vermont village street',
  },
  colchester: {
    src: '/media/shop-colchester.webp',
    alt: 'The Colchester studio, with styling chairs and a window onto pines and Lake Champlain',
  },
};

export default function Hero() {
  const { active, slug } = useLocationCtx();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      <motion.div
        style={reduce ? undefined : { scale: mediaScale }}
        className="absolute inset-0"
      >
        {Object.entries(backdrop).map(([key, img]) => (
          <div
            key={key}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ${
              key === slug ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img.src}
              alt={key === slug ? img.alt : ''}
              fill
              priority={key === 'williston'}
              sizes="100vw"
              className={`object-cover ${reduce ? '' : 'animate-kenburns'}`}
            />
          </div>
        ))}
      </motion.div>

      {/* Legibility. Lighter than before — there is less type to protect now,
          so the photograph is allowed to carry more of the frame. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full px-[var(--page-pad)] pb-16 pt-[calc(var(--header-h)+2rem)] sm:pb-24 sm:pt-[calc(var(--header-h)+4rem)]"
      >
        <div className="mx-auto max-w-[84rem]">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow mb-5 sm:mb-8"
          >
            Williston &amp; Colchester, Vermont
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="display display-tight max-w-[48rem] text-[clamp(2.3rem,6.2vw,5.2rem)] text-bone"
          >
            Sharp isn&apos;t a look.
            <br />
            It&apos;s a <span className="text-crimson-bright">standard.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.34 }}
            className="mt-5 max-w-[34rem] text-[1.02rem] leading-relaxed text-steel-light sm:mt-7"
          >
            Two shops, ten minutes apart. One standard in both chairs.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.46 }}
            className="mt-8 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <div className="grid gap-3 sm:contents">
              <a
                href={active.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--crimson sm:min-w-[14.5rem]"
              >
                Book {active.shortName}
              </a>
              <a href={active.phoneHref} className="btn btn--ghost">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">{active.phone}</span>
                <span className="sm:hidden">Call</span>
              </a>
            </div>
            <div className="w-full sm:ml-2 sm:w-[min(17rem,100%)]">
              <LocationSwitch size="sm" />
            </div>
          </motion.div>

          {/* One quiet line of context, on a rule, instead of a stacked block */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[color:var(--line-dark)] pt-5 sm:mt-10"
          >
            <OpenStatus location={active} />
            <span className="mono text-steel-dim">
              {active.street}
              {active.unit ? `, ${active.unit}` : ''} · {active.city}
            </span>
          </motion.div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-steel sm:block">
        <ChevronDown className="h-5 w-5 animate-scroll-cue" aria-hidden="true" />
      </div>
    </section>
  );
}
