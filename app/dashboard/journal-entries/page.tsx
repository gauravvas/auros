'use client';

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { JEGenerator } from '@/components/JEGenerator';
import { journalEntries } from '@/lib/mock-data';

export default function JournalEntriesPage(): JSX.Element {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Journal Entry Generator"
        subtitle="Auto-generated ERP-ready JEs for NetSuite, SAP, Oracle, Workday"
        statusPills={[
          { label: 'Total JEs', status: 'info', value: journalEntries.length },
          { label: 'Ready to Push', status: 'warning', value: journalEntries.filter((je) => je.status === 'Ready to Push').length },
          { label: 'Pushed', status: 'success', value: journalEntries.filter((je) => je.status === 'Pushed').length },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <JEGenerator journalEntries={journalEntries} />
      </div>
    </div>
  );
}
