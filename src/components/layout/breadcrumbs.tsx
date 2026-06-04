import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items }: { items: Array<{ label: string; href: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span className="inline-flex items-center gap-2" key={item.href}>
            {isLast ? (
              <span className="font-medium text-[var(--forest)]">{item.label}</span>
            ) : (
              <Link className="transition hover:text-[var(--emerald)]" href={item.href}>{item.label}</Link>
            )}
            {!isLast ? <ChevronRight className="h-4 w-4 text-slate-300" /> : null}
          </span>
        );
      })}
    </nav>
  );
}
