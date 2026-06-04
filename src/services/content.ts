import siteContent from '@/constants/site-content.json';
import siteMap from '@/constants/site-map.json';
import type { SiteMapRecord, SiteRecord } from '@/types/content';

const records = siteContent as SiteRecord[];
const mapRecords = (siteMap.records || []) as SiteMapRecord[];

export function getAllRecords() {
  return records;
}

export function getRouteIndex() {
  return mapRecords;
}

export function getHomeRecord() {
  return records.find((record) => record.pathname === '/') ?? null;
}

export function getRecordBySlug(slug: string) {
  const pathname = slug === 'home' ? '/' : `/${slug}`;
  return records.find((record) => record.pathname === pathname) ?? null;
}

export function getRecordByPathname(pathname: string) {
  return records.find((record) => record.pathname === pathname) ?? null;
}

export function getProjects() {
  return records.filter((record) => record.type === 'project');
}

export function getBlogPosts() {
  return records.filter((record) => record.type === 'blog-post');
}

export function getPrimaryPages() {
  return records.filter((record) => record.type === 'page' || record.type === 'blog-index');
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  return getBlogPosts().filter((post) => post.slug !== slug).slice(0, limit);
}

export function getFeaturedProjects(limit = 6) {
  return getProjects().slice(0, limit);
}

export function getBreadcrumbs(pathname: string) {
  const record = getRecordByPathname(pathname);
  const crumbs = [{ label: 'Home', href: '/' }];
  if (!record || pathname === '/') return crumbs;

  if (record.type === 'blog-post') {
    crumbs.push({ label: 'Blogs', href: '/blogs' });
  } else if (record.type === 'project') {
    crumbs.push({ label: 'Projects', href: '/projects' });
  }

  crumbs.push({ label: record.pageTitle, href: record.pathname });
  return crumbs;
}
