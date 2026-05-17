'use client';

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { KpiCard } from '@/components/KpiCard';
import { AssetPositionCard } from '@/components/AssetPositionCard';
import { TradeFeed } from '@/components/TradeFeed';
import {
  digitalAssets,
  trades,
  subledgerEntries,
  journalEntries,
  reconBreaks,
} from '@/lib/mock-data';

export default function DashboardPage(): JSX.Element {
  const portfolioValue = digitalAssets.reduce((sum, asset) => sum + asset.value, 0);
  const unrealizedPnL = digitalAssets.reduce((sum, asset) => sum + asset.unrealizedPnL, 0);
  const realizedPnL = 12340000; // Mock value
  const pendingJEs = journalEntries.filter((je) => je.status !== 'Pushed').length;
  const postedSubledger = subledgerEntries.filter((e) => e.status === 'Posted').length;
  const reconPercent = 92;
  const tradeConnections = 3;

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Dashboard"
        subtitle="Enterprise Digital Asset Accounting Intelligence"
        statusPills={[
          { label: 'System Status', status: 'success', value: 'Operational' },
          { label: 'Pending JEs', status: 'info', value: pendingJEs },
          { label: 'Recon', status: 'success', value: `${reconPercent}%` },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Primary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total Portfolio Value"
            value={formatCurrency(portfolioValue)}
            unit="USD"
            trend="up"
            trendPercent={3.2}
          />
          <KpiCard
            label="Unrealized P&L"
            value={formatCurrency(unrealizedPnL)}
            unit="USD"
            trend="up"
            trendPercent={5.8}
          />
          <KpiCard
            label="Realized P&L"
            value={formatCurrency(realizedPnL)}
            unit="USD"
            trend="up"
            trendPercent={2.1}
          />
          <KpiCard
            label="Pending JEs"
            value={pendingJEs}
            unit="entries"
            trend="down"
            trendPercent={1.2}
          />
        </div>

        {/* Asset Positions */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Asset Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {digitalAssets.map((asset) => (
              <AssetPositionCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>

        {/* Live Trade Activity */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Live Trade Activity</h2>
          <TradeFeed trades={trades} limit={8} />
        </div>

        {/* Secondary KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Subledger Entries"
            value={postedSubledger}
            unit={`/ ${subledgerEntries.length}`}
            size="sm"
          />
          <KpiCard label="Recon Health" value={`${reconPercent}%`} unit="matched" size="sm" />
          <KpiCard label="Trade Connections" value={tradeConnections} unit="active" size="sm" />
          <KpiCard
            label="JEs Posted"
            value={journalEntries.filter((je) => je.status === 'Pushed').length}
            unit={`/ ${journalEntries.length}`}
            size="sm"
          />
        </div>

        {/* Open Breaks Alert */}
        {reconBreaks.filter((b) => b.status === 'Open' || b.status === 'Investigating').length >
          0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">
              ⚠ Open Reconciliation Breaks
            </h3>
            <p className="text-sm text-yellow-200 mb-4">
              {reconBreaks.filter((b) => b.status === 'Open' || b.status === 'Investigating')
                .length}{' '}
              open breaks require investigation.
            </p>
            <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors text-sm">
              View Breaks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
