'use client';

import React from 'react';
import { Trade } from '@/lib/types';

interface TradeFeedProps {
  trades: Trade[];
  limit?: number;
}

export function TradeFeed({ trades, limit = 8 }: TradeFeedProps): JSX.Element {
  const displayedTrades = trades.slice(0, limit);

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatNumber = (num: number, decimals: number = 4): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Settled':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Confirmed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-auros-blue/20 text-auros-ice border-auros-blue/30';
    }
  };

  return (
    <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-auros-blue/20">
              <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                Exchange
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                Side
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedTrades.map((trade, idx) => (
              <tr
                key={trade.id}
                className={`border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors ${
                  idx === 0 ? 'bg-auros-navy/50' : ''
                }`}
              >
                <td className="px-6 py-3 whitespace-nowrap text-white">
                  {new Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  }).format(trade.timestamp)}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-white">{trade.exchange}</td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold">
                    {trade.asset}
                  </span>
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      trade.side === 'Buy'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {trade.side}
                  </span>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                  {formatNumber(trade.quantity)}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                  {formatCurrency(trade.price)}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right text-white font-semibold">
                  {formatCurrency(trade.total)}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(trade.status)}`}>
                    {trade.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
