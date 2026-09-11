import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Storefront Engine — Live Multi-Store Preview & Editor',
  description: 'Interactive preview and real-time content editor for unified storefront templates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
