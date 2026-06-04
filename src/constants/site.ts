import type { NavItem } from '@/types/content';

export const siteConfig = {
  name: 'Al-Ghani Developers',
  legalName: 'Al Ghani Developers Pvt. Ltd.',
  description:
    'Premium real estate developer in Lahore offering residential and commercial projects with flexible payment plans.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://alghani.com.pk',
  phone: '042 111 116 117',
  phoneHref: 'tel:042111116117',
  email: 'Info@alghani.com.pk',
  emailHref: 'mailto:Info@alghani.com.pk',
  headOffice: '2KM Quaid-e-Azam Interchange, Lahore Ring Road, Lahore, Punjab',
  corporateOffice:
    '157B DHA Phase 8 Broadway Commercial, Broadway, Commercial Lahore, 54810, Pakistan',
  theme: {
    emerald: '#0d4230',
    forest: '#0f170d',
    gold: '#9c8f6c',
    ivory: '#f5f5f5',
    mint: '#dfeae4',
  },
  social: {
    facebook: 'https://www.facebook.com/alghanigardenofficial/',
    instagram: 'https://www.instagram.com/alghanigardenofficial/',
    linkedin: 'https://pk.linkedin.com/company/alghanigarden786',
  },
} as const;

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  {
    label: 'Projects',
    href: '/projects',
    children: [
      { label: 'Al Ghani Garden Phase 7', href: '/alghani' },
      { label: 'The East Block', href: '/the-east-block' },
      { label: 'Zavia Block', href: '/zavia-block' },
      { label: 'Awami Block', href: '/awami-block' },
      { label: 'Square Avenue', href: '/square-avenue' },
      { label: 'Kings Lane', href: '/kings-lane' },
      { label: 'Azmat Heights', href: '/azmat-heights' },
      { label: 'Al Ghani Phase III', href: '/al-ghani-phase-iii' },
      { label: 'Haider Block', href: '/haider-block' },
      { label: 'Maskan Block', href: '/maskan-block' },
      { label: 'Al Ghani Phase I & 2', href: '/al-ghani-phase-i' },
    ],
  },
  { label: 'Programs', href: '/programs' },
  { label: 'Green Living Initiative', href: '/green-living-initiative' },
  { label: 'Careers', href: '/career' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Balloting Result', href: '/balloting-result' },
];

export const homeStats = [
  { label: 'Acres of land', value: 700, suffix: '+' },
  { label: 'Properties delivered and offered', value: 12000, suffix: '+' },
  { label: 'Primary customer support', value: 24, suffix: '/7' },
  { label: 'Head office proximity to interchange', value: 2, suffix: 'KM' },
];
