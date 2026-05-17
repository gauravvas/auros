'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { TradeFeed } from '@/components/TradeFeed';
import { KpiCard } from '@/components/KpiCard';
import { trades, digitalAssets } from '@/lib/mock-data';

export default function TradeConnectPage(): JSX.Element {
  const [filter, setFilter] = useState<string>('All');

  const exchanges = Array.from(new Set(trades.map((t) => t.exchange)));
  const assets = Array.from(new Set(trades.map((t) => t.asset)));

  const filteredTrades =
    filter === 'All'
      ? trades
      : filter.startsWith('Ex:')
      ? trades.filter((t) => t.exchange === filter.replace('Ex:', ''))
      : trades.filter((t) => t.asset === filter);

  const totalVolume = trades.reduce((sum, t) => sum + t.total, 0);
  const pendingTrades = trades.filter((t) => t.status === 'Pending').length;
  const settledTrades = trades.filter((t) => t.status === 'Settled').length;

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
        title="Trade Connect"
        subtitle="Direct WebSocket API to Exchanges"
        statusPills={[
          { label: 'Status', status: 'success', value: 'Live' },
          { label: 'Pending', status: 'warning', value: pendingTrades },
          { label: 'Settled', status: 'success', value: settledTrades },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total Volume (7d)"
            value={formatCurrency(totalVolume)}
            trend="up"
            trendPercent={12.5}
          />
          <KpiCard label="Active Exchanges" value={exchanges.length} unit="connected" />
          <KpiCard label="Total Trades" value={trades.length} unit="all-time" />
          <KpiCard label="Pending Trades" value={pendingTrades} unit="in-flight" />
        </div>

        {/* Connected Exchanges */}
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Connected Exchanges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exchanges.map((exchange) => {
              const exchangeTrades = trades.filter((t) => t.exchange === exchange);
              const volume = exchangeTrades.reduce((sum, t) => sum + t.total, 0);
              return (
                <div
                  key={exchange}
                  className="border border-auros-blue/20 rounded-lg p-4 hover:border-auros-gold/50 transition-colors"
                >
                  <p className="text-white font-semibold mb-3">{exchange}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-auros-muted">Trades:</span>
                      <span className="text-white">{exchangeTrades.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-auros-muted">Volume:</span>
                      <span className="text-auros-gold">{formatCurrency(volume)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-auros-muted">Status:</span>
                      <span className="text-green-400">✓ Connected</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Filter by Exchange</h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('All')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filter === 'All'
                    ? 'bg-auros-gold text-auros-navy'
                    : 'bg-auros-navy-light border border-auros-blue/20 text-auros-muted hover:text-white'
                }`}
              >
                All
              </button>
              {exchanges.map((exchange) => (
                <button
                  key={exchange}
                  onClick={() => setFilter(`Ex:${exchange}`)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    filter === `Ex:${exchange}`
                      ? 'bg-auros-gold text-auros-navy'
                      : 'bg-auros-navy-light border border-auros-blue/20 text-auros-muted hover:text-white'
                  }`}
                >
                  {exchange}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Filter by Asset</h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('All')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filter === 'All'
                    ? 'bg-auros-gold text-auros-navy'
                    : 'bg-auros-navy-light border border-auros-blue/20 text-auros-muted hover:text-white'
                }`}
              >
                All
              </button>
              {assets.map((asset) => (
                <button
                  key={asset}
                  onClick={() => setFilter(asset)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    filter === asset
                      ? 'bg-auros-gold text-auros-navy'
                      : 'bg-auros-navy-light border border-auros-blue/20 text-auros-muted hover:text-white'
                  }`}
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trade Feed */}
        <TradeFeed trades={filteredTrades} />
      </div>
    </div>
  );
}
