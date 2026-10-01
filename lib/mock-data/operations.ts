export const workspaceKpis = {
  total: 2150,
  active: 2050,
  graceOrRestricted: 28,
  failedProvisioning24h: 2,
  multiProductAdoptionPct: 68,
  criticalExceptions: 3,
};

export const workspaceFunnel = [
  { label: "Trial", value: 180, color: "var(--chart-1)" },
  { label: "Active", value: 1870, color: "var(--chart-2)" },
  { label: "At risk", value: 56, color: "var(--chart-3)" },
  { label: "Churned", value: 44, color: "var(--chart-4)" },
];

export const workspaceRows = [
  { id: "ws-zenith-09", name: "Zenith Retail Solutions", plan: "Business", status: "At Limit", health: "critical" as const, lastActivity: "12m ago" },
  { id: "ws-aarav-33", name: "Aarav Logistics LLP", plan: "Pro", status: "Warning", health: "warning" as const, lastActivity: "5m ago" },
  { id: "ws-nexus-71", name: "Nexus Health Informatics", plan: "Pro", status: "At Limit", health: "critical" as const, lastActivity: "3m ago" },
  { id: "ws-finscale-12", name: "FinScale Technologies", plan: "Business", status: "Warning", health: "warning" as const, lastActivity: "8m ago" },
  { id: "ws-gtd-44", name: "Global Trade Dynamics", plan: "Enterprise", status: "At Limit", health: "critical" as const, lastActivity: "1m ago" },
];

export const subscriptionKpis = {
  active: 1980,
  grace: 72,
  restricted: 28,
  planMix: [
    { plan: "Free", count: 420 },
    { plan: "Pro", count: 810 },
    { plan: "Business", count: 640 },
    { plan: "Enterprise", count: 280 },
  ],
};

export const subscriptionStatusDonut = [
  { label: "Free", value: 420, color: "var(--chart-1)" },
  { label: "Pro", value: 810, color: "var(--chart-2)" },
  { label: "Business", value: 640, color: "var(--chart-3)" },
  { label: "Enterprise", value: 280, color: "var(--chart-5)" },
  { label: "Grace", value: 72, color: "var(--chart-3)" },
  { label: "Restricted", value: 28, color: "var(--status-critical-fg)" },
];

export const doraScorecard = [
  { label: "Deployment frequency", value: "4.1/day", band: "Elite" as const },
  { label: "Lead time for changes", value: "36 min", band: "Elite" as const },
  { label: "Change failure rate", value: "7%", band: "High" as const },
  { label: "MTTR", value: "1h 12m", band: "High" as const },
];

export const releaseErrorRates = [
  { label: "Chat w/ Sahayogi v3.1.2", before: 0.12, after: 0.18 },
  { label: "BoSS v4.0.2", before: 0.03, after: 0.02 },
  { label: "Sahayogi AI v2.4.0", before: 0.10, after: 0.07 },
];

export const rolloutTimeline = [
  { id: "rel-1", product: "AI Assistant V2 (65%)", pctRolledOut: 65, status: "in-progress" as const },
  { id: "rel-2", product: "BoSS General Ledger (GA)", pctRolledOut: 100, status: "complete" as const },
  { id: "rel-3", product: "Tally Direct Sync (Paused)", pctRolledOut: 50, status: "rollback" as const },
  { id: "rel-4", product: "Multi-Agent Routing (Canary)", pctRolledOut: 30, status: "in-progress" as const },
];

export const productHealthGrid = [
  { id: "sahayogi-one", name: "Sahayogi One", status: "healthy" as const, uptime30d: 99.99, errorRatePct: 0.01 },
  { id: "chat-sahayogi", name: "Chat with Sahayogi", status: "warning" as const, uptime30d: 97.4, errorRatePct: 0.18 },
  { id: "my-sahayogi", name: "My Sahayogi", status: "healthy" as const, uptime30d: 99.94, errorRatePct: 0.06 },
  { id: "tax-sahayogi", name: "Tax Sahayogi", status: "healthy" as const, uptime30d: 99.88, errorRatePct: 0.06 },
  { id: "boss", name: "BoSS", status: "healthy" as const, uptime30d: 99.92, errorRatePct: 0.01 },
  { id: "office-sahayogi", name: "Office Sahayogi", status: "healthy" as const, uptime30d: 99.95, errorRatePct: 0.02 },
  { id: "investor-sahayogi", name: "Investor Sahayogi", status: "healthy" as const, uptime30d: 99.96, errorRatePct: 0.02 },
  { id: "sahayogi-cloud", name: "Sahayogi Cloud", status: "healthy" as const, uptime30d: 99.98, errorRatePct: 0.01 },
  { id: "studio-sahayogi", name: "Studio Sahayogi", status: "healthy" as const, uptime30d: 99.95, errorRatePct: 0.07 },
];

export const incidentsBySeverity = [
  { label: "Critical", value: 0, color: "var(--status-critical-fg)" },
  { label: "High", value: 1, color: "var(--chart-3)" },
  { label: "Medium", value: 2, color: "var(--chart-1)" },
  { label: "Low", value: 1, color: "var(--status-neutral-fg)" },
];

export const incidentRows = [
  { id: "INC-910", title: "AI Gateway latency spike (P99 > 1800ms) — Chat with Sahayogi", severity: "high" as const, commander: "SRE Team", workspaces: 14, status: "Investigating", timeOpen: "28m" },
  { id: "INC-899", title: "Govt GST portal sandbox endpoint maintenance — Tax Sahayogi", severity: "medium" as const, commander: "Compliance Eng", workspaces: 3, status: "Monitoring", timeOpen: "4h" },
  { id: "INC-842", title: "Intermittent Redis cache eviction spike — Sahayogi Cloud", severity: "low" as const, commander: "Infra Team", workspaces: 1, status: "Resolved", timeOpen: "2d" },
];
