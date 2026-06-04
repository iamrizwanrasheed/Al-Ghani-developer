import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import './globals.css';

import { SiteShell } from '@/components/layout/site-shell';
import { SchemaScript } from '@/components/shared/schema-script';
import { siteConfig } from '@/constants/site';
import { buildMetadata, buildOrganizationSchema } from '@/services/seo';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display-serif', display: 'swap' });

export const metadata: Metadata = {
  ...buildMetadata(),
  metadataBase: new URL(siteConfig.url),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteConfig.theme.emerald,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <SchemaScript data={buildOrganizationSchema()} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
