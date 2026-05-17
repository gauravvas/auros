'use client';

import React from 'react';
import { TopBar } from '@/components/TopBar';
import { SecurityPanel } from '@/components/SecurityPanel';
import { guardrails, sodControls, auditLog } from '@/lib/mock-data';

export default function SecurityPage(): JSX.Element {
  const breaches = guardrails.filter((g) => g.status === 'Breach').length;
  const violations = sodControls.filter((c) => c.status === 'Violation').length;

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Security & Guardrails"
        subtitle="SOD Controls, Audit Trail, Compliance"
        statusPills={[
          { label: 'Status', status: 'success', value: 'Pass' },
          { label: 'Guardrails', status: 'success', value: `${guardrails.filter((g) => g.status === 'Pass').length}/${guardrails.length}` },
          { label: 'SOD Compliant', status: 'success', value: `${sodControls.filter((c) => c.status === 'Compliant').length}/${sodControls.length}` },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <SecurityPanel guardrails={guardrails} sodControls={sodControls} auditLog={auditLog} />
      </div>
    </div>
  );
}
