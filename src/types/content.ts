export type ContentType = 'page' | 'project' | 'blog-index' | 'blog-post';

export interface SiteRecord {
  slug: string;
  url: string;
  pathname: string;
  pageTitle: string;
  seoTitle: string;
  description: string;
  contentHtml: string;
  excerpt: string;
  firstImage: string | null;
  imageUrls: string[];
  headings: string[];
  type: ContentType;
  lastModified: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SiteMapRecord {
  title: string;
  pathname: string;
  type: ContentType;
  lastModified: string;
}
