import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import type { SiteRecord } from '@/types/content';

export function BlogGrid({ items }: { items: SiteRecord[] }) {
  return (
    <section className="px-4 py-16 lg:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="max-w-3xl space-y-4">
          <Badge>Insights</Badge>
          <h2 className="text-3xl font-semibold text-[var(--forest)] sm:text-4xl">Al Ghani Developers Blogs</h2>
          <p className="text-base leading-8 text-slate-600">Real estate articles, buying guides, and Lahore property insights from the current Al-Ghani website.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Link href={item.pathname} key={item.pathname}>
              <Card className="group h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--ivory)]">
                  {item.firstImage ? <Image src={item.firstImage} alt={item.pageTitle} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" /> : null}
                </div>
                <CardContent className="space-y-3 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{formatDate(item.lastModified)}</p>
                  <h3 className="text-xl font-semibold text-[var(--forest)]">{item.pageTitle}</h3>
                  <p className="line-clamp-4 text-sm leading-7 text-slate-600">{item.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
