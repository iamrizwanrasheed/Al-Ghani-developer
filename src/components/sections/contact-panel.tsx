import { Mail, MapPinned, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/constants/site';

export function ContactPanel() {
  return (
    <section className="px-4 py-16 lg:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--emerald)]">Contact us</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)]">Speak with the Al-Ghani team</h2>
            </div>
            <div className="space-y-4 text-sm leading-7 text-slate-600">
              <a className="flex items-start gap-3 rounded-2xl bg-[color:var(--ivory)] p-4" href={siteConfig.phoneHref}><Phone className="mt-1 h-4 w-4 text-[var(--emerald)]" />{siteConfig.phone}</a>
              <a className="flex items-start gap-3 rounded-2xl bg-[color:var(--ivory)] p-4" href={siteConfig.emailHref}><Mail className="mt-1 h-4 w-4 text-[var(--emerald)]" />{siteConfig.email}</a>
              <div className="flex items-start gap-3 rounded-2xl bg-[color:var(--ivory)] p-4"><MapPinned className="mt-1 h-4 w-4 text-[var(--emerald)]" /><div><div><strong>Head Office:</strong> {siteConfig.headOffice}</div><div className="mt-2"><strong>Corporate Office:</strong> {siteConfig.corporateOffice}</div></div></div>
            </div>
          </div>
        </Card>
        <Card className="p-8">
          <form className="grid gap-4 md:grid-cols-2">
            <Input aria-label="Full name" placeholder="Full name" />
            <Input aria-label="Phone number" placeholder="Phone number" />
            <Input aria-label="Email address" className="md:col-span-2" placeholder="Email address" type="email" />
            <Input aria-label="Interested project" className="md:col-span-2" placeholder="Interested project" />
            <Textarea aria-label="Message" className="md:col-span-2" placeholder="How can we help you?" />
            <div className="md:col-span-2">
              <Button size="lg" type="submit">Send Inquiry</Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
