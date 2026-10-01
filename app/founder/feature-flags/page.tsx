"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Flag,
  Search,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  ArrowUpRight,
  Sliders,
  Filter,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockFeatureFlags } from "@/lib/mockData";

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState(mockFeatureFlags);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnv, setSelectedEnv] = useState("all");

  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    flagId: string;
    flagName: string;
    action: "kill" | "pause" | "resume";
  }>({
    open: false,
    flagId: "",
    flagName: "",
    action: "pause",
  });

  const filteredFlags = useMemo(() => {
    return flags.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.featureName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEnv = selectedEnv === "all" || f.environment.toLowerCase() === selectedEnv.toLowerCase();
      return matchesSearch && matchesEnv;
    });
  }, [flags, searchTerm, selectedEnv]);

  const handleActionClick = (flagId: string, flagName: string, action: "kill" | "pause" | "resume") => {
    setConfirmModal({ open: true, flagId, flagName, action });
  };

  const confirmAction = () => {
    const { flagId, action } = confirmModal;
    setFlags((prev) =>
      prev.map((f) => {
        if (f.id !== flagId) return f;
        if (action === "kill") return { ...f, status: "RolledBack", rolloutPercentage: 0 };
        if (action === "pause") return { ...f, status: "Paused" };
        if (action === "resume") return { ...f, status: "Active" };
        return f;
      })
    );
    setConfirmModal({ open: false, flagId: "", flagName: "", action: "pause" });
  };

  const activeRollouts = flags.filter((f) => f.rolloutPercentage > 0 && f.rolloutPercentage < 100).length;

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Subparts Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/founder/feature-flags"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            <Flag size={14} />
            <span>All Flags ({flags.length})</span>
          </Link>
          <Link
            href="/founder/feature-flags/rollouts"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <Sliders size={14} />
            <span>Rollout Pipelines</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 gap-[var(--space-sm)] screen-sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Total Feature Flags</span>
          <p className="text-2xl font-bold tracking-tight text-[var(--text-heading)]">{flags.length}</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Across Setu products</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Active In-Progress Rollouts</span>
          <p className="text-2xl font-bold tracking-tight text-purple-600">{activeRollouts} Active</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Gradual cohort exposure</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Telemetry Safety Gates</span>
          <p className="text-2xl font-bold tracking-tight text-emerald-600">100% Passed</p>
          <span className="text-[0.6875rem] text-emerald-600 font-semibold">Zero threshold breaches</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Kill-Switch Armed</span>
          <p className="text-2xl font-bold tracking-tight text-blue-600">{flags.length} Armed</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Instant circuit break enabled</span>
        </div>
      </div>

      {/* Feature Flags Table Card */}
      <Card
        title="Controlled Feature Flags & Rollouts"
        description="Active exposure rules, percentage gates and telemetry safety switches"
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search flags..."
                className="h-8 rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)] pl-8 pr-3 text-xs text-[var(--text-heading)] outline-none focus:border-blue-500 focus:bg-[var(--surface)]"
              />
            </div>
            <select
              value={selectedEnv}
              onChange={(e) => setSelectedEnv(e.target.value)}
              className="h-8 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-2.5 text-xs text-[var(--text-secondary)] outline-none"
            >
              <option value="all">All Environments</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="qa">QA</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--divider)] text-[0.75rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                <th className="pb-3 pr-4">Feature / Flag Rule</th>
                <th className="pb-3 px-3">Environment</th>
                <th className="pb-3 px-3">Target Cohort</th>
                <th className="pb-3 px-3">Rollout %</th>
                <th className="pb-3 px-3">Telemetry Gate</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--divider)]">
              {filteredFlags.map((flag) => {
                const isPassed = flag.telemetryGate.status === "Passed";
                const isPaused = flag.status === "Paused";
                const isRolledBack = flag.status === "RolledBack";

                return (
                  <tr key={flag.id} className="transition-colors hover:bg-[var(--surface-muted)]/50">
                    <td className="py-3.5 pr-4">
                      <div className="flex flex-col">
                        <Link
                          href={`/founder/feature-flags/${flag.id}`}
                          className="font-semibold text-[var(--text-heading)] hover:text-blue-600 hover:underline"
                        >
                          {flag.featureName}
                        </Link>
                        <span className="font-mono text-xs text-[var(--text-muted)]">{flag.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="badge-pill badge-env">{flag.environment}</span>
                    </td>
                    <td className="py-3.5 px-3 text-xs text-[var(--text-secondary)] whitespace-nowrap">
                      {flag.cohort}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-slate-200">
                          <div
                            className={`h-full rounded-full ${
                              isRolledBack ? "bg-red-500" : isPaused ? "bg-amber-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${flag.rolloutPercentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-[var(--text-heading)]">
                          {flag.rolloutPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          isPassed
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40"
                            : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40"
                        }`}
                      >
                        {isPassed ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                        <span>{flag.telemetryGate.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                          flag.status === "GA"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400"
                            : flag.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : flag.status === "Paused"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                            : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                        }`}
                      >
                        {flag.status}
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {isPaused ? (
                          <button
                            type="button"
                            onClick={() => handleActionClick(flag.id, flag.featureName, "resume")}
                            className="inline-flex items-center gap-1 rounded border border-emerald-300 bg-emerald-50 px-2 py-1 text-[0.6875rem] font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40"
                          >
                            <Play size={11} />
                            <span>Resume</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleActionClick(flag.id, flag.featureName, "pause")}
                            disabled={isRolledBack}
                            className="inline-flex items-center gap-1 rounded border border-[var(--divider)] bg-[var(--surface)] px-2 py-1 text-[0.6875rem] font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] disabled:opacity-40"
                          >
                            <Pause size={11} />
                            <span>Pause</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleActionClick(flag.id, flag.featureName, "kill")}
                          disabled={isRolledBack}
                          className="inline-flex items-center gap-1 rounded border border-red-200 bg-red-50 px-2 py-1 text-[0.6875rem] font-medium text-red-700 hover:bg-red-100 disabled:opacity-40 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40"
                        >
                          <ShieldAlert size={11} />
                          <span>Kill</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-[var(--surface)] p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-[var(--text-heading)]">
              {confirmModal.action === "kill"
                ? "Arm Kill Switch"
                : confirmModal.action === "pause"
                ? "Pause Rollout"
                : "Resume Rollout"}
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Are you sure you want to {confirmModal.action} the feature flag for{" "}
              <strong className="text-[var(--text-heading)]">{confirmModal.flagName}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmModal({ open: false, flagId: "", flagName: "", action: "pause" })}
                className="rounded-lg border border-[var(--divider)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-muted)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmAction}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                  confirmModal.action === "kill"
                    ? "bg-red-600 hover:bg-red-700"
                    : confirmModal.action === "pause"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                Confirm {confirmModal.action.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
