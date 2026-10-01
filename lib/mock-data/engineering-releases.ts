import type { StatusLevel } from "./types";

export const releaseKpis = {
  activeRollouts: 4,
  changeFailureRate: { pct: 7, trendDirection: "down" as const, trendValue: "2%", status: "healthy" as StatusLevel },
  deploymentFailures: { count: 1, status: "warning" as StatusLevel },
  recurringExceptions: { count: 0, status: "healthy" as StatusLevel },
};

export type RolloutStatus = "active" | "paused" | "rolled-back" | "complete";

export type Release = {
  id: string;
  buildRef: string;
  initiator: string;
  pipelineRef: string;
  targetEnv: string;
  targetServices: string[];
  migrationChanges: string;
  rolloutStrategy: string;
  cohort: string;
  preDeployHealth: string;
  postDeployHealth: string;
  rolloutPercent: number;
  status: RolloutStatus;
  pauseRollbackDecision: string;
  rollbackEvidence: string;
  linkedIncident: string | null;
  rollbackEscalated: boolean;
};

export const releases: Release[] = [
  {
    id: "rel-01",
    buildRef: "sahayogi-one@v1.4.2 (build-1042)",
    initiator: "pipeline-ci/cd-prod",
    pipelineRef: "pipeline-deploy-sahayogi-one-prod-#1042",
    targetEnv: "Production",
    targetServices: ["Sahayogi One API", "Subscription & Licensing Engine"],
    migrationChanges: "None",
    rolloutStrategy: "100% General Availability",
    cohort: "All 2,150 workspaces",
    preDeployHealth: "Error rate 0.02%, P99: 52ms",
    postDeployHealth: "Error rate 0.01%, P99: 48ms",
    rolloutPercent: 100,
    status: "complete",
    pauseRollbackDecision: "None — rollout completed clean",
    rollbackEvidence: "",
    linkedIncident: null,
    rollbackEscalated: false,
  },
  {
    id: "rel-02",
    buildRef: "chat-sahayogi@v3.1.2 (build-9824)",
    initiator: "pipeline-ci/cd-prod",
    pipelineRef: "pipeline-deploy-chat-prod-#9824",
    targetEnv: "Production",
    targetServices: ["Chat Gateway", "WhatsApp Business Adapter", "AI Model Router"],
    migrationChanges: "None",
    rolloutStrategy: "100% General Availability",
    cohort: "All 1,180 workspaces",
    preDeployHealth: "Error rate 0.12%, P99: 380ms",
    postDeployHealth: "Error rate 0.18%, P99: 412ms — INC-910 linked (upstream AI gateway)",
    rolloutPercent: 100,
    status: "active",
    pauseRollbackDecision: "Monitoring — INC-910 linked to upstream OpenAI gateway, not release code",
    rollbackEvidence: "",
    linkedIncident: "INC-910",
    rollbackEscalated: false,
  },
  {
    id: "rel-05",
    buildRef: "boss@v4.0.2 (build-8730)",
    initiator: "aditya.sharma@sahayogi.internal (Release Eng)",
    pipelineRef: "pipeline-deploy-boss-prod-#8730",
    targetEnv: "Production",
    targetServices: ["BoSS API", "General Ledger Worker", "Tally Connector"],
    migrationChanges: "None",
    rolloutStrategy: "100% General Availability",
    cohort: "All 980 ERP workspaces",
    preDeployHealth: "Error rate 0.03%, P99: 112ms",
    postDeployHealth: "Error rate 0.02%, P99: 115ms",
    rolloutPercent: 100,
    status: "complete",
    pauseRollbackDecision: "None — rollout completed clean",
    rollbackEvidence: "",
    linkedIncident: null,
    rollbackEscalated: false,
  },
  {
    id: "rel-09",
    buildRef: "office-sahayogi@v2.3.0 (build-4912)",
    initiator: "aditya.sharma@sahayogi.internal (Release Eng)",
    pipelineRef: "pipeline-deploy-office-prod-#4912",
    targetEnv: "Production",
    targetServices: ["SME Diagnostic Engine", "Knowledge Graph API", "Workflow Auditor"],
    migrationChanges: "None",
    rolloutStrategy: "100% General Availability",
    cohort: "All 740 Consulting workspaces",
    preDeployHealth: "Error rate 0.03%, P99: 130ms",
    postDeployHealth: "Error rate 0.02%, P99: 135ms",
    rolloutPercent: 100,
    status: "complete",
    pauseRollbackDecision: "None — rollout completed clean",
    rollbackEvidence: "",
    linkedIncident: null,
    rollbackEscalated: false,
  },
  {
    id: "rel-06",
    buildRef: "investor-sahayogi@v2.1.0 (build-7740)",
    initiator: "pipeline-ci/cd-prod",
    pipelineRef: "pipeline-deploy-ai-prod-#7740",
    targetEnv: "Production",
    targetServices: ["LLM Router", "RAG Vector Search", "Token Metering Engine"],
    migrationChanges: "None",
    rolloutStrategy: "100% General Availability",
    cohort: "All 1,250 AI-enabled workspaces",
    preDeployHealth: "Error rate 0.10%, P99: 345ms",
    postDeployHealth: "Error rate 0.08%, P99: 338ms",
    rolloutPercent: 100,
    status: "complete",
    pauseRollbackDecision: "None — rollout completed clean",
    rollbackEvidence: "",
    linkedIncident: null,
    rollbackEscalated: false,
  },
  {
    id: "rel-08",
    buildRef: "studio-sahayogi@v1.9.0 (build-4129)",
    initiator: "pipeline-ci/cd-prod",
    pipelineRef: "pipeline-deploy-studio-prod-#4129",
    targetEnv: "Production",
    targetServices: ["Workflow Engine", "Multi-Agent Router", "Webhook Dispatcher"],
    migrationChanges: "None",
    rolloutStrategy: "30% Canary Cohort A",
    cohort: "30% of 890 Studio workspaces",
    preDeployHealth: "Error rate 0.08%, P99: 278ms",
    postDeployHealth: "Error rate 0.07%, P99: 288ms",
    rolloutPercent: 30,
    status: "active",
    pauseRollbackDecision: "None — within SLO, proceeding to 50%",
    rollbackEvidence: "",
    linkedIncident: null,
    rollbackEscalated: false,
  },
];

export const errorRateBeforeAfter = [
  { label: "Sahayogi One v1.4.2", before: 2, after: 1, escalated: false },
  { label: "Chat with Sahayogi v3.1.2", before: 12, after: 18, escalated: false },
  { label: "BoSS v4.0.2", before: 3, after: 2, escalated: false },
  { label: "Office Sahayogi v2.3.0", before: 3, after: 2, escalated: false },
  { label: "Investor Sahayogi v2.1.0", before: 4, after: 2, escalated: false },
  { label: "Studio Sahayogi v1.9.0", before: 8, after: 7, escalated: false },
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

const DEPLOY_WINDOW_WEEKS = 12;

function buildWeeklyDeploySeries(seed: number, min: number, max: number) {
  const random = mulberry32(seed);
  return Array.from({ length: DEPLOY_WINDOW_WEEKS }, () => min + Math.floor(random() * (max - min + 1)));
}

const DEPLOYMENTS_WEEKLY = buildWeeklyDeploySeries(77, 5, 15);

export type DeploymentRangeWeeks = 4 | 8 | 12;
export type DeploymentTrendPoint = { label: string; value: number };

export function buildDeploymentFrequencyTrend(rangeWeeks: DeploymentRangeWeeks = 8): DeploymentTrendPoint[] {
  const slice = DEPLOYMENTS_WEEKLY.slice(DEPLOY_WINDOW_WEEKS - rangeWeeks);
  return slice.map((value, i) => ({ label: `W${i + 1}`, value }));
}

export const deploymentFrequencyTrend = buildDeploymentFrequencyTrend(8);
