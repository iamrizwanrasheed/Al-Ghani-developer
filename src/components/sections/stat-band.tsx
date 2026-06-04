import { Counter } from '@/components/shared/counter';
import { MotionFade } from '@/components/shared/motion-fade';
import { Card } from '@/components/ui/card';

export function StatBand({ items }: { items: Array<{ label: string; value: number; suffix?: string }> }) {
  return (
    <section className="px-4 pb-6 lg:px-6 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <MotionFade delay={index * 0.05} key={item.label}>
            <Card className="h-full p-6">
              <div className="text-4xl font-semibold tracking-tight text-[var(--forest)]">
                <Counter value={item.value} suffix={item.suffix} />
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.22em] text-slate-500">{item.label}</p>
            </Card>
          </MotionFade>
        ))}
      </div>
    </section>
  );
}
