'use client';

import React from 'react';

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendPercent?: number;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function KpiCard({
  label,
  value,
  unit,
  trend,
  trendPercent,
  icon,
  size = 'md',
}: KpiCardProps): JSX.Element {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const valueSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const trendColor =
    trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-auros-muted';

  return (
    <div className={`${sizeClasses[size]} bg-auros-navy-light border border-auros-blue/20 rounded-lg`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`${labelSizeClasses[size]} text-auros-muted mb-2`}>{label}</p>
          <div className="flex items-baseline gap-1">
            <p className={`${valueSizeClasses[size]} font-semibold text-white`}>{value}</p>
            {unit && <span className="text-auros-muted text-xs">{unit}</span>}
          </div>
          {trend && trendPercent !== undefined && (
            <p className={`text-xs ${trendColor} mt-2`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendPercent}%
            </p>
          )}
        </div>
        {icon && <div className="text-auros-gold">{icon}</div>}
      </div>
    </div>
  );
}
