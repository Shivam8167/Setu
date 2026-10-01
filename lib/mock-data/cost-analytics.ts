export const costKpis = {
  mtdTotal: 29200,
  pctChangeVsLastMonth: 6.2,
};

export const costByProvider = [
  { label: "Infrastructure (AWS)", value: 12700, color: "var(--chart-1)" },
  { label: "AI Inference (OpenAI/Anthropic)", value: 8490, color: "var(--chart-5)" },
  { label: "WhatsApp Business API", value: 4760, color: "var(--chart-2)" },
  { label: "Storage (S3/Block)", value: 2400, color: "var(--chart-3)" },
  { label: "Messaging (Push/SMS)", value: 850, color: "var(--status-neutral-fg)" },
];

export const costAnomalies = [
  { id: "an-1", scope: "Product: Sahayogi AI", metric: "AI inference cost", pctSpike: 14, cause: "LLM token consumption +14.2% MoM — Global Trade Dynamics autoscale lane activated" },
  { id: "an-2", scope: "Product: Chat with Sahayogi", metric: "WhatsApp messaging cost", pctSpike: 12, cause: "Omnichannel broadcast campaign + AI gateway retry overhead from INC-910" },
];

export const usageVsPlanAllowance = [
  { label: "Investor Sahayogi", value: 82, color: "var(--chart-3)" },
  { label: "Chat w/ Sahayogi", value: 88, color: "var(--chart-3)" },
  { label: "BoSS", value: 79, color: "var(--chart-1)" },
  { label: "Office Sahayogi", value: 71, color: "var(--chart-4)" },
  { label: "Sahayogi One", value: 74, color: "var(--chart-2)" },
  { label: "Tax Sahayogi", value: 64, color: "var(--chart-5)" },
  { label: "Sahayogi Cloud", value: 58, color: "var(--chart-6)" },
  { label: "My Sahayogi", value: 45, color: "var(--status-info-fg)" },
  { label: "Studio Sahayogi", value: 38, color: "var(--status-neutral-fg)" },
];

export const productCostBreakdown = [
  { id: "investor-sahayogi", name: "Investor Sahayogi", total: 2680, infra: 1350, ai: 320, messaging: 410, storage: 600, variance: "+1.4%" },
  { id: "chat-sahayogi", name: "Chat with Sahayogi", total: 5860, infra: 1200, ai: 2450, messaging: 1980, storage: 230, variance: "+12.8%" },
  { id: "boss", name: "BoSS", total: 2750, infra: 1550, ai: 120, messaging: 280, storage: 800, variance: "+1.1%" },
  { id: "office-sahayogi", name: "Office Sahayogi", total: 1170, infra: 650, ai: 260, messaging: 60, storage: 200, variance: "+0.8%" },
  { id: "sahayogi-cloud", name: "Sahayogi Cloud", total: 3840, infra: 2100, ai: 420, messaging: 620, storage: 700, variance: "+3.2%" },
  { id: "tax-sahayogi", name: "Tax Sahayogi", total: 2420, infra: 1100, ai: 220, messaging: 100, storage: 1000, variance: "-0.8%" },
  { id: "sahayogi-one", name: "Sahayogi One", total: 2140, infra: 1200, ai: 120, messaging: 320, storage: 500, variance: "+1.8%" },
  { id: "studio-sahayogi", name: "Studio Sahayogi", total: 1920, infra: 1100, ai: 320, messaging: 180, storage: 320, variance: "-1.4%" },
  { id: "my-sahayogi", name: "My Sahayogi", total: 1650, infra: 900, ai: 380, messaging: 120, storage: 250, variance: "+2.4%" },
];
