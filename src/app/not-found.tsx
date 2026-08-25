import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { locations } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center px-[var(--page-pad)] pt-[var(--header-h)]">
      <div className="shell">
        <p className="eyebrow mb-6">404</p>
        <h1 className="display display-tight max-w-[16ch] text-[clamp(2.5rem,8vw,5.5rem)] text-bone">
          That page took a <span className="text-crimson-bright">walk.</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-steel-light">
          It is not here. The shops, the menu and the booking links all still are.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn--crimson">
            Back home
            <ArrowRight className="h-4 w-4" />
          </Link>
          {locations.map((l) => (
            <Link key={l.slug} href={`/locations/${l.slug}`} className="btn btn--ghost">
              {l.shortName}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
