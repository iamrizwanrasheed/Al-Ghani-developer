import { cn } from '@/lib/utils';

export function RichText({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(
        'rich-text prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-[var(--forest)] prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-base prose-p:leading-8 prose-li:leading-8 prose-a:text-[var(--emerald)] prose-a:no-underline hover:prose-a:text-[var(--forest)] prose-strong:text-[var(--forest)]',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
