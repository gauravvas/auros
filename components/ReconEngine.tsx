'use client';

import React from 'react';
import { ReconAssetBalance, ReconBreak, ReconHistoryPoint } from '@/lib/types';

interface ReconEngineProps {
  balances: ReconAssetBalance[];
  breaks: ReconBreak[];
  history: ReconHistoryPoint[];
}

export function ReconEngine({ balances, breaks, history }: ReconEngineProps): JSX.Element {
  const formatNumber = (num: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const getBreakStatusColor = (status: string): string => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Open':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Investigating':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-auros-blue/20 text-auros-ice border-auros-blue/30';
    }
  };

  const openBreaks = breaks.filter((b) => b.status === 'Open' || b.status === 'Investigating');
  const reconPercentage =
    history.length > 0 ? history[history.length - 1].percentageMatched : 100;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Assets Reconciled</p>
          <p className="text-2xl font-bold text-white">{balances.length}</p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Recon Percentage</p>
          <p className="text-2xl font-bold text-green-400">{reconPercentage}%</p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Open Breaks</p>
          <p className="text-2xl font-bold text-red-400">{openBreaks.length}</p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Total Breaks</p>
          <p className="text-2xl font-bold text-yellow-400">{breaks.length}</p>
        </div>
      </div>

      {/* Three-Way Recon Table */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Three-Way Reconciliation</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Asset
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Book Balance
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-auros-muted uppercase">
                  vs Exchange
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Exchange Balance
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-auros-muted uppercase">
                  vs Blockchain
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Blockchain Balance
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-auros-muted uppercase">
                  Overall
                </th>
              </tr>
            </thead>
            <tbody>
              {balances.map((balance) => {
                const allMatched =
                  balance.bookMatched && balance.exchangeMatched && balance.blockchainMatched;
                return (
                  <tr
                    key={balance.asset}
                    className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                  >
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold">
                        {balance.asset}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-right text-white font-semibold">
                      {formatNumber(balance.bookBalance)}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-center">
                      <span
                        className={`text-lg ${balance.bookMatched ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {balance.bookMatched ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-right text-white font-semibold">
                      {formatNumber(balance.exchangeBalance)}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-center">
                      <span
                        className={`text-lg ${balance.blockchainMatched ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {balance.blockchainMatched ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-right text-white font-semibold">
                      {formatNumber(balance.blockchainBalance)}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-center">
                      <span
                        className={`text-lg font-bold ${allMatched ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {allMatched ? '✓' : '✗'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Break Investigation Panel */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Break Investigation</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Source
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Difference
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Investigator
                </th>
              </tr>
            </thead>
            <tbody>
              {breaks.map((breakRecord) => (
                <tr
                  key={breakRecord.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-white">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                    }).format(breakRecord.date)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold">
                      {breakRecord.asset}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-auros-muted">
                    {breakRecord.source}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right font-semibold">
                    <span className="text-red-400">{formatNumber(breakRecord.difference)}</span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getBreakStatusColor(breakRecord.status)}`}>
                      {breakRecord.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-auros-muted text-sm">
                    {breakRecord.investigator || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7-Day History */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">7-Day Reconciliation Trend</h3>
        </div>
        <div className="p-6 space-y-4">
          {history.map((point, idx) => {
            const prevPoint = idx > 0 ? history[idx - 1] : null;
            const trend =
              prevPoint === null
                ? 'neutral'
                : point.percentageMatched > prevPoint.percentageMatched
                ? 'up'
                : point.percentageMatched < prevPoint.percentageMatched
                ? 'down'
                : 'neutral';

            return (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-white">
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                      }).format(point.date)}
                    </span>
                    <span className="text-xs text-auros-muted">
                      {point.brokenAssets} broken assets
                    </span>
                  </div>
                  <div className="w-full bg-auros-navy rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400"
                      style={{ width: `${point.percentageMatched}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <span className="text-lg font-bold text-white">{point.percentageMatched}%</span>
                  {trend === 'up' && <span className="text-xs text-green-400 block">↑</span>}
                  {trend === 'down' && <span className="text-xs text-red-400 block">↓</span>}
                  {trend === 'neutral' && <span className="text-xs text-auros-muted block">→</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
