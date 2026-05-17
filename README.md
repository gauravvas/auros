# AUROS - Enterprise Digital Asset Accounting Intelligence

A production-quality Next.js 14 + TypeScript SaaS platform for unified digital asset accounting, tax reporting, and compliance.

## Overview

AUROS replaces Bitwave (subledger) + Lukka (gain/loss) with one unified platform. It provides 8 integrated modules:

1. **Dashboard** - Executive overview and KPIs
2. **Trade Connect** - Direct WebSocket API to exchanges (real-time trade feeds)
3. **Subledger** - Transaction-level accounting for digital assets
4. **Gain/Loss Engine** - HIFO/FIFO/LIFO/Spec ID tax lot tracking
5. **Journal Entry Generator** - Auto-generated ERP-ready JEs (NetSuite, SAP, Oracle, Workday)
6. **Treasury** - Counterparty exposure, settlement queue, custody allocation
7. **Reconciliation** - Three-way book vs exchange vs blockchain matching
8. **Security & Guardrails** - SOD controls, audit trail, compliance

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui patterns
- **Data**: Mock data (no external API dependencies)

## Color Theme

- Primary Navy: `#0D1B2A`
- Navy Light: `#132033`
- Accent Gold: `#F59E0B`
- Blue: `#2563EB`
- Ice: `#CADCFC`
- Muted Text: `#94A3B8`

## Project Structure

```
auros/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Redirects to dashboard
│   ├── globals.css             # Global styles
│   └── dashboard/
│       ├── layout.tsx          # Dashboard layout with sidebar
│       ├── page.tsx            # Main dashboard
│       └── [module]/page.tsx   # Module pages
├── components/
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── TopBar.tsx              # Page header with status pills
│   ├── KpiCard.tsx             # KPI stat card component
│   ├── AssetPositionCard.tsx   # Asset position display
│   ├── TradeFeed.tsx           # Trade activity table
│   ├── SubledgerTable.tsx      # Subledger entries table
│   ├── GainLossEngine.tsx      # Tax lot management
│   ├── JEGenerator.tsx         # Journal entry management
│   ├── TreasuryPanel.tsx       # Counterparty & settlement management
│   ├── ReconEngine.tsx         # Three-way reconciliation
│   └── SecurityPanel.tsx       # Guardrails & audit trail
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   └── mock-data.ts            # Comprehensive mock data
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ (18.17 or later)
- npm or yarn package manager

### Installation

```bash
cd auros
npm install
```

### Development

```bash
npm run dev
```

Navigate to `http://localhost:3000` to see the application.

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

## Key Features

### Dashboard
- Executive KPI cards with trend indicators
- Real-time asset position overview
- Live trade activity feed
- System status indicators

### Trade Connect
- Real-time trade execution tracking
- Multi-exchange support (Coinbase Pro, Kraken, Binance, Gemini)
- Trade filtering by exchange and asset
- Volume and settlement tracking

### Subledger
- Transaction-level accounting records
- Support for 6 transaction types (Purchase, Sale, Transfer, Staking, Fee, Reward)
- Posted vs Unposted entry tracking
- GL account mapping

### Gain/Loss Engine
- Configurable tax lot methods (HIFO, FIFO, LIFO, Spec ID)
- Short-term vs Long-term capital gains tracking
- Per-asset P&L breakdown
- Open and disposed lot management

### Journal Entry Generator
- Auto-generated ERP-ready entries
- 4 ERP format support (NetSuite XML, SAP IDoc, Oracle JSON, Workday CSV)
- Live format preview
- Batch push capability

### Treasury
- Counterparty risk rating
- Settlement queue management
- Transaction history tracking
- Custody allocation visibility

### Reconciliation
- Three-way matching (Book vs Exchange vs Blockchain)
- Break investigation panel
- 7-day trend analysis
- Automated balance verification

### Security
- Operational guardrails with threshold monitoring
- Segregation of Duties (SOD) controls
- Complete audit trail
- Access logging with IP tracking

## Mock Data

All data is pre-populated with realistic examples:

- **5 Digital Assets**: BTC (1240.5), ETH (28400), SOL (185000), USDC (18.2M), USDT (2.29M)
- **10+ Trades**: Real-world trading patterns across multiple exchanges
- **12+ Subledger Entries**: Complete transaction history with GL mapping
- **10 Tax Lots**: Open positions with cost basis and market values
- **5 Disposed Lots**: Historical sales with realized gains/losses
- **7 Journal Entries**: Multi-line entries with ERP format support
- **4 Counterparties**: Coinbase Prime, Fireblocks, BitGo, Anchorage
- **7 Settlements**: In-flight and settled transactions
- **6 Treasury Transactions**: Inbound, outbound, and internal transfers
- **5 Reconciliation Assets**: With full three-way matching details
- **6 Guardrails**: Operational controls with status monitoring
- **6 SOD Controls**: Compliance and segregation of duties
- **8 Audit Log Entries**: Complete user activity trail

## Component Documentation

### KpiCard
Displays a statistic with optional trend indicator and icon.

```tsx
<KpiCard
  label="Total Portfolio"
  value={formatCurrency(247400000)}
  trend="up"
  trendPercent={3.2}
/>
```

### AssetPositionCard
Shows a single asset position with allocation bar and P&L.

```tsx
<AssetPositionCard asset={btcAsset} />
```

### TradeFeed
Displays a filtered table of trades with status badges.

```tsx
<TradeFeed trades={trades} limit={8} />
```

## API Integration (Future)

Currently, all data is mocked. To integrate with real APIs:

1. Create API client functions in `lib/api.ts`
2. Replace mock data imports with API calls
3. Add error handling and loading states
4. Implement real-time WebSocket connections for Trade Connect

## Styling

The application uses Tailwind CSS with a custom color palette. Key utility classes:

- `text-auros-navy` / `bg-auros-navy` - Primary background
- `text-auros-gold` - Accent text
- `border-auros-blue/20` - Subtle borders
- `hover:border-auros-gold/50` - Interactive states

## Production Deployment

### Build Optimization
- Automatic code splitting
- Image optimization
- Font optimization
- TypeScript strict mode

### Environment Variables
Create a `.env.local` file for production secrets:

```
NEXT_PUBLIC_API_URL=https://api.auros.example.com
API_SECRET_KEY=your-secret-key
```

### Deployment to Vercel

```bash
npm install -g vercel
vercel
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next ./.next
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance

- Optimized React components with memoization
- Efficient table rendering with virtual scrolling (ready to add)
- Tailwind CSS purging for minimal bundle size
- Next.js built-in code splitting

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

Proprietary - AUROS

## Support

For issues or questions, contact the AUROS team.
