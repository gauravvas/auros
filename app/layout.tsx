import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AUROS - Enterprise Digital Asset Accounting Intelligence',
  description: 'Unified platform for digital asset accounting, tax reporting, and compliance',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="bg-auros-navy text-white">{children}</body>
    </html>
  );
}
