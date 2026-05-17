'use client';

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { ReconEngine } from '@/components/ReconEngine';
import { reconAssetBalances, reconBreaks, reconHistory } from '@/lib/mock-data';

export default function ReconciliationPage(): JSX.Element {
  const openBreaks = reconBreaks.filter((b) => b.status === 'Open' || b.status === 'Investigating');

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Reconciliation"
        subtitle="Three-Way: Book vs Exchange vs Blockchain"
        statusPills={[
          { label: 'Recon %', status: 'success', value: '92%' },
          { label: 'Open Breaks', status: 'warning', value: openBreaks.length },
          { label: 'Assets', status: 'info', value: reconAssetBalances.length },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <ReconEngine balances={reconAssetBalances} breaks={reconBreaks} history={reconHistory} />
      </div>
    </div>
  );
}
