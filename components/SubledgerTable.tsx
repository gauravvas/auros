'use client';

import React, { useState } from 'react';
import { SubledgerEntry } from '@/lib/types';

interface SubledgerTableProps {
  entries: SubledgerEntry[];
}

export function SubledgerTable({ entries }: SubledgerTableProps): JSX.Element {
  const [filter, setFilter] = useState<string>('All');

  const filteredEntries =
    filter === 'All' ? entries : entries.filter((e) => e.type === filter);

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatNumber = (num: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const types = ['All', 'Purchase', 'Sale', 'Transfer', 'Staking', 'Fee', 'Reward'];

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === type
                ? 'bg-auros-gold text-auros-navy'
                : 'bg-auros-navy-light border border-auros-blue/20 text-auros-muted hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
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
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Cost Basis
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Market Value
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Unrealized P&L
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  GL Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-white">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }).format(entry.date)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold">
                      {entry.asset}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-white text-sm">{entry.type}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                    {formatNumber(entry.quantity)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                    {formatCurrency(entry.costBasis)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                    {formatCurrency(entry.marketValue)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right">
                    <span
                      className={`font-semibold ${
                        entry.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {formatCurrency(entry.unrealizedPnL)}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-auros-muted text-xs">
                    {entry.glAccount}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold border ${
                        entry.status === 'Posted'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredEntries.length === 0 && (
          <div className="px-6 py-12 text-center text-auros-muted">
            No subledger entries found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
