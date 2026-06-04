import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';

import { MotionFade } from '@/components/shared/motion-fade';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function HeroSection({
  eyebrow,
  title,
  description,
  image,
  primaryAction,
  secondaryAction,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string | null;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20 lg:px-6 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,66,48,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(156,143,108,0.16),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <MotionFade className="space-y-6">
          <Badge>{eyebrow}</Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--forest)] sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {primaryAction ? (
              <Link href={primaryAction.href}><Button size="lg">{primaryAction.label}<ArrowRight className="h-4 w-4" /></Button></Link>
            ) : null}
            {secondaryAction ? (
              <Link href={secondaryAction.href}><Button size="lg" variant="secondary">{secondaryAction.label}</Button></Link>
            ) : null}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--emerald)]/10 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm">
            <BadgeCheck className="h-4 w-4 text-[var(--emerald)]" />
            Preserving original Al-Ghani business content and media
          </div>
        </MotionFade>
        <MotionFade delay={0.1} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white p-3 shadow-[0_30px_120px_rgba(9,23,18,0.16)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[color:var(--mint)]/70">
              {image ? (
                <Image src={image} alt={title} fill className="object-cover" priority sizes="(min-width: 1024px) 45vw, 100vw" />
              ) : null}
            </div>
          </div>
        </MotionFade>
      </div>
    </section>
  );
}
