import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function CtaBanner({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <section className="px-4 py-16 lg:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-[linear-gradient(135deg,var(--forest),var(--emerald))] p-8 text-white shadow-[0_30px_120px_rgba(9,23,18,0.3)] sm:p-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--gold)]">Al-Ghani Developers</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/75">{description}</p>
          </div>
          <Link href={href}><Button className="bg-white text-[var(--forest)] hover:bg-[color:var(--ivory)]" size="lg">{action}<ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
      </div>
    </section>
  );
}
