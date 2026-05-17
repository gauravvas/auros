'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  badge?: string | number;
  icon: string;
  active?: boolean;
}

export function Sidebar(): JSX.Element {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊', active: pathname === '/dashboard' },
    {
      label: 'Trade Connect',
      href: '/dashboard/trade-connect',
      badge: 'Live',
      icon: '🔄',
      active: pathname === '/dashboard/trade-connect',
    },
    {
      label: 'Subledger',
      href: '/dashboard/subledger',
      icon: '📋',
      active: pathname === '/dashboard/subledger',
    },
    {
      label: 'Gain/Loss',
      href: '/dashboard/gain-loss',
      badge: 'HIFO',
      icon: '📈',
      active: pathname === '/dashboard/gain-loss',
    },
    {
      label: 'Journal Entries',
      href: '/dashboard/journal-entries',
      badge: '23',
      icon: '📄',
      active: pathname === '/dashboard/journal-entries',
    },
    {
      label: 'Treasury',
      href: '/dashboard/treasury',
      icon: '💼',
      active: pathname === '/dashboard/treasury',
    },
    {
      label: 'Reconciliation',
      href: '/dashboard/reconciliation',
      badge: '4 Breaks',
      icon: '✓',
      active: pathname === '/dashboard/reconciliation',
    },
    {
      label: 'Security',
      href: '/dashboard/security',
      badge: 'Pass',
      icon: '🔐',
      active: pathname === '/dashboard/security',
    },
  ];

  return (
    <aside className="w-64 bg-auros-navy border-r border-auros-blue/20 h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-auros-blue/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-gold-gradient rounded-lg flex items-center justify-center text-white font-bold text-sm">
            ⬡
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-auros-gold to-yellow-500 bg-clip-text text-transparent">
            AUROS
          </span>
        </div>
        <p className="text-xs text-auros-muted">Enterprise Digital Asset Accounting</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Overview Section */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-auros-muted uppercase tracking-widest mb-3">
            Overview
          </p>
          <div className="space-y-2">
            {navItems.slice(0, 1).map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>
        </div>

        {/* Core Platform Section */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-auros-muted uppercase tracking-widest mb-3">
            Core Platform
          </p>
          <div className="space-y-2">
            {navItems.slice(1, 4).map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>
        </div>

        {/* Finance Section */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-auros-muted uppercase tracking-widest mb-3">
            Finance
          </p>
          <div className="space-y-2">
            {navItems.slice(4, 6).map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>
        </div>

        {/* Governance Section */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-auros-muted uppercase tracking-widest mb-3">
            Governance
          </p>
          <div className="space-y-2">
            {navItems.slice(6).map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-auros-blue/20 text-xs text-auros-muted space-y-2">
        <div>
          <p className="font-semibold text-white">Environment</p>
          <p>Production</p>
        </div>
        <div>
          <p className="font-semibold text-white">Version</p>
          <p>v1.0.0</p>
        </div>
        <div>
          <p className="font-semibold text-white">User</p>
          <p className="truncate">alice.chen@company.com</p>
        </div>
      </div>
    </aside>
  );
}

interface NavLinkProps {
  item: NavItem;
}

function NavLink({ item }: NavLinkProps): JSX.Element {
  const baseClasses =
    'flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors';
  const activeClasses = item.active
    ? 'bg-auros-blue/20 text-auros-gold border border-auros-gold/50'
    : 'text-auros-muted hover:bg-auros-navy-light hover:text-white';

  return (
    <Link href={item.href} className={`${baseClasses} ${activeClasses} w-full`}>
      <span className="flex items-center gap-2">
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </span>
      {item.badge && (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            item.active
              ? 'bg-auros-gold/20 text-auros-gold'
              : 'bg-auros-blue/20 text-auros-ice'
          }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}
