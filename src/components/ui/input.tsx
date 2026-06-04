import * as React from 'react';

import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-2xl border border-[color:var(--emerald)]/15 bg-white px-4 text-sm text-[var(--forest)] shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[color:var(--emerald)]/60 focus:ring-2 focus:ring-[color:var(--gold)]/25',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
