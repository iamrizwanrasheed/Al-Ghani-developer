import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Badge } from '@/components/ui/badge';

export function PageHeader({
  title,
  description,
  breadcrumbs,
  eyebrow,
}: {
  title: string;
  description: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  eyebrow: string;
}) {
  return (
    <section className="px-4 py-12 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <div className="max-w-4xl space-y-4">
          <Badge>{eyebrow}</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--forest)] sm:text-5xl">{title}</h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}
