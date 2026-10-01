"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitBranch,
  Server,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Globe,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockReleases } from "@/lib/mockData";

export default function ReleasesPipelinePage() {
  const [releases, setReleases] = useState(mockReleases);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRollback = (relId: string, prodName: string, version: string) => {
    setReleases((prev) =>
      prev.map((r) =>
        r.id === relId ? { ...r, status: "Rolled Back", rollbackAvailable: false } : r
      )
    );
    showToast(`Rollback executed for ${prodName} (${version}). Traffic redirected to previous stable build.`);
  };

  const environments = [
    { name: "Production", activeReleases: 3, health: "Healthy", color: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40" },
    { name: "Staging", activeReleases: 4, health: "Healthy", color: "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40" },
    { name: "Test / QA", activeReleases: 4, health: "Healthy", color: "text-purple-700 bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/40" },
    { name: "Development", activeReleases: 4, health: "Healthy", color: "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40" },
  ];

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
            href="/releases"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            <GitBranch size={14} />
            <span>Releases Pipeline ({releases.length})</span>
          </Link>
          <Link
            href="/releases/environments"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <Server size={14} />
            <span>Environments Topology</span>
          </Link>
        </div>
      </div>

      {/* Environments Overview Row */}
      <div className="grid grid-cols-1 gap-[var(--space-sm)] screen-sm:grid-cols-4">
        {environments.map((env) => (
          <div
            key={env.name}
            className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4"
            style={{ boxShadow: "var(--card-shadow)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-heading)]">{env.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-bold border ${env.color}`}>
                {env.health}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-[var(--text-heading)]">
              {env.activeReleases} Builds
            </p>
            <span className="mt-1 text-[0.6875rem] text-[var(--text-muted)]">Active in environment</span>
          </div>
        ))}
      </div>

      {/* Releases Pipeline Table */}
      <Card
        title="Production Deployment Pipeline"
        description="Controlled deployment verification, environment baselines, error rate telemetry and rollback orchestration"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--divider)] text-[0.75rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                <th className="pb-3 pr-4">Product / Release</th>
                <th className="pb-3 px-3">Environment</th>
                <th className="pb-3 px-3">Cohort</th>
                <th className="pb-3 px-3">Deployed At</th>
                <th className="pb-3 px-3">Initiator</th>
                <th className="pb-3 px-3">Telemetry Impact</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--divider)]">
              {releases.map((r) => {
                const isRolledBack = r.status === "Rolled Back";

                return (
                  <tr key={r.id} className="transition-colors hover:bg-[var(--surface-muted)]/50">
                    <td className="py-3.5 pr-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[var(--text-heading)]">{r.productName}</span>
                        <span className="font-mono text-xs text-[var(--text-muted)]">{r.version} ({r.buildNumber})</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="badge-pill badge-env">{r.environment}</span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs text-[var(--text-secondary)]">
                      {r.cohort}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs text-[var(--text-muted)]">
                      {r.deployedAt}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap font-mono text-xs text-[var(--text-muted)]">
                      {r.initiator}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs">
                      <span className="text-[var(--text-muted)]">{r.errorRateBefore}</span>
                      <span className="mx-1 text-[var(--text-muted)]">→</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">{r.errorRateAfter}</span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                          isRolledBack ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                      {r.rollbackAvailable && !isRolledBack ? (
                        <button
                          type="button"
                          onClick={() => handleRollback(r.id, r.productName, r.version)}
                          className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40"
                        >
                          <RotateCcw size={12} />
                          <span>Rollback</span>
                        </button>
                      ) : (
                        <span className="text-xs text-[var(--text-muted)]">Locked</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
