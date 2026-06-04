import type { Metadata } from 'next';

import { siteConfig } from '@/constants/site';
import type { SiteRecord } from '@/types/content';
import { absoluteUrl, formatTitle } from '@/lib/utils';

export function buildMetadata(record?: SiteRecord | null): Metadata {
  const title = formatTitle(record?.seoTitle || siteConfig.name);
  const description = record?.excerpt || record?.description || siteConfig.description;
  const url = absoluteUrl(record?.pathname || '/');
  const image = absoluteUrl(record?.firstImage || '/media/wp-content/uploads/2023/01/Square-Avenue.jpg');

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_PK',
      type: record?.type === 'blog-post' ? 'article' : 'website',
      images: [{ url: image, width: 1200, height: 630, alt: record?.pageTitle || siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ label: string; href: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl('/media/wp-content/uploads/2024/05/Al-Ghani-Developers.png'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
      streetAddress: siteConfig.headOffice,
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: siteConfig.legalName,
    image: absoluteUrl('/media/wp-content/uploads/2023/01/Square-Avenue.jpg'),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.headOffice,
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
  };
}

export function buildProductSchema(record: SiteRecord) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: record.pageTitle,
    description: record.excerpt || record.description,
    image: record.imageUrls.slice(0, 5).map((image) => absoluteUrl(image)),
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    url: absoluteUrl(record.pathname),
  };
}

export function buildArticleSchema(record: SiteRecord) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: record.pageTitle,
    description: record.excerpt || record.description,
    image: record.firstImage ? [absoluteUrl(record.firstImage)] : [],
    dateModified: record.lastModified,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/media/wp-content/uploads/2024/05/Al-Ghani-Developers.png'),
      },
    },
    mainEntityOfPage: absoluteUrl(record.pathname),
  };
}
