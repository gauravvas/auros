import React from 'react';
import { Sidebar } from '@/components/Sidebar';

export const metadata = {
  title: 'Dashboard - AUROS',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex h-screen bg-auros-navy">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
