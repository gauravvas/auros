'use client';

import React from 'react';
import { DigitalAsset } from '@/lib/types';

interface AssetPositionCardProps {
  asset: DigitalAsset;
}

export function AssetPositionCard({ asset }: AssetPositionCardProps): JSX.Element {
  const formatNumber = (num: number, decimals: number = 0): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const pnlPercent = asset.unrealizedPnL > 0 ?
    ((asset.unrealizedPnL / (asset.value - asset.unrealizedPnL)) * 100).toFixed(1) :
    ((asset.unrealizedPnL / (asset.value - asset.unrealizedPnL)) * 100).toFixed(1);

  return (
    <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-4 hover:border-auros-gold/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-auros-blue/20 rounded-lg flex items-center justify-center text-auros-gold font-bold">
            {asset.symbol.substring(0, 1)}
          </div>
          <div>
            <p className="font-semibold text-white">{asset.symbol}</p>
            <p className="text-xs text-auros-muted">{asset.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-auros-muted">{asset.allocation.toFixed(1)}%</p>
          <div className="w-16 h-2 bg-auros-navy rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-gold-gradient"
              style={{ width: `${asset.allocation}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-auros-muted">Quantity</span>
          <span className="text-white font-semibold">{formatNumber(asset.quantity, 2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-auros-muted">Price</span>
          <span className="text-white font-semibold">{formatCurrency(asset.price)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-auros-muted">Total Value</span>
          <span className="text-white font-semibold">{formatCurrency(asset.value)}</span>
        </div>
        <div className="border-t border-auros-blue/20 pt-3 flex justify-between text-sm">
          <span className="text-auros-muted">Unrealized P&L</span>
          <div className="text-right">
            <p
              className={`font-semibold ${asset.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {formatCurrency(asset.unrealizedPnL)}
            </p>
            <p
              className={`text-xs ${asset.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {asset.unrealizedPnL >= 0 ? '+' : ''}{pnlPercent}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
