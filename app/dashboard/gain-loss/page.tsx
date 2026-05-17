'use client';

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { GainLossEngine } from '@/components/GainLossEngine';
import { taxLots, disposedLots } from '@/lib/mock-data';

export default function GainLossPage(): JSX.Element {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Gain/Loss Engine"
        subtitle="HIFO/FIFO/LIFO/Spec ID Tax Lot Tracking"
        statusPills={[
          { label: 'Method', status: 'info', value: 'HIFO' },
          { label: 'Open Lots', status: 'info', value: taxLots.length },
          { label: 'Disposed Lots', status: 'success', value: disposedLots.length },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <GainLossEngine taxLots={taxLots} disposedLots={disposedLots} />
      </div>
    </div>
  );
}
