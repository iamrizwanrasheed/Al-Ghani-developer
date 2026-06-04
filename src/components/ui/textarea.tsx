import * as React from 'react';

import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-32 w-full rounded-2xl border border-[color:var(--emerald)]/15 bg-white px-4 py-3 text-sm text-[var(--forest)] shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[color:var(--emerald)]/60 focus:ring-2 focus:ring-[color:var(--gold)]/25',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';
