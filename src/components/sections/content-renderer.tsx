import { MotionFade } from '@/components/shared/motion-fade';
import { RichText } from '@/components/shared/rich-text';
import { Card } from '@/components/ui/card';

export function ContentRenderer({ html }: { html: string }) {
  return (
    <section className="px-4 py-12 lg:px-6 lg:py-16">
      <MotionFade className="mx-auto max-w-5xl">
        <Card className="overflow-hidden p-6 sm:p-8 lg:p-12">
          <RichText html={html} />
        </Card>
      </MotionFade>
    </section>
  );
}
