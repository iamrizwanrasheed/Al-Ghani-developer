import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

import { navigation, siteConfig } from '@/constants/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--forest)] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-6">
        <div className="space-y-5">
          <div className="relative h-14 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image src="/media/wp-content/uploads/2024/05/Al-Ghani-Developers.png" alt="Al-Ghani Developers logo" fill className="object-contain p-1.5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Al-Ghani Developers</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">
              Premium Lahore developments with modern infrastructure, flexible plans, and customer-first service.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-white/80">
            <a className="inline-flex items-start gap-3 hover:text-white" href={siteConfig.phoneHref}><Phone className="mt-0.5 h-4 w-4 text-[color:var(--gold)]" />{siteConfig.phone}</a>
            <a className="inline-flex items-start gap-3 hover:text-white" href={siteConfig.emailHref}><Mail className="mt-0.5 h-4 w-4 text-[color:var(--gold)]" />{siteConfig.email}</a>
            <div className="inline-flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[color:var(--gold)]" />{siteConfig.headOffice}</div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Navigation</h3>
          <div className="mt-5 grid gap-2">
            {navigation.slice(0, 8).map((item) => (
              <Link className="inline-flex items-center justify-between rounded-2xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white" href={item.href} key={item.href}>
                {item.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Office</h3>
          <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-white/70">
            <p><span className="font-semibold text-white">Head Office:</span> {siteConfig.headOffice}</p>
            <p className="mt-4"><span className="font-semibold text-white">Corporate Office:</span> {siteConfig.corporateOffice}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs tracking-[0.24em] text-white/50 uppercase lg:px-6">
        © Al Ghani Developers Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}
