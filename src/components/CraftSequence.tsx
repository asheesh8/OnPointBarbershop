'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

const steps = [
  {
    n: '01',
    title: 'Book it',
    body: 'Pick the shop, pick the barber — or take whoever is next — and pick a time. The whole thing takes under a minute and you are not calling anyone.',
    src: '/media/chair-mirror.webp',
    alt: 'A client seated in a barber chair facing a lit round mirror',
  },
  {
    n: '02',
    title: 'Talk it through',
    body: 'Get here five minutes early. Bring a photo if you have one in mind — we would rather see it than guess. No photo, no problem; we will work it out in the chair.',
    src: '/media/detail-shears.webp',
    alt: 'Shears cutting over a comb with hair suspended in backlight',
  },
  {
    n: '03',
    title: 'The work',
    body: 'Clippers, shears and a straight razor, in whatever order the cut needs. Every one finishes with a line up and a warm towel, whatever you booked.',
    src: '/media/detail-razor.webp',
    alt: 'A straight razor edging a sharp beard line through white lather',
  },
  {
    n: '04',
    title: 'Out sharp',
    body: 'Before you go we will tell you how to hold the shape until the next one — usually three to four weeks, sooner if you run it tight.',
    src: '/media/fade-back.webp',
    alt: 'The back of a freshly cut skin fade with a clean taper and neckline',
  },
];

export default function CraftSequence() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // Whichever step owns the most of the middle band wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number((visible.target as HTMLElement).dataset.step);
          if (!Number.isNaN(idx)) setActiveStep(idx);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] }
    );

    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="craft" className="relative bg-ink-2">
      <div className="pole-rule" aria-hidden="true" />

      <div className="section">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-6">In the chair</p>
            <h2 className="display max-w-[17ch] text-[clamp(2.1rem,6vw,4.4rem)] text-bone">
              Four steps. <span className="text-crimson-bright">No surprises.</span>
            </h2>
          </Reveal>

          <div className="section-body grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Sticky media column */}
            <div className="order-1 lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:order-none lg:h-[min(34rem,70vh)]">
              <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-full">
                {steps.map((s, i) => (
                  <div
                    key={s.n}
                    className={`absolute inset-0 transition-opacity duration-[900ms] ${
                      i === activeStep ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={s.src}
                      alt={i === activeStep ? s.alt : ''}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40rem"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                {/* Progress ticks */}
                <div className="absolute bottom-6 left-6 flex gap-2">
                  {steps.map((s, i) => (
                    <span
                      key={s.n}
                      className={`h-[3px] transition-all duration-500 ${
                        i === activeStep ? 'w-9 bg-crimson' : 'w-4 bg-bone/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Steps */}
            <ol className="flex flex-col">
              {steps.map((s, i) => (
                <li key={s.n}>
                  <div
                    data-step={i}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className={`border-t border-[color:var(--line-dark)] py-9 transition-opacity duration-500 lg:py-14 ${
                      i === activeStep ? 'opacity-100' : 'opacity-45'
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <span
                        className={`display tnum mt-1 text-[1.4rem] transition-colors duration-500 ${
                          i === activeStep ? 'text-crimson-bright' : 'text-steel-dim'
                        }`}
                      >
                        {s.n}
                      </span>
                      <div>
                        <h3 className="display text-[clamp(1.6rem,3.6vw,2.4rem)] text-bone">
                          {s.title}
                        </h3>
                        <p className="mt-3 max-w-[46ch] leading-relaxed text-steel-light">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
