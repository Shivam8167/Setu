"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Flag,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  ShieldAlert,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockFeatureFlags } from "@/lib/mockData";

export default function FlagDetailPage() {
  const params = useParams<{ flagId: string }>();
  const flag = mockFeatureFlags.find((f) => f.id === params?.flagId) || mockFeatureFlags[0];

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Back link */}
      <div className="flex items-center gap-2">
        <Link
          href="/feature-flags"
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--icon-btn-navy)] hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Back to Feature Flags</span>
        </Link>
      </div>

      {/* Flag Hero Banner */}
      <div
        className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 p-6 text-white"
        style={{ background: "linear-gradient(135deg, #001C44 0%, #08285C 100%)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[var(--surface)]/15 px-2 py-0.5 text-xs font-semibold text-blue-200">
                {flag.environment}
              </span>
              <span className="rounded-md bg-[var(--surface)]/10 px-2 py-0.5 font-mono text-xs text-white/80">
                {flag.name}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">{flag.featureName}</h1>
            <p className="mt-1 text-sm text-white/80">Owner: {flag.owner} • Target: {flag.target}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-xs text-white/60">Rollout Exposure</span>
              <span className="text-3xl font-extrabold text-blue-300">{flag.rolloutPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Schedule & Telemetry Row */}
        <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 screen-sm:grid-cols-4">
          <div>
            <span className="text-xs text-white/60">Status</span>
            <p className="text-base font-bold text-emerald-300">{flag.status}</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Target Cohort</span>
            <p className="text-sm font-semibold text-white">{flag.cohort}</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Rollout Start</span>
            <p className="text-sm font-semibold text-white">{flag.schedule?.start || "2026-08-01"}</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Review Gate</span>
            <p className="text-sm font-semibold text-white">{flag.schedule?.review || "2026-09-30"}</p>
          </div>
        </div>
      </div>

      {/* Telemetry Gate & Circuit Breaker */}
      <div className="grid grid-cols-1 gap-[var(--space-md)] screen-lg:grid-cols-2">
        <Card title="Automated Telemetry Gate" description="Threshold rules evaluating live rollout stability">
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-[var(--divider)] p-3">
              <span className="text-xs text-[var(--text-muted)]">Rule Definition</span>
              <p className="mt-0.5 font-bold text-sm text-[var(--text-heading)]">{flag.telemetryGate.rule}</p>
            </div>
            <div className="rounded-lg border border-[var(--divider)] p-3">
              <span className="text-xs text-[var(--text-muted)]">Live Telemetry Readings</span>
              <p className="mt-0.5 font-bold text-sm text-emerald-600">{flag.telemetryGate.currentValues}</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border dark:border-emerald-800/40">
              <CheckCircle2 size={16} />
              <span>Gate passed without tripping safety thresholds.</span>
            </div>
          </div>
        </Card>

        <Card title="Circuit Breakers & Emergency Controls" description="Operational safety levers">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border border-[var(--divider)] p-3">
              <div>
                <span className="font-bold text-sm text-[var(--text-heading)]">Automated Killswitch</span>
                <p className="text-xs text-[var(--text-muted)]">Trips automatically if P99 latency &gt; threshold</p>
              </div>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">ARMED</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[var(--divider)] p-3">
              <div>
                <span className="font-bold text-sm text-[var(--text-heading)]">Manual Rollback Override</span>
                <p className="text-xs text-[var(--text-muted)]">Revert cohort to previous build immediately</p>
              </div>
              <button
                type="button"
                className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40"
              >
                Trigger Override
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
