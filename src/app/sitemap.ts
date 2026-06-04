import type { MetadataRoute } from 'next';

import { getAllRecords } from '@/services/content';
import { absoluteUrl } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRecords().map((record) => ({
    url: absoluteUrl(record.pathname),
    lastModified: record.lastModified,
    changeFrequency: record.type === 'blog-post' ? 'monthly' : 'weekly',
    priority: record.pathname === '/' ? 1 : record.type === 'project' ? 0.9 : 0.7,
  }));
}
