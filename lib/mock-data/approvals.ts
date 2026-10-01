import type { ApprovalItem } from "./types";

export const approvalQueue: ApprovalItem[] = [
  {
    id: "apr-1",
    type: "Rollout expansion",
    title: "Approve AI Assistant V2 expansion from 65% to 85%",
    requester: "Product & AI Platform Team",
    impact: "High — affects 878 Pro/Business/Enterprise workspaces",
    owner: "Dhruv Singla (Founder)",
    deadline: "2026-09-30",
    severity: "high",
    reason:
      "Telemetry gate passed: Error rate 0.18% < 0.5% threshold, P99 latency 412ms < 600ms threshold. Automated gate cleared. Awaiting Founder sign-off to expand from 65% to 85% cohort.",
    reference: "FLAG-ai_assistant_v2_rollout",
    before: "AI Assistant V2 — 65% rollout",
    after: "AI Assistant V2 — 85% rollout",
  },
  {
    id: "apr-2",
    type: "Rollout decision",
    title: "Approve or hold Tally & BUSY Direct Cloud Sync re-expansion",
    requester: "BoSS Financial Core Team",
    impact: "Critical — 50% rollout paused; safety gate tripped on 3400ms latency",
    owner: "Dhruv Singla (Founder)",
    deadline: "2026-09-28",
    severity: "critical",
    reason:
      "Tally Direct Sync was paused at 50% when safety telemetry gate tripped: desktop socket timeout causing P99 latency of 3400ms vs 2000ms threshold. Engineering has deployed hotfix. Awaiting Founder approval to resume expansion.",
    reference: "FLAG-flag-tally-sync",
    before: "Tally & BUSY Direct Cloud Sync — 50% (Paused)",
    after: "Tally & BUSY Direct Cloud Sync — 75% (Resumed)",
  },
  {
    id: "apr-3",
    type: "Risk acceptance",
    title: "Accept quota breach risk: Global Trade Dynamics AI token overage",
    requester: "Ops escalation",
    impact: "Critical — 9.62M / 10M LLM tokens consumed (96.2%)",
    owner: "Dhruv Singla (Founder)",
    deadline: "2026-09-27",
    severity: "critical",
    reason:
      "Global Trade Dynamics (Enterprise) has consumed 96.2% of monthly LLM token quota. Autoscale lane authorised but billing impact requires Founder approval. Recommended: activate overage pricing clause per Enterprise contract.",
    reference: "LP-105",
    before: "LLM Tokens: 9.62M / 10.0M (96.2%)",
    after: "Overage billing activated + autoscale lane approved",
  },
  {
    id: "apr-4",
    type: "Workspace suspension",
    title: "Suspend workspace: Nexus Health Informatics storage block",
    requester: "Customer Ops",
    impact: "Medium — 1 workspace, Cloud Storage at 94.2 GB / 100 GB",
    owner: "Dhruv Singla (Founder)",
    deadline: "2026-09-26",
    severity: "medium",
    reason:
      "Nexus Health Informatics (Pro) is at 94.2% cloud storage. Auto-notification sent. Workspace admin unresponsive for 48h. Ops recommends temporary write-block until plan upgrade is confirmed.",
    reference: "LP-103",
    before: "Workspace status: Active (94.2% storage)",
    after: "Workspace status: Write-blocked pending upgrade",
  },
];
