export const auditKpis = {
  totalEvents: 84619,
  todaysEvents: 1243,
  humanActionedEvents: 214,
  systemEvents: 1029,
};

export type AuditEvent = {
  id: string;
  time: string;
  actor: string;
  action: string;
  entity: string;
  before: string;
  after: string;
  result: "Success" | "Failed";
  correlationId: string;
};

export const auditEvents: AuditEvent[] = [
  { id: "act-1", time: "2026-09-26 11:30:00", actor: "system:pipeline-ci/cd-prod", action: "AI Assistant V2 rollout expanded to 65%", entity: "FLAG-ai_assistant_v2_rollout", before: "50% rollout", after: "65% rollout", result: "Success", correlationId: "corr-a1f92" },
  { id: "act-2", time: "2026-09-26 11:02:18", actor: "system:sre-alert", action: "Incident opened — AI Gateway latency spike", entity: "INC-910", before: "-", after: "Status: Investigating", result: "Success", correlationId: "corr-b0e44" },
  { id: "act-3", time: "2026-09-26 09:26:41", actor: "system:quota-engine", action: "Quota limit alert dispatched", entity: "WS-zenith-09 (Zenith Retail Solutions)", before: "Tokens: 480,000", after: "Tokens: 485,200 / 500,000 (97%)", result: "Success", correlationId: "corr-c3d15" },
  { id: "act-4", time: "2026-09-25 16:45:00", actor: "aditya.sharma@sahayogi.internal", action: "BoSS v4.0.2 deployed to Production", entity: "REL-05 (BoSS)", before: "v4.0.1", after: "v4.0.2 — 100% GA", result: "Success", correlationId: "corr-d9a71" },
  { id: "act-5", time: "2026-09-24 14:20:00", actor: "system:safety-telemetry", action: "Tally Direct Cloud Sync rollout paused", entity: "FLAG-flag-tally-sync", before: "50% rollout — Active", after: "50% rollout — Paused (safety gate tripped)", result: "Success", correlationId: "corr-e8c22" },
  { id: "act-6", time: "2026-09-24 10:15:00", actor: "pipeline-ci/cd-prod", action: "Sahayogi One v1.4.2 deployed to Production", entity: "REL-01 (Sahayogi One)", before: "v1.4.1", after: "v1.4.2 — 100% GA", result: "Success", correlationId: "corr-f7b83" },
  { id: "act-7", time: "2026-09-23 14:30:00", actor: "pipeline-ci/cd-prod", action: "Chat with Sahayogi v3.1.2 deployed", entity: "REL-02 (Chat with Sahayogi)", before: "v3.1.1", after: "v3.1.2 — 100% GA", result: "Success", correlationId: "corr-g6a94" },
  { id: "act-8", time: "2026-09-23 09:40:00", actor: "pipeline-ci/cd-prod", action: "Sahayogi AI v2.4.0 deployed to Production", entity: "REL-06 (Sahayogi AI)", before: "v2.3.9", after: "v2.4.0 — 100% GA", result: "Success", correlationId: "corr-h5b05" },
  { id: "act-9", time: "2026-09-22 14:10:00", actor: "aditya.sharma@sahayogi.internal", action: "Office Sahayogi v2.3.0 deployed to Production", entity: "REL-09 (Office Sahayogi)", before: "v2.2.8", after: "v2.3.0 — 100% GA", result: "Success", correlationId: "corr-k4a12" },
];
