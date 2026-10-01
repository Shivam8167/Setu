# 🚀 Setu v2 — Product Manager Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-22c55e?style=for-the-badge)](https://recharts.org/)
[![Status](https://img.shields.io/badge/Status-Active_Development-success?style=for-the-badge)]()

> **Setu v2 (Product Manager)** is a centralized observability, product lifecycle command center, and intelligence platform. Built for modern Product Managers, it unifies real-time system health, API consumption analytics, progressive feature-flag rollouts, release trains, and user adoption metrics into a sleek, high-performance workspace.

---

## 📑 Table of Contents

- [Overview & Vision](#-overview--vision)
- [Key Features](#-key-features)
  - [1. Executive Product Dashboard](#1-executive-product-dashboard)
  - [2. Products & Services Registry](#2-products--services-registry)
  - [3. Live System Health & Incident Matrix](#3-live-system-health--incident-matrix)
  - [4. API Usage & Quota Analytics](#4-api-usage--quota-analytics)
  - [5. Feature Flags & Progressive Rollouts](#5-feature-flags--progressive-rollouts)
  - [6. Release Trains & Deployment Environments](#6-release-trains--deployment-environments)
  - [7. Feature Catalog & User Adoption](#7-feature-catalog--user-adoption)
  - [8. Setu AI Copilot & Chat Assistant](#8-setu-ai-copilot--chat-assistant)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Directory Structure](#-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Routing & Page Architecture](#-routing--page-architecture)
- [Design System & Theming](#-design-system--theming)
- [Contributing & Code Standards](#-contributing--code-standards)
- [License](#-license)

---

## 🎯 Overview & Vision

In enterprise and scale-up software ecosystems, Product Managers often suffer from **fragmented operational telemetry**:
- Service uptime lives in DevOps monitoring tools (Datadog, Grafana, CloudWatch).
- Feature flags live in third-party gating portals (LaunchDarkly, Split).
- Deployment states live across CI/CD pipelines (GitHub Actions, ArgoCD, Jenkins).
- API consumption metrics live in billing portals or API gateways.

**Setu v2** breaks these operational silos. It acts as the single pane of glass connecting engineering reliability with business performance, enabling Product Managers to make data-driven decisions on product stability, feature rollouts, capacity planning, and customer adoption.

---

## ✨ Key Features

### 1. Executive Product Dashboard
- **Route:** `/dashboard` (Default root landing page)
- **What it does:** Provides a high-level operational pulse of the entire platform.
- **Key Metrics:** System Availability (99.98%), Active Production Incidents (0 Critical), Total API Traffic (38.4M requests/month), and Average Latency (142ms).
- **Widgets:** Dynamic greeting, live KPI cards with trend indicators, recent deployment highlights, and quick access to core digital products.

### 2. Products & Services Registry
- **Routes:** `/products`, `/products/[id]`, `/products/product-360`
- **What it does:** Complete catalog of all platform microservices, APIs, and digital offerings (e.g., UPI Switch, KYC Verification, FastTag Engine, Payment Gateway, Account Aggregator, BBPS, etc.).
- **Capabilities:**
  - Product status tags (`Live`, `Beta`, `Maintenance`, `Deprecating`).
  - Tier tracking, SLA compliance, versioning, and team ownership.
  - **Product 360 View:** Deep-dive into dependencies, SLA history, active feature flags, and historical release logs per product.

### 3. Live System Health & Incident Matrix
- **Route:** `/health`
- **What it does:** Transparent real-time operational health and incident telemetry.
- **Capabilities:**
  - Component status matrix across core infrastructure and microservices.
  - Severity tracking (`P1 - Critical`, `P2 - High`, `P3 - Moderate`, `P4 - Low`).
  - Mean Time to Acknowledge (MTTA) and Mean Time to Recovery (MTTR) analytics.
  - Incident mitigation timelines and post-mortem status badges.

### 4. API Usage & Quota Analytics
- **Routes:** `/usage`, `/usage/plans`, `/usage/feature-usage`
- **What it does:** Real-time visibility into customer consumption, API throughput, and quota headroom.
- **Capabilities:**
  - 30-day volume trend charting with peak request rate monitoring.
  - Quota utilization bars (Enterprise, Scale, Growth, and Starter tiers).
  - Feature-level API traffic breakdown to prevent unexpected rate-limiting and spot underutilized capabilities.

### 5. Feature Flags & Progressive Rollouts
- **Routes:** `/feature-flags`, `/feature-flags/[flagId]`, `/feature-flags/rollouts`
- **What it does:** Risk-free continuous delivery and progressive experimentation.
- **Capabilities:**
  - Instant global kill switches for rapid incident containment.
  - Targeted percentage rollouts (e.g., 5% Canary $\rightarrow$ 25% $\rightarrow$ 50% $\rightarrow$ 100% GA).
  - Audience targeting rules (internal employees, beta customers, enterprise tiers).
  - Detailed audit logs for every toggle change.

### 6. Release Trains & Deployment Environments
- **Routes:** `/releases`, `/releases/environments`
- **What it does:** Bridges the communication gap between release engineering and product delivery.
- **Capabilities:**
  - Scheduled release train visibility with build versions and release lead tracking.
  - Environment status breakdown across `Production`, `Staging`, `Canary`, and `Development`.
  - Deployment changelog summaries and roll-back history.

### 7. Feature Catalog & User Adoption
- **Routes:** `/features`, `/features/[featureId]`, `/features/adoption`
- **What it does:** Tracks post-launch feature discovery, user retention, and funnel conversion.
- **Capabilities:**
  - Feature adoption curves comparing active users against eligible cohorts.
  - Drop-off and conversion funnel stages.
  - Granular usage breakdowns by user tier and region.

### 8. Setu AI Copilot & Chat Assistant
- **Components:** `AIChatSidebar.tsx`, `AIConversationPanel.tsx`
- **What it does:** Context-aware generative AI assistant embedded in the application shell.
- **Capabilities:**
  - Ask natural language questions like: *"What caused the latency spike on UPI Switch yesterday?"* or *"Summarize the rollouts currently active in Staging."*
  - Instant generation of release notes and incident executive summaries.

---

## 🛠️ Tech Stack & Architecture

| Technology | Purpose | Notes |
|---|---|---|
| **[Next.js 16](https://nextjs.org/)** | Web Framework | App Router, Server-side rendering, Fast Refresh |
| **[React 19](https://react.dev/)** | UI Library | Modern hooks, functional components, transitions |
| **[TypeScript 5](https://www.typescriptlang.org/)** | Type Safety | Strict typing across props, API schemas, and mock data |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Styling | Modern utility-first CSS engine with CSS variables |
| **[Recharts](https://recharts.org/)** | Data Visualization | Responsive area trends, bar charts, donuts, and gauges |
| **[Lucide React](https://lucide.dev/)** | Icons | Consistent, lightweight vector icons |
| **[Turbopack](https://turbo.build/)** | Build Engine | High-speed local dev bundling and compilation |

---

## 📁 Directory Structure

The repository is organized following clean Next.js App Router conventions:

```
setu-v2/
├── app/                               # Next.js App Router root
│   ├── dashboard/                     # Executive PM dashboard
│   │   └── page.tsx
│   ├── products/                      # Products & Services Registry
│   │   ├── [id]/page.tsx              # Product detail & SLA view
│   │   ├── product-360/page.tsx       # Comprehensive 360 overview
│   │   └── page.tsx                   # Product catalog list
│   ├── health/                        # System Health & Incidents
│   │   └── page.tsx
│   ├── usage/                         # API Usage & Capacity
│   │   ├── feature-usage/page.tsx     # Granular endpoint consumption
│   │   ├── plans/page.tsx             # Tier & quota allocation
│   │   └── page.tsx                   # Main usage metrics
│   ├── feature-flags/                 # Progressive Rollouts & Gating
│   │   ├── [flagId]/page.tsx          # Flag configuration & targeting
│   │   ├── rollouts/page.tsx          # Canary rollout progress
│   │   └── page.tsx                   # Feature flags directory
│   ├── releases/                      # Release Trains & CI/CD
│   │   ├── environments/page.tsx      # Prod, Staging, Canary status
│   │   └── page.tsx                   # Release pipeline view
│   ├── features/                      # Feature Telemetry & Adoption
│   │   ├── [featureId]/page.tsx       # Feature telemetry & conversion
│   │   ├── adoption/page.tsx          # User adoption curves
│   │   └── page.tsx                   # Feature discovery list
│   ├── globals.css                    # CSS Design Tokens & Theme Variables
│   ├── layout.tsx                     # Root App Shell wrapper
│   └── page.tsx                       # Root redirect (points to /dashboard)
│
├── components/                        # Reusable React components
│   ├── shared/                        # Core UI components
│   │   ├── charts/                    # Recharts visualization wrappers
│   │   │   ├── AdoptionBarList.tsx
│   │   │   ├── AnalyticsBarChart.tsx
│   │   │   ├── AreaTrendChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── DonutChart.tsx
│   │   │   ├── Funnel.tsx
│   │   │   ├── Gauge.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── RolloutProgressBar.tsx
│   │   │   ├── ToggleChart.tsx
│   │   │   └── UsageAllowanceBar.tsx
│   │   ├── CalendarCard.tsx
│   │   ├── Card.tsx                   # Surface card with theme tokens
│   │   ├── DataTable.tsx              # Searchable, filterable table
│   │   ├── EmptyState.tsx             # Zero-data fallback display
│   │   ├── GreetingCard.tsx           # Contextual user welcome
│   │   ├── KPITile.tsx                # Metric stat card with badges
│   │   ├── StatTile.tsx
│   │   ├── StatusBadge.tsx            # Dynamic status indicator pill
│   │   ├── TabBar.tsx                 # Segmented tab controls
│   │   └── TableToolbar.tsx           # Search input and filter toolbar
│   └── shell/                         # Application chrome & layout
│       ├── assistant/                 # Integrated Setu AI Copilot
│       │   ├── AIChatSidebar.tsx
│       │   ├── AIConversationPanel.tsx
│       │   ├── AssistantRegion.tsx
│       │   └── useAssistantChats.ts
│       ├── AppShell.tsx               # Main layout orchestrator
│       ├── AppsLauncher.tsx           # Quick navigation app drawer
│       ├── AssistantButton.tsx        # Trigger for AI Copilot
│       ├── Header.tsx                 # Top navigation, search & profile
│       ├── PageTransition.tsx         # Smooth route transition wrapper
│       ├── Sidebar.tsx                # Primary icon navigation rail
│       └── ThemeToggle.tsx            # Light/Dark mode switcher
│
├── docs/                              # Project design specs & guides
│   ├── Setu_V2_Detailed_Blueprint.docx
│   ├── Setu_V2_Team_Roles_and_Screen_Design_Guide.docx
│   └── figma-design-layout.md
│
├── lib/                               # Business logic & mock data
│   ├── mock-data/                     # Type-safe sample datasets
│   │   ├── apps-launcher.ts
│   │   ├── assistant-chats.ts
│   │   ├── products.ts
│   │   └── types.ts
│   ├── theme/                         # Theme context provider
│   │   └── ThemeProvider.tsx
│   ├── mockData.ts                    # Global mock telemetry
│   ├── personas.ts                    # Product Manager identity config
│   └── use-launcher-state.ts          # State hooks for app drawer
│
└── public/                            # Static assets, logos & icons
```

---

## 🚦 Getting Started

### Prerequisites

Make sure you have the following installed on your workstation:
- **Node.js**: `>= 18.17.0` or `>= 20.0.0`
- **npm**: `>= 9.0.0` (or `pnpm` / `yarn`)

### Installation

1. Navigate to the project directory:
   ```bash
   cd "setu v2(product manager)"
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local Next.js development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will automatically redirect from `/` to `/dashboard`.

### Production Build

To test or deploy the production build:

```bash
# Create optimized production build
npm run build

# Start the production server
npm run start
```

To run the ESLint code quality checks:
```bash
npm run lint
```

---

## 🗺️ Routing & Page Architecture

| Path | Description | Access Level |
|---|---|---|
| `/` | Automatic redirect to `/dashboard` | Public / Authenticated |
| `/dashboard` | Primary PM command center & KPI metrics | Product Manager |
| `/products` | Products & Microservices catalog registry | Product Manager |
| `/products/[id]` | Single product deep-dive & SLA history | Product Manager |
| `/products/product-360` | Comprehensive 360-degree product telemetry | Product Manager |
| `/health` | Live system health matrix & incident tracker | Product Manager |
| `/usage` | Overall API consumption & volume trends | Product Manager |
| `/usage/plans` | Tier quotas & customer entitlement allocation | Product Manager |
| `/usage/feature-usage` | Granular endpoint and feature traffic analytics | Product Manager |
| `/feature-flags` | Feature toggles, canary rules, and kill switches | Product Manager |
| `/feature-flags/[flagId]` | Flag targeting rules & rollout percentages | Product Manager |
| `/feature-flags/rollouts` | Live progressive canary rollout tracking | Product Manager |
| `/releases` | Deployment pipeline & release trains | Product Manager |
| `/releases/environments`| Infrastructure status by deployment stage | Product Manager |
| `/features` | Feature catalog & discovery tracking | Product Manager |
| `/features/[featureId]` | Feature conversion & funnel analysis | Product Manager |
| `/features/adoption` | Cumulative adoption trends & cohort curves | Product Manager |
| `/founder/*` | *Legacy Route Redirects* $\rightarrow$ Clean top-level URLs | Redirect 307 |

---

## 🎨 Design System & Theming

The application features a modern, adaptive design system configured in `app/globals.css` and managed by `lib/theme/ThemeProvider.tsx`.

### Theme Tokens
- **Semantic CSS Variables**: High-contrast, accessibility-checked colors tailored for both **Light** and **Dark** modes:
  - `--surface-canvas`: Root background
  - `--surface-card`: Raised card panels with subtle glassmorphism
  - `--text-heading` & `--text-body`: Crisp typography hierarchy
  - `--status-healthy-*`, `--status-warning-*`, `--status-critical-*`: Calibrated HSL status indicators that remain legible across themes.
- **Micro-Animations**: Smooth cubic-bezier transitions for card hovers, sidebar rail expansion, and modal reveals.
- **Responsive Layout**: Specially tuned for 1366px, 1440px, and 1920px viewports with collapsible sidebar navigation rails.

---

## 🤝 Contributing & Code Standards

- **Component Modularity**: Keep UI components isolated within `components/shared/` and shell elements within `components/shell/`.
- **Strict Typing**: All components, charts, and API responses must have strict TypeScript interfaces defined in `lib/mock-data/types.ts` or adjacent files.
- **Zero Raw Hex Hardcoding**: Always reference the CSS token variables (e.g. `var(--text-heading)`, `var(--surface-card)`) to maintain seamless theme switching.
- **Accessible Interactions**: Ensure buttons, dropdowns, and interactive tiles include appropriate `aria-label` attributes and keyboard navigation support.

---

## 📄 License

This project is proprietary software developed for the **Setu Platform**. All rights reserved.
