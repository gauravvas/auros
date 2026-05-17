'use client';

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { SubledgerTable } from '@/components/SubledgerTable';
import { KpiCard } from '@/components/KpiCard';
import { subledgerEntries } from '@/lib/mock-data';

export default function SubledgerPage(): JSX.Element {
  const posted = subledgerEntries.filter((e) => e.status === 'Posted').length;
  const unposted = subledgerEntries.filter((e) => e.status === 'Unposted').length;
  const totalValue = subledgerEntries.reduce((sum, e) => sum + e.marketValue, 0);
  const totalCostBasis = subledgerEntries.reduce((sum, e) => sum + e.costBasis, 0);

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
        title="Subledger"
        subtitle="Digital Asset Transaction-Level Accounting"
        statusPills={[
          { label: 'Posted', status: 'success', value: posted },
          { label: 'Unposted', status: 'warning', value: unposted },
          { label: 'Total Entries', status: 'info', value: subledgerEntries.length },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Posted Entries" value={posted} unit={`/ ${subledgerEntries.length}`} />
          <KpiCard label="Total Market Value" value={formatCurrency(totalValue)} />
          <KpiCard label="Total Cost Basis" value={formatCurrency(totalCostBasis)} />
          <KpiCard
            label="Unrealized P&L"
            value={formatCurrency(totalValue - totalCostBasis)}
            trend="up"
            trendPercent={3.1}
          />
        </div>

        {/* Subledger Table */}
        <SubledgerTable entries={subledgerEntries} />

        {/* Information Panel */}
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Subledger Entry Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold text-white">Purchase</p>
              <p className="text-auros-muted text-xs mt-1">Asset acquisition</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-semibold text-white">Sale</p>
              <p className="text-auros-muted text-xs mt-1">Asset disposition</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-white">Transfer</p>
              <p className="text-auros-muted text-xs mt-1">Between accounts/custodians</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="font-semibold text-white">Staking</p>
              <p className="text-auros-muted text-xs mt-1">Staked position creation</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-semibold text-white">Fee</p>
              <p className="text-auros-muted text-xs mt-1">Network or exchange fees</p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="font-semibold text-white">Reward</p>
              <p className="text-auros-muted text-xs mt-1">Staking or interest income</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
