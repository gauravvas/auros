'use client';

import React from 'react';
import { Counterparty, Settlement, TreasuryTransaction } from '@/lib/types';

interface TreasuryPanelProps {
  counterparties: Counterparty[];
  settlements: Settlement[];
  transactions: TreasuryTransaction[];
}

export function TreasuryPanel({
  counterparties,
  settlements,
  transactions,
}: TreasuryPanelProps): JSX.Element {
  const formatNumber = (num: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'Low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'High':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-auros-blue/20 text-auros-ice border-auros-blue/30';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Settled':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Transit':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-auros-blue/20 text-auros-ice border-auros-blue/30';
    }
  };

  const pendingSettlements = settlements.filter((s) => s.status !== 'Settled').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Active Counterparties</p>
          <p className="text-2xl font-bold text-white">{counterparties.length}</p>
          <p className="text-xs text-green-400 mt-2">All Low Risk</p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Pending Settlements</p>
          <p className="text-2xl font-bold text-yellow-400">{pendingSettlements}</p>
          <p className="text-xs text-auros-muted mt-2">{settlements.length} total</p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Recent Transactions</p>
          <p className="text-2xl font-bold text-auros-ice">{transactions.length}</p>
          <p className="text-xs text-auros-muted mt-2">7-day window</p>
        </div>
      </div>

      {/* Counterparties */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Counterparty Exposure</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Counterparty
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Risk Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Allocations
                </th>
              </tr>
            </thead>
            <tbody>
              {counterparties.map((cp) => (
                <tr
                  key={cp.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap font-semibold text-white">
                    {cp.name}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-auros-muted text-sm">
                    {cp.type}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getRiskColor(cp.riskRating)}`}>
                      {cp.riskRating}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="flex gap-1 flex-wrap">
                      {cp.allocations.map((alloc) => (
                        <span
                          key={alloc}
                          className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold"
                        >
                          {alloc}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settlement Queue */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Settlement Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Asset
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Counterparty
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Expected
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((settlement) => (
                <tr
                  key={settlement.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold">
                      {settlement.asset}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white font-semibold">
                    {formatNumber(settlement.quantity)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-white">{settlement.counterparty}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-auros-muted text-sm">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                    }).format(settlement.date)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-auros-muted text-sm">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                    }).format(settlement.expectedDate)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(settlement.status)}`}>
                      {settlement.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Treasury Transactions */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Treasury Transactions (7-day)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Asset
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-white">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                    }).format(tx.date)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold border ${
                        tx.type === 'Inbound'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : tx.type === 'Outbound'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold">
                      {tx.asset}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white font-semibold">
                    {formatNumber(tx.quantity)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-auros-muted">
                    {tx.sourceCounterparty}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-auros-muted">
                    {tx.destinationCounterparty}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
