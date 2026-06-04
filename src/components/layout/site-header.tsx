'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

import { navigation, siteConfig } from '@/constants/site';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScroll(12);
  const [open, setOpen] = useState(false);
  const [projectMenu, setProjectMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-[var(--forest)] px-4 py-2 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs tracking-[0.2em] sm:text-sm">
          <span className="uppercase text-white/70">Premium real estate developments in Lahore</span>
          <a className="inline-flex items-center gap-2 font-medium text-[color:var(--gold)]" href={siteConfig.phoneHref}>
            <Phone className="h-3.5 w-3.5" />
            {siteConfig.phone}
          </a>
        </div>
      </div>
      <div
        className={cn(
          'border-b border-[color:var(--emerald)]/10 transition-all duration-300',
          scrolled ? 'bg-white/90 shadow-lg shadow-[var(--forest)]/5 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-md',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
          <Link className="flex items-center gap-4" href="/">
            <div className="relative h-14 w-12 overflow-hidden rounded-2xl border border-[color:var(--emerald)]/10 bg-white shadow-lg shadow-[var(--forest)]/5">
              <Image src="/media/wp-content/uploads/2024/05/Al-Ghani-Developers.png" alt="Al-Ghani Developers logo" fill className="object-contain p-1.5" priority />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--emerald)]">Al-Ghani</div>
              <div className="text-xs text-slate-500">Developers Pvt. Ltd.</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;
              const hasChildren = Boolean(item.children?.length);
              return (
                <div
                  className="relative"
                  key={item.href}
                  onMouseEnter={() => hasChildren && setProjectMenu(true)}
                  onMouseLeave={() => hasChildren && setProjectMenu(false)}
                >
                  <Link
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition',
                      active ? 'bg-[color:var(--mint)] text-[var(--forest)]' : 'text-slate-600 hover:bg-slate-100 hover:text-[var(--forest)]',
                    )}
                    href={item.href}
                  >
                    {item.label}
                    {hasChildren ? <ChevronDown className="h-4 w-4" /> : null}
                  </Link>
                  {hasChildren && projectMenu ? (
                    <div className="absolute left-0 top-full mt-3 grid w-[34rem] grid-cols-2 gap-2 rounded-[1.75rem] border border-[color:var(--emerald)]/10 bg-white p-4 shadow-[0_24px_80px_rgba(9,23,18,0.12)]">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-2xl border border-transparent px-4 py-3 text-sm text-slate-600 transition hover:border-[color:var(--emerald)]/10 hover:bg-[color:var(--ivory)] hover:text-[var(--forest)]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <button
            aria-label="Toggle navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--emerald)]/10 text-[var(--forest)] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div className="border-t border-[color:var(--emerald)]/10 bg-white px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <div key={item.href}>
                  <Link className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-[color:var(--ivory)]" href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <div className="ml-3 mt-2 border-l border-[color:var(--emerald)]/10 pl-3">
                      {item.children.map((child) => (
                        <Link key={child.href} className="block rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-[var(--forest)]" href={child.href} onClick={() => setOpen(false)}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
