import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SITE_TITLE } from '@/constants';
import { RootProvider } from '@/provider/RootProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
