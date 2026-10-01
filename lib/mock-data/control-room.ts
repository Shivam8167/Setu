import type { AreaTile, RiskRow, StatusLevel } from "./types";

export type KpiSnapshot = {
  productsHealthy: { healthy: number; active: number; status: StatusLevel };
  waitingForApproval: { count: number; status: StatusLevel };
  openIncidents: { count: number; status: StatusLevel };
  platformCostTrend: { pctChange: number; status: StatusLevel };
};

export function generateKpiSnapshot(): KpiSnapshot {
  return {
    productsHealthy: { healthy: 7, active: 8, status: "warning" },
    waitingForApproval: { count: 4, status: "warning" },
    openIncidents: { count: 2, status: "warning" },
    platformCostTrend: { pctChange: 6.2, status: "healthy" },
  };
}

export const needsYourDecision = [
  {
    id: "dec-1",
    type: "Rollout expansion",
    title: "Approve AI Assistant V2 expansion from 65% to 85%",
    requester: "Product & AI Platform Team",
    impact: "High — affects 878 Pro/Business/Enterprise workspaces",
    owner: "Dhruv Singla (Founder)",
    deadline: "2026-09-30",
    severity: "high" as const,
  },
  {
    id: "dec-2",
    type: "Rollout decision",
    title: "Approve or hold Tally & BUSY Direct Cloud Sync re-expansion",
    requester: "BoSS Financial Core Team",
    impact: "Critical — paused at 50%; safety gate tripped (P99: 3400ms)",
    owner: "Dhruv Singla (Founder)",
    deadline: "2026-09-28",
    severity: "critical" as const,
  },
  {
    id: "dec-3",
    type: "Risk acceptance",
    title: "Accept quota breach risk: Global Trade Dynamics AI token overage",
    requester: "Ops escalation",
    impact: "Critical — 9.62M / 10M LLM tokens consumed (96.2%)",
    owner: "Dhruv Singla (Founder)",
    deadline: "2026-09-27",
    severity: "critical" as const,
  },
  {
    id: "dec-4",
    type: "Workspace action",
    title: "Write-block Nexus Health Informatics — cloud storage at 94.2%",
    requester: "Customer Ops",
    impact: "Medium — 1 Pro workspace approaching storage limit",
    owner: "Dhruv Singla (Founder)",
    deadline: "2026-09-26",
    severity: "medium" as const,
  },
];

export const areasAtGlance: AreaTile[] = [
  { id: "platform", label: "Platform", status: "healthy", cause: "8/9 products fully operational", href: "/founder/operations" },
  { id: "customers", label: "Customers", status: "healthy", cause: "2,150 active workspaces, +16.8% MoM", href: "/founder/operations" },
  { id: "commercial", label: "Commercial", status: "warning", cause: "8 workspaces exceeding 80% quota limits", href: "/founder/operations" },
  { id: "operations", label: "Operations", status: "warning", cause: "INC-910 — AI gateway latency degradation", href: "/founder/operations" },
  { id: "security", label: "Security", status: "healthy", cause: "No critical security findings open", href: "/founder/compliance-risk" },
  { id: "compliance", label: "Compliance", status: "healthy", cause: "ISO 27001: 94%, DPDP Act: 88% effective", href: "/founder/compliance-risk" },
  { id: "releases", label: "Releases", status: "warning", cause: "Tally Sync paused at 50%; AI V2 at 65% rollout", href: "/founder/operations" },
  { id: "cost", label: "Cost", status: "healthy", cause: "MTD ₹29,200 — +6.2% vs last month", href: "/founder/cost-analytics" },
  { id: "dependencies", label: "Dependencies", status: "warning", cause: "OpenAI Gateway degraded (INC-910 linked)", href: "/founder/compliance-risk" },
];

export const topRisks: RiskRow[] = [
  { id: "r1", label: "OpenAI Model Gateway single point of failure for Chat with Sahayogi AI", owner: "SRE Team", likelihood: 4, impact: 5, treatmentStatus: "Investigating", dueDate: "2026-09-27" },
  { id: "r2", label: "Tally Direct Sync — desktop socket timeout causing P99 latency breach", owner: "BoSS Core Team", likelihood: 3, impact: 4, treatmentStatus: "Hotfix deployed", dueDate: "2026-09-28" },
  { id: "r3", label: "Global Trade Dynamics LLM token quota at 96.2% — overage billing risk", owner: "Dhruv Singla", likelihood: 5, impact: 4, treatmentStatus: "Approval pending", dueDate: "2026-09-27" },
];

export const controlsEffectiveByFramework = [
  { label: "ISO 27001", value: 94, effective: 144, total: 153, color: "var(--chart-2)" },
  { label: "DPDP Act", value: 88, effective: 70, total: 80, color: "var(--chart-1)" },
  { label: "GDPR (Exports)", value: 91, effective: 41, total: 45, color: "var(--chart-5)" },
];

const GROWTH_STATS_BY_RANGE: Record<7 | 30 | 90, { label: string; value: string }[]> = {
  7: [
    { label: "Trial → paid rate", value: "34%" },
    { label: "Multi-product adoption", value: "61%" },
    { label: "Avg feature adoption", value: "85.6%" },
  ],
  30: [
    { label: "Trial → paid rate", value: "38%" },
    { label: "Multi-product adoption", value: "68%" },
    { label: "Avg feature adoption", value: "85.6%" },
  ],
  90: [
    { label: "Trial → paid rate", value: "44%" },
    { label: "Multi-product adoption", value: "72%" },
    { label: "Avg feature adoption", value: "85.6%" },
  ],
};

export function getGrowthStats(rangeDays: 7 | 30 | 90) {
  return GROWTH_STATS_BY_RANGE[rangeDays];
}

// Adoption trend data from Sahayogi Setu Product Manager
// Monthly adoption for 6 months: Apr–Sep 2026
const MONTHLY_ADOPTION = [
  { label: "Apr", overall: 58, aiPlatform: 42, cloud: 72, studio: 18 },
  { label: "May", overall: 64, aiPlatform: 51, cloud: 78, studio: 22 },
  { label: "Jun", overall: 69, aiPlatform: 59, cloud: 84, studio: 27 },
  { label: "Jul", overall: 73, aiPlatform: 66, cloud: 88, studio: 31 },
  { label: "Aug", overall: 76, aiPlatform: 71, cloud: 90, studio: 35 },
  { label: "Sep", overall: 85, aiPlatform: 91, cloud: 94, studio: 38 },
];

function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GROWTH_WINDOW_DAYS = 90;

function buildDailySeries(seed: number, dailyChance: number) {
  const random = mulberry32(seed);
  return Array.from({ length: GROWTH_WINDOW_DAYS }, () => (random() < dailyChance ? 1 : 0));
}

const NEW_CUSTOMERS_DAILY = buildDailySeries(42, 0.62);
const TRIAL_TO_PAID_DAILY = buildDailySeries(1337, 0.44);

export type GrowthRangeDays = 7 | 30 | 90;
export type GrowthTrendPoint = { label: string; newCustomers: number; trialToPaid: number };

export function buildGrowthTrend(rangeDays: GrowthRangeDays = 30, referenceDate: Date = new Date()): GrowthTrendPoint[] {
  const customerSlice = NEW_CUSTOMERS_DAILY.slice(GROWTH_WINDOW_DAYS - rangeDays);
  const trialSlice = TRIAL_TO_PAID_DAILY.slice(GROWTH_WINDOW_DAYS - rangeDays);

  let cumCustomers = 0;
  let cumTrial = 0;
  return customerSlice.map((customerDelta, i) => {
    cumCustomers += customerDelta;
    cumTrial += trialSlice[i];
    const date = new Date(referenceDate);
    date.setDate(date.getDate() - (rangeDays - 1 - i));
    return {
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      newCustomers: cumCustomers,
      trialToPaid: cumTrial,
    };
  });
}

export const growthTrend = buildGrowthTrend(30);
export const newCustomersTotal = growthTrend[growthTrend.length - 1]?.newCustomers ?? 0;
