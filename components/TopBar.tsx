'use client';

import React from 'react';

interface StatusPill {
  label: string;
  status: 'success' | 'warning' | 'error' | 'info';
  value?: string | number;
}

interface TopBarProps {
  title: string;
  subtitle?: string;
  statusPills?: StatusPill[];
}

export function TopBar({ title, subtitle, statusPills = [] }: TopBarProps): JSX.Element {
  return (
    <div className="bg-auros-navy-light border-b border-auros-blue/20">
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
          {subtitle && <p className="text-sm text-auros-muted">{subtitle}</p>}
        </div>
        {statusPills.length > 0 && (
          <div className="flex items-center gap-3">
            {statusPills.map((pill, idx) => (
              <StatusPill key={idx} pill={pill} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ pill }: { pill: StatusPill }): JSX.Element {
  const statusColors = {
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-auros-blue/20 text-auros-ice border-auros-blue/30',
  };

  const statusIcon = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className={`px-3 py-2 rounded-full border text-xs font-semibold flex items-center gap-2 ${statusColors[pill.status]}`}>
      <span>{statusIcon[pill.status]}</span>
      <span>{pill.label}</span>
      {pill.value !== undefined && <span className="opacity-75">{pill.value}</span>}
    </div>
  );
}
