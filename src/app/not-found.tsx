import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="px-4 py-28 text-center lg:px-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--emerald)]">404</p>
        <h1 className="text-4xl font-semibold text-[var(--forest)] sm:text-5xl">Page not found</h1>
        <p className="text-base leading-8 text-slate-600">The requested Al-Ghani page could not be found in the rebuilt premium front-end.</p>
        <Link href="/"><Button>Back to home</Button></Link>
      </div>
    </section>
  );
}
