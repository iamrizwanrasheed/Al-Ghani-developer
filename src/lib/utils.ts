import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(pathname: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alghani.com.pk';
  return new URL(pathname, baseUrl).toString();
}

export function formatTitle(title: string) {
  return title.includes('Al-Ghani') ? title : `${title} | Al-Ghani Developers`;
}

export function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  return Intl.DateTimeFormat('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function extractNumbers(input: string) {
  const matches = input.match(/\d[\d,.]*/g) ?? [];
  return matches.map((item) => Number(item.replace(/,/g, ''))).filter(Boolean);
}
