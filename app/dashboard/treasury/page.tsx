'use client';

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { TreasuryPanel } from '@/components/TreasuryPanel';
import { counterparties, settlements, treasuryTransactions } from '@/lib/mock-data';

export default function TreasuryPage(): JSX.Element {
  const pendingSettlements = settlements.filter((s) => s.status !== 'Settled').length;

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Treasury"
        subtitle="Counterparty Exposure, Settlement Queue, Custody Allocation"
        statusPills={[
          { label: 'Counterparties', status: 'success', value: counterparties.length },
          { label: 'Pending Settlements', status: 'warning', value: pendingSettlements },
          { label: 'Risk Rating', status: 'success', value: 'Low' },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <TreasuryPanel
          counterparties={counterparties}
          settlements={settlements}
          transactions={treasuryTransactions}
        />
      </div>
    </div>
  );
}
