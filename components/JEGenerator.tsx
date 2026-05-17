'use client';

import React, { useState } from 'react';
import { JournalEntry, ERPFormat } from '@/lib/types';
import { erpTemplates } from '@/lib/mock-data';

interface JEGeneratorProps {
  journalEntries: JournalEntry[];
}

export function JEGenerator({ journalEntries }: JEGeneratorProps): JSX.Element {
  const [selectedFormat, setSelectedFormat] = useState<ERPFormat>('NetSuite');
  const [selectedJE, setSelectedJE] = useState<JournalEntry | null>(journalEntries[0] || null);

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Pushed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Ready to Push':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-auros-blue/20 text-auros-ice border-auros-blue/30';
    }
  };

  const previewCode =
    selectedJE && selectedJE.erpFormat
      ? erpTemplates[selectedJE.erpFormat](selectedJE)
      : selectedFormat && selectedJE
      ? erpTemplates[selectedFormat](selectedJE)
      : '';

  const readyToPushCount = journalEntries.filter((je) => je.status === 'Ready to Push').length;
  const totalPushed = journalEntries.filter((je) => je.status === 'Pushed').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Total Journal Entries</p>
          <p className="text-2xl font-bold text-white">{journalEntries.length}</p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Ready to Push</p>
          <p className="text-2xl font-bold text-auros-ice">{readyToPushCount}</p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Already Pushed</p>
          <p className="text-2xl font-bold text-green-400">{totalPushed}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">ERP Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as ERPFormat)}
              className="w-full bg-auros-navy border border-auros-blue/30 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-auros-gold transition-colors"
            >
              <option value="NetSuite">NetSuite</option>
              <option value="SAP">SAP</option>
              <option value="Oracle">Oracle Fusion</option>
              <option value="Workday">Workday</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Select JE</label>
            <select
              value={selectedJE?.id || ''}
              onChange={(e) => {
                const je = journalEntries.find((j) => j.id === e.target.value);
                setSelectedJE(je || null);
              }}
              className="w-full bg-auros-navy border border-auros-blue/30 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-auros-gold transition-colors"
            >
              {journalEntries.map((je) => (
                <option key={je.id} value={je.id}>
                  {je.id} - {je.description}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="w-full bg-auros-gold hover:bg-yellow-500 text-auros-navy font-semibold py-2 rounded-lg transition-colors">
          Push All to ERP ({readyToPushCount})
        </button>
      </div>

      {/* JE Queue Table */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Journal Entry Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-auros-muted uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  ERP Format
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-auros-muted uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {journalEntries.map((je) => (
                <tr
                  key={je.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap font-semibold text-white">{je.id}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-white">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }).format(je.date)}
                  </td>
                  <td className="px-6 py-3 text-white max-w-xs truncate">{je.description}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-white font-semibold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(je.totalDebit)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    {je.erpFormat ? (
                      <span className="px-2 py-1 bg-auros-blue/20 text-auros-ice rounded text-xs font-semibold">
                        {je.erpFormat}
                      </span>
                    ) : (
                      <span className="text-auros-muted text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(je.status)}`}>
                      {je.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-center">
                    {je.status === 'Ready to Push' && (
                      <button className="px-3 py-1 bg-auros-gold/20 text-auros-gold hover:bg-auros-gold/30 rounded text-xs font-semibold transition-colors">
                        Push
                      </button>
                    )}
                    {je.status === 'Pushed' && (
                      <span className="text-green-400 text-xs">✓ Pushed</span>
                    )}
                    {je.status === 'Draft' && (
                      <span className="text-auros-muted text-xs">Draft</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview */}
      {selectedJE && (
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-auros-blue/20 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">ERP Format Preview</h3>
            <span className="text-xs text-auros-muted">{selectedFormat}</span>
          </div>
          <div className="p-6 bg-auros-navy overflow-x-auto">
            <pre className="text-auros-ice text-xs font-mono whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
              <code>{previewCode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* JE Details */}
      {selectedJE && (
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-auros-blue/20">
            <h3 className="text-lg font-semibold text-white">JE Details - {selectedJE.id}</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-auros-muted text-xs mb-1">Date</p>
                <p className="text-white font-semibold">
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(selectedJE.date)}
                </p>
              </div>
              <div>
                <p className="text-auros-muted text-xs mb-1">Reference</p>
                <p className="text-white font-semibold">{selectedJE.reference}</p>
              </div>
              <div>
                <p className="text-auros-muted text-xs mb-1">Total Debit</p>
                <p className="text-green-400 font-semibold">{formatCurrency(selectedJE.totalDebit)}</p>
              </div>
              <div>
                <p className="text-auros-muted text-xs mb-1">Total Credit</p>
                <p className="text-red-400 font-semibold">{formatCurrency(selectedJE.totalCredit)}</p>
              </div>
            </div>
            <div className="border-t border-auros-blue/20 pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">Line Items</h4>
              <div className="space-y-2">
                {selectedJE.lineItems.map((item) => (
                  <div
                    key={item.lineId}
                    className="flex items-center justify-between p-3 bg-auros-navy rounded border border-auros-blue/20"
                  >
                    <div>
                      <p className="text-white font-semibold">{item.accountName}</p>
                      <p className="text-xs text-auros-muted">{item.account} - {item.description}</p>
                    </div>
                    <div className="text-right">
                      {item.debit > 0 && (
                        <p className="text-green-400 font-semibold">{formatCurrency(item.debit)}</p>
                      )}
                      {item.credit > 0 && (
                        <p className="text-red-400 font-semibold">{formatCurrency(item.credit)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
