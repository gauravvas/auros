'use client';

import React from 'react';
import { Guardrail, SODControl, AuditLogEntry } from '@/lib/types';

interface SecurityPanelProps {
  guardrails: Guardrail[];
  sodControls: SODControl[];
  auditLog: AuditLogEntry[];
}

export function SecurityPanel({
  guardrails,
  sodControls,
  auditLog,
}: SecurityPanelProps): JSX.Element {
  const formatNumber = (num: number, decimals: number = 0): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Pass':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Breach':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Compliant':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Exception':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Violation':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-auros-blue/20 text-auros-ice border-auros-blue/30';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'Critical':
        return 'border-red-500/50';
      case 'Warning':
        return 'border-yellow-500/50';
      case 'Info':
        return 'border-auros-blue/50';
      default:
        return 'border-auros-blue/20';
    }
  };

  const passCount = guardrails.filter((g) => g.status === 'Pass').length;
  const compliantCount = sodControls.filter((c) => c.status === 'Compliant').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Guardrails Status</p>
          <p className="text-2xl font-bold text-green-400">
            {passCount}/{guardrails.length} Pass
          </p>
          <p className="text-xs text-auros-muted mt-2">No breaches detected</p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">SOD Controls</p>
          <p className="text-2xl font-bold text-green-400">
            {compliantCount}/{sodControls.length} Compliant
          </p>
          <p className="text-xs text-auros-muted mt-2">No violations</p>
        </div>
        <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg p-6">
          <p className="text-auros-muted text-sm mb-2">Audit Trail</p>
          <p className="text-2xl font-bold text-white">{auditLog.length}</p>
          <p className="text-xs text-auros-muted mt-2">Recent entries</p>
        </div>
      </div>

      {/* Guardrails */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Operational Guardrails</h3>
        </div>
        <div className="space-y-3 p-6">
          {guardrails.map((guardrail) => (
            <div
              key={guardrail.id}
              className={`border rounded-lg p-4 ${getSeverityColor(guardrail.severity)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white">{guardrail.name}</h4>
                  <p className="text-sm text-auros-muted mt-1">{guardrail.description}</p>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-semibold border whitespace-nowrap ml-4 ${getStatusColor(guardrail.status)}`}>
                  {guardrail.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-auros-muted">Threshold: {formatNumber(guardrail.threshold)}</span>
                <span className="text-white font-semibold">Current: {formatNumber(guardrail.currentValue)}</span>
              </div>
              <div className="mt-2 bg-auros-navy rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${
                    guardrail.status === 'Pass'
                      ? 'bg-green-500'
                      : guardrail.status === 'Warning'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    width: `${Math.min((guardrail.currentValue / guardrail.threshold) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SOD Controls Matrix */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Segregation of Duties Controls</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Control Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Authority
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Last Tested
                </th>
              </tr>
            </thead>
            <tbody>
              {sodControls.map((control) => (
                <tr
                  key={control.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap font-semibold text-white">
                    {control.controlName}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-auros-muted text-sm">
                    {control.authority}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-white">
                    {control.action}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(control.status)}`}>
                      {control.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-auros-muted text-sm">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }).format(control.lastTestDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-auros-navy-light border border-auros-blue/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-auros-blue/20">
          <h3 className="text-lg font-semibold text-white">Audit Trail</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-auros-blue/20">
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-auros-muted uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-auros-blue/10 hover:bg-auros-navy/50 transition-colors"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-white text-xs">
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(entry.timestamp)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-auros-muted text-xs">
                    {entry.user}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 bg-auros-blue/20 text-auros-ice rounded text-xs font-semibold">
                      {entry.module}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-white">
                    {entry.action}
                  </td>
                  <td className="px-6 py-3 text-auros-muted text-xs max-w-xs truncate">
                    {entry.details}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-auros-muted text-xs font-mono">
                    {entry.ipAddress}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold border ${
                        entry.status === 'Success'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}
                    >
                      {entry.status}
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
