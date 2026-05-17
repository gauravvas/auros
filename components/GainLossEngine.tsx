'use client';

import React, { useState, useMemo } from 'react';
import { TaxLot, DisposedLot } from '@/lib/types';

interface GainLossEngineProps {
  taxLots: TaxLot[];
  disposedLots: DisposedLot[];
}

export function GainLossEngine({ taxLots, disposedLots }: GainLossEngineProps): JSX.Element {
  const [method, setMethod] = useState<'HIFO' | 'FIFO' | 'LIFO' | 'SpecID'>('HIFO');

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatNumber = (num: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  // Calculate totals
  const shortTermGain = useMemo(() => {
    return disposedLots
      .filter((lot) => !lot.isLongTerm)
      .reduce((sum, lot) => sum + lot.realizedGain, 0);
  }, [disposedLots]);

  const longTermGain = useMemo(() => {
    return disposedLots
      .filter((lot) => lot.isLongTerm)
      .reduce((sum, lot) => sum + lot.realizedGain, 0);
  }, [disposedLots]);

  const unrealizedGain = useMemo(() => {
    return taxLots.reduce((sum, lot) => sum + (lot.marketValue - lot.costBasis), 0);
  }, [taxLots]);

  // Group by asset
  const assetBreakdown = useMemo(() => {
    const assets = new Set([...taxLots.map((l) => l.asset), ...disposedLots.map((l) => l.asset)]);
    return Array.from(assets).map((asset) => {
      const asset_taxLots = taxLots.filter((l) => l.asset === asset);
      const asset_disposedLots = disposedLots.filter((l) => l.asset === asset);

      const unrealized = asset_taxLots.reduce(
        (sum, lot) => sum + (lot.marketValue - lot.costBasis),
        0
      );
      const realized = asset_disposedLots.reduce((sum, lot) => sum + lot.realizedGain, 0);
      const st = asset_disposedLots
        .filter((l) => !l.isLongTerm)
        .reduce((sum, lot) => sum + lot.realizedGain, 0);
      const lt = asset_disposedLots
        .filter((l) => l.isLongTerm)
        .reduce((sum, lot) => sum + lot.realizedGain, 0);

      return { asset, unrealized, realized, st, lt };
    });
  }, [taxLots, disposedLots]);

  return (
    <div className="space-y-6">
      {/* Method Selector */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
        <label className="block text-sm font-semibold text-white mb-3">Tax Lot Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as any)}
          className="bg-auros-navy border border-auros-blue/30 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-auros-gold transition-colors w-full max-w-xs"
        >
          <option value="HIFO">HIFO (Highest In First Out)</option>
          <option value="FIFO">FIFO (First In First Out)</option>
          <option value="LIFO">LIFO (Last In First Out)</option>
          <option value="SpecID">Specific Identification</option>
        </select>
        <p className="text-xs text-auros-muted mt-2">Current method: {method}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Short-Term Realized Gain</p>
          <p className="text-2xl font-bold text-green-400">{formatCurrency(shortTermGain)}</p>
          <p className="text-xs text-auros-muted mt-2">
            {disposedLots.filter((l) => !l.isLongTerm).length} lots
          </p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Long-Term Realized Gain</p>
          <p className="text-2xl font-bold text-green-400">{formatCurrency(longTermGain)}</p>
          <p className="text-xs text-auros-muted mt-2">
            {disposedLots.filter((l) => l.isLongTerm).length} lots
          </p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Unrealized Gain</p>
          <p className="text-2xl font-bold text-auros-gold">{formatCurrency(unrealizedGain)}</p>
          <p className="text-xs text-auros-muted mt-2">{taxLots.length} open lots</p>
        </div>
      </div>

      {/* Per-Asset Breakdown */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Per-Asset P&L</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Asset
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Unrealized
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  ST Realized
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  LT Realized
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {assetBreakdown.map((row) => (
                <tr
                  key={row.asset}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold">
                      {row.asset}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right">
                    <span
                      className={row.unrealized >= 0 ? 'text-green-400' : 'text-red-400'}
                    >
                      {formatCurrency(row.unrealized)}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right">
                    <span className={row.st >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {formatCurrency(row.st)}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right">
                    <span className={row.lt >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {formatCurrency(row.lt)}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right font-semibold">
                    <span
                      className={row.unrealized + row.realized >= 0 ? 'text-green-400' : 'text-red-400'}
                    >
                      {formatCurrency(row.unrealized + row.realized)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Open Tax Lots */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Open Tax Lots</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Acquired
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Cost
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Market Value
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Gain/Loss
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {taxLots.map((lot) => (
                <tr
                  key={lot.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold">
                      {lot.asset}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-white">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }).format(lot.acquiredDate)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                    {formatNumber(lot.quantity)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                    {formatCurrency(lot.costBasis)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                    {formatCurrency(lot.marketValue)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right">
                    <span
                      className={lot.marketValue - lot.costBasis >= 0 ? 'text-green-400' : 'text-red-400'}
                    >
                      {formatCurrency(lot.marketValue - lot.costBasis)}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold border ${
                        lot.isLongTerm
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}
                    >
                      {lot.isLongTerm ? 'LT' : 'ST'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disposed Lots */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Disposed Lots</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Disposed
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Cost Basis
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Proceeds
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Realized Gain
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Method
                </th>
              </tr>
            </thead>
            <tbody>
              {disposedLots.map((lot) => (
                <tr
                  key={lot.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 bg-auros-gold/10 text-auros-gold rounded text-xs font-semibold">
                      {lot.asset}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-white">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }).format(lot.disposedDate)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                    {formatCurrency(lot.costBasis)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white">
                    {formatCurrency(lot.proceeds)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right">
                    <span
                      className={lot.realizedGain >= 0 ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}
                    >
                      {formatCurrency(lot.realizedGain)}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold border ${
                        lot.isLongTerm
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}
                    >
                      {lot.isLongTerm ? 'LT' : 'ST'}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-xs text-auros-muted">
                    {lot.method}
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
