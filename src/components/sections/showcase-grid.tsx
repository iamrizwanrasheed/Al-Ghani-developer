import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { MotionFade } from '@/components/shared/motion-fade';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { SiteRecord } from '@/types/content';

export function ShowcaseGrid({
  items,
  eyebrow,
  title,
  description,
}: {
  items: SiteRecord[];
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="px-4 py-16 lg:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="max-w-3xl space-y-4">
          <Badge>{eyebrow}</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--forest)] sm:text-4xl">{title}</h2>
          <p className="text-base leading-8 text-slate-600">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <MotionFade key={item.pathname} delay={index * 0.05}>
              <Link href={item.pathname}>
                <Card className="group overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {item.firstImage ? (
                      <Image
                        src={item.firstImage}
                        alt={item.pageTitle}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                      />
                    ) : null}
                  </div>
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-[var(--forest)]">{item.pageTitle}</h3>
                      <ArrowUpRight className="h-5 w-5 text-[var(--emerald)] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <p className="line-clamp-3 text-sm leading-7 text-slate-600">{item.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  );
}
