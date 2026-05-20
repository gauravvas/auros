import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AUROS - Enterprise Digital Asset Accounting Intelligence',
  description: 'Enterprise digital asset accounting platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
