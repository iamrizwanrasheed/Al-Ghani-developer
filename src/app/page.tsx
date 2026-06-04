import Link from 'next/link';

import { HeroSection } from '@/components/sections/hero-section';
import { StatBand } from '@/components/sections/stat-band';
import { ShowcaseGrid } from '@/components/sections/showcase-grid';
import { CtaBanner } from '@/components/sections/cta-banner';
import { BlogGrid } from '@/components/sections/blog-grid';
import { ContactPanel } from '@/components/sections/contact-panel';
import { SchemaScript } from '@/components/shared/schema-script';
import { Card } from '@/components/ui/card';
import { homeStats } from '@/constants/site';
import { getBlogPosts, getFeaturedProjects, getHomeRecord, getRecordByPathname } from '@/services/content';
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '@/services/seo';

export default function HomePage() {
  const home = getHomeRecord();
  const about = getRecordByPathname('/about-us');
  const programs = getRecordByPathname('/programs');
  const projects = getFeaturedProjects(6);
  const posts = getBlogPosts().slice(0, 3);

  if (!home) return null;

  return (
    <>
      <SchemaScript data={buildLocalBusinessSchema()} />
      <SchemaScript data={buildBreadcrumbSchema([{ label: 'Home', href: '/' }])} />
      <HeroSection
        eyebrow="Affordable housing society in Lahore"
        title="AL GHANI DEVELOPERS"
        description={home.excerpt}
        image={home.firstImage}
        primaryAction={{ label: 'Explore Projects', href: '/projects' }}
        secondaryAction={{ label: 'Contact Us', href: '/contact-us' }}
      />
      <StatBand items={homeStats} />
      <ShowcaseGrid
        items={projects}
        eyebrow="Projects"
        title="A premium, modern portfolio built around trust"
        description="Every listed destination below preserves the original Al-Ghani project content while upgrading the browsing experience with a premium enterprise presentation."
      />
      <section className="px-4 py-6 lg:px-6 lg:py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <Card className="p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--emerald)]">Who we are</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--forest)]">{about?.pageTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{about?.excerpt}</p>
            <Link href="/about-us" className="mt-6 inline-flex text-sm font-semibold text-[var(--emerald)]">Learn more about Al-Ghani</Link>
          </Card>
          <Card className="p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--emerald)]">Programs</p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--forest)]">{programs?.pageTitle}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{programs?.excerpt}</p>
            <Link href="/programs" className="mt-6 inline-flex text-sm font-semibold text-[var(--emerald)]">Review current programs</Link>
          </Card>
        </div>
      </section>
      <BlogGrid items={posts} />
      <ContactPanel />
      <CtaBanner
        title="Ready to review a project, location, or payment plan"
        description="Browse the original project pages, compare developments, and connect with the Al-Ghani team through a modernized 2026-ready front-end architecture."
        href="/projects"
        action="View all projects"
      />
    </>
  );
}
