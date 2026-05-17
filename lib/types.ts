// Digital Asset Types
export interface DigitalAsset {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  value: number;
  unrealizedPnL: number;
  allocation: number;
}

// Trade Types
export type TradeStatus = 'Pending' | 'Confirmed' | 'Settled' | 'Failed';
export type TradeSide = 'Buy' | 'Sell';

export interface Trade {
  id: string;
  timestamp: Date;
  exchange: string;
  asset: string;
  side: TradeSide;
  quantity: number;
  price: number;
  total: number;
  status: TradeStatus;
  fee: number;
}

// Subledger Types
export type SubledgerType = 'Purchase' | 'Sale' | 'Transfer' | 'Staking' | 'Fee' | 'Reward';
export type SubledgerStatus = 'Posted' | 'Unposted';

export interface SubledgerEntry {
  id: string;
  date: Date;
  asset: string;
  type: SubledgerType;
  quantity: number;
  costBasis: number;
  marketValue: number;
  unrealizedPnL: number;
  glAccount: string;
  status: SubledgerStatus;
  counterparty?: string;
  txHash?: string;
}

// Tax Lot Types
export interface TaxLot {
  id: string;
  asset: string;
  acquiredDate: Date;
  quantity: number;
  costPerUnit: number;
  costBasis: number;
  marketPerUnit: number;
  marketValue: number;
  holdingPeriodDays: number;
  isLongTerm: boolean;
}

export interface DisposedLot {
  id: string;
  asset: string;
  disposedDate: Date;
  quantity: number;
  costBasis: number;
  proceeds: number;
  realizedGain: number;
  isLongTerm: boolean;
  method: 'HIFO' | 'FIFO' | 'LIFO' | 'SpecID';
}

// Journal Entry Types
export type JEStatus = 'Draft' | 'Ready to Push' | 'Pushed' | 'Failed';
export type ERPFormat = 'NetSuite' | 'SAP' | 'Oracle' | 'Workday';

export interface JELineItem {
  lineId: string;
  account: string;
  accountName: string;
  debit: number;
  credit: number;
  description: string;
}

export interface JournalEntry {
  id: string;
  date: Date;
  reference: string;
  description: string;
  totalDebit: number;
  totalCredit: number;
  lineItems: JELineItem[];
  status: JEStatus;
  erpFormat?: ERPFormat;
  pushedAt?: Date;
}

// Treasury Types
export interface Counterparty {
  id: string;
  name: string;
  type: 'Custodian' | 'Exchange' | 'Counterparty';
  riskRating: 'Low' | 'Medium' | 'High';
  allocations: string[];
}

export interface Settlement {
  id: string;
  date: Date;
  asset: string;
  quantity: number;
  counterparty: string;
  status: 'Pending' | 'In Transit' | 'Settled' | 'Failed';
  expectedDate: Date;
}

export interface TreasuryTransaction {
  id: string;
  date: Date;
  type: 'Inbound' | 'Outbound' | 'Internal Transfer';
  asset: string;
  quantity: number;
  sourceCounterparty: string;
  destinationCounterparty: string;
  status: 'Pending' | 'Settled';
}

// Reconciliation Types
export interface ReconAssetBalance {
  asset: string;
  bookBalance: number;
  exchangeBalance: number;
  blockchainBalance: number;
  bookMatched: boolean;
  exchangeMatched: boolean;
  blockchainMatched: boolean;
}

export interface ReconBreak {
  id: string;
  date: Date;
  asset: string;
  difference: number;
  source: 'Book vs Exchange' | 'Book vs Blockchain' | 'Exchange vs Blockchain';
  status: 'Open' | 'Resolved' | 'Investigating';
  investigator?: string;
}

export interface ReconHistoryPoint {
  date: Date;
  percentageMatched: number;
  brokenAssets: number;
}

// Security & Guardrails Types
export interface Guardrail {
  id: string;
  name: string;
  description: string;
  threshold: number;
  currentValue: number;
  status: 'Pass' | 'Warning' | 'Breach';
  severity: 'Info' | 'Warning' | 'Critical';
}

export interface SODControl {
  id: string;
  controlName: string;
  authority: string;
  action: string;
  status: 'Compliant' | 'Exception' | 'Violation';
  lastTestDate: Date;
}

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  user: string;
  module: string;
  action: string;
  details: string;
  ipAddress: string;
  status: 'Success' | 'Failure';
}

// KPI Card Types
export interface KpiCard {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendPercent?: number;
  icon?: string;
}

// Form & Filter Types
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface FilterOptions {
  dateRange?: DateRange;
  asset?: string;
  status?: string;
  type?: string;
  counterparty?: string;
}
