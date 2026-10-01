"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sliders,
  Flag,
  Play,
  Pause,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockFeatureFlags } from "@/lib/mockData";

export default function RolloutPipelinesPage() {
  const [rollouts, setRollouts] = useState(
    mockFeatureFlags.map((f) => ({
      ...f,
      currentRollout: f.rolloutPercentage,
    }))
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSliderChange = (id: string, newValue: number) => {
    setRollouts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, currentRollout: Number(newValue) } : r))
    );
  };

  const handlePause = (id: string) => {
    setRollouts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Paused" } : r))
    );
    showToast(`Rollout paused for ${id}`);
  };

  const handleResume = (id: string) => {
    setRollouts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Active" } : r))
    );
    showToast(`Rollout resumed for ${id}`);
  };

  const handleKillSwitch = (id: string) => {
    setRollouts((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "RolledBack", currentRollout: 0 } : r
      )
    );
    showToast(`KILL SWITCH ACTIVATED: ${id} immediately rolled back to 0%`);
  };

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl">
          {toastMessage}
        </div>
      )}

      {/* Subparts Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/founder/feature-flags"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <Flag size={14} />
            <span>All Flags ({rollouts.length})</span>
          </Link>
          <Link
            href="/founder/feature-flags/rollouts"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            <Sliders size={14} />
            <span>Rollout Pipelines</span>
          </Link>
        </div>
      </div>

      {/* Rollout Cards Grid */}
      <Card
        title="Active Percentage Rollout Pipelines"
        description="Fine-grained cohort exposure sliders backed by automated telemetry safety gates"
      >
        <div className="flex flex-col gap-4 py-1">
          {rollouts.map((r) => {
            const isPassed = r.telemetryGate.status === "Passed";
            const isPaused = r.status === "Paused";
            const isRolledBack = r.status === "RolledBack";

            return (
              <div
                key={r.id}
                className="flex flex-col gap-3 rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/40 p-4 transition-all hover:bg-[var(--surface)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-[var(--text-heading)]">{r.featureName}</span>
                      <span className="badge-pill badge-env font-mono">{r.environment}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-[var(--text-muted)] font-mono">{r.name} • Owner: {r.owner}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isPassed ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                      }`}
                    >
                      {isPassed ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                      <span>{r.telemetryGate.rule} ({r.telemetryGate.currentValues})</span>
                    </span>

                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                        r.status === "GA"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                          : r.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : r.status === "Paused"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>

                {/* Slider + Percentage Display */}
                <div className="flex items-center gap-4 pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={r.currentRollout}
                    disabled={isRolledBack}
                    onChange={(e) => handleSliderChange(r.id, Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600 disabled:opacity-40"
                  />
                  <span className="w-12 text-right font-mono text-base font-bold text-[var(--text-heading)]">
                    {r.currentRollout}%
                  </span>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between border-t border-[var(--divider)] pt-2.5 text-xs">
                  <span className="text-[var(--text-muted)]">Target Cohort: {r.cohort}</span>

                  <div className="flex items-center gap-2">
                    {isPaused ? (
                      <button
                        type="button"
                        onClick={() => handleResume(r.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40"
                      >
                        <Play size={12} />
                        <span>Resume Expansion</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handlePause(r.id)}
                        disabled={isRolledBack}
                        className="inline-flex items-center gap-1 rounded-md border border-[var(--divider)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] disabled:opacity-40"
                      >
                        <Pause size={12} />
                        <span>Freeze Rollout</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleKillSwitch(r.id)}
                      disabled={isRolledBack}
                      className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-40 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40"
                    >
                      <ShieldAlert size={12} />
                      <span>Instant Kill Switch</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
