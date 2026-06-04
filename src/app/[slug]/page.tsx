import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogGrid } from '@/components/sections/blog-grid';
import { ContactPanel } from '@/components/sections/contact-panel';
import { ContentRenderer } from '@/components/sections/content-renderer';
import { CtaBanner } from '@/components/sections/cta-banner';
import { MediaGallery } from '@/components/sections/media-gallery';
import { PageHeader } from '@/components/sections/page-header';
import { ShowcaseGrid } from '@/components/sections/showcase-grid';
import { SchemaScript } from '@/components/shared/schema-script';
import { getBlogPosts, getBreadcrumbs, getProjects, getRecordBySlug, getRelatedBlogPosts, getRouteIndex } from '@/services/content';
import { buildArticleSchema, buildBreadcrumbSchema, buildMetadata, buildProductSchema } from '@/services/seo';

export async function generateStaticParams() {
  return getRouteIndex()
    .filter((record) => record.pathname !== '/')
    .map((record) => ({ slug: record.pathname.replace(/^\//, '') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const record = getRecordBySlug(slug);
  return buildMetadata(record);
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = getRecordBySlug(slug);

  if (!record) {
    notFound();
  }

  const breadcrumbs = getBreadcrumbs(record.pathname);
  const relatedProjects = getProjects().filter((item) => item.slug !== record.slug).slice(0, 3);
  const relatedPosts = getRelatedBlogPosts(record.slug, 3);

  return (
    <>
      <SchemaScript data={buildBreadcrumbSchema(breadcrumbs)} />
      {record.type === 'project' ? <SchemaScript data={buildProductSchema(record)} /> : null}
      {record.type === 'blog-post' ? <SchemaScript data={buildArticleSchema(record)} /> : null}

      <PageHeader
        eyebrow={record.type === 'project' ? 'Project' : record.type === 'blog-post' ? 'Blog' : 'Page'}
        title={record.pageTitle}
        description={record.excerpt || record.description || 'Preserved original Al-Ghani content in a redesigned premium experience.'}
        breadcrumbs={breadcrumbs}
      />

      {record.firstImage ? <MediaGallery images={record.imageUrls} title={record.pageTitle} /> : null}

      {record.pathname === '/blogs' ? (
        <BlogGrid items={getBlogPosts()} />
      ) : (
        <ContentRenderer html={record.contentHtml} />
      )}

      {record.pathname === '/projects' ? (
        <ShowcaseGrid
          items={getProjects()}
          eyebrow="Portfolio"
          title="Browse all active Al-Ghani project pages"
          description="Each detail page below keeps the original business content, images, and page hierarchy while elevating the visual system and SEO foundation."
        />
      ) : null}

      {record.pathname === '/contact-us' ? <ContactPanel /> : null}

      {record.type === 'project' ? (
        <ShowcaseGrid
          items={relatedProjects}
          eyebrow="More developments"
          title="Related project pages"
          description="Continue through the Al-Ghani portfolio with the same premium browsing experience across every preserved destination."
        />
      ) : null}

      {record.type === 'blog-post' ? <BlogGrid items={relatedPosts} /> : null}

      {record.type !== 'blog-index' ? (
        <CtaBanner
          title="Need help reviewing this page"
          description="Use the preserved contact details, project pages, and office locations to continue your Al-Ghani journey with a faster, enterprise-grade front-end."
          href="/contact-us"
          action="Contact Al-Ghani"
        />
      ) : null}
    </>
  );
}
