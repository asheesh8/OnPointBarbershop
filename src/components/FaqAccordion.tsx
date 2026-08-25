'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '@/lib/site';
import Reveal from './Reveal';

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-[color:var(--line-dark)]">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal as="li" key={f.q} delay={Math.min(i * 50, 240)}>
            <div className="border-b border-[color:var(--line-dark)]">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`display-wide text-[1.1rem] transition-colors duration-300 sm:text-[1.25rem] ${
                      isOpen ? 'text-crimson-bright' : 'text-bone'
                    }`}
                  >
                    {f.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-steel transition-transform duration-[420ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'rotate-45 text-crimson-bright' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                hidden={!isOpen}
              >
                <p className="max-w-[62ch] pb-7 leading-relaxed text-steel-light">
                  {f.a}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
