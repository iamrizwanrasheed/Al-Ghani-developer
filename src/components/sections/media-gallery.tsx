import Image from 'next/image';

import { MotionFade } from '@/components/shared/motion-fade';

export function MediaGallery({ images, title }: { images: string[]; title: string }) {
  if (!images.length) return null;

  return (
    <section className="px-4 lg:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-12">
        {images.slice(0, 5).map((image, index) => (
          <MotionFade key={image + index} delay={index * 0.05} className={index === 0 ? 'xl:col-span-7' : 'xl:col-span-5'}>
            <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--emerald)]/10 bg-white shadow-[0_24px_80px_rgba(9,23,18,0.08)]">
              <div className={`relative ${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                <Image src={image} alt={`${title} media ${index + 1}`} fill className="object-cover" sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw" />
              </div>
            </div>
          </MotionFade>
        ))}
      </div>
    </section>
  );
}
