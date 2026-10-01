"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BarChart3,
  Zap,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Filter,
  BarChart2,
  FileText,
  Activity,
  Layers,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockLimitPressures, mockProducts } from "@/lib/mockData";

export default function UsagePage() {
  const [filterSeverity, setFilterSeverity] = useState<"all" | "critical" | "warning">("all");

  const filteredPressures = useMemo(() => {
    return mockLimitPressures.filter((lp) => {
      if (filterSeverity === "critical") return lp.pressurePercentage >= 95;
      if (filterSeverity === "warning") return lp.pressurePercentage < 95;
      return true;
    });
  }, [filterSeverity]);

  const criticalCount = mockLimitPressures.filter((lp) => lp.pressurePercentage >= 95).length;
  const warningCount = mockLimitPressures.filter((lp) => lp.pressurePercentage < 95).length;

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Subparts Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/founder/usage"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            <BarChart2 size={14} />
            <span>Usage Overview</span>
          </Link>
          <Link
            href="/founder/usage/feature-usage"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <Activity size={14} />
            <span>Feature Usage</span>
          </Link>
          <Link
            href="/founder/usage/plans"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <FileText size={14} />
            <span>Plan / Entitlements</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 gap-[var(--space-sm)] screen-sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Total Workspaces Monitored</span>
          <p className="text-2xl font-bold tracking-tight text-[var(--text-heading)]">2,150</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Across 4 commercial tiers</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Workspaces Near Limit</span>
          <p className="text-2xl font-bold tracking-tight text-amber-600">{mockLimitPressures.length} Workspaces</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Exceeding 80% consumption</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Critical Quota Breaches</span>
          <p className="text-2xl font-bold tracking-tight text-red-600">{criticalCount} Critical</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">&gt;= 95% capacity consumed</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Pipeline Event Throughput</span>
          <p className="text-2xl font-bold tracking-tight text-blue-600">8.4M / day</p>
          <span className="text-[0.6875rem] text-emerald-600 font-semibold">100% ingested & deduplicated</span>
        </div>
      </div>

      {/* Metering Pipeline Stages */}
      <Card
        title="Setu Canonical Metering Pipeline"
        description="Pipeline: Meter Definition → Ingestion → Aggregation → Quota Evaluation → Policy Enforcement"
      >
        <div className="grid grid-cols-1 gap-2.5 pt-2 screen-md:grid-cols-5">
          <div className="flex flex-col rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/60 p-3.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
            <span className="mt-2 font-bold text-sm text-[var(--text-heading)]">Meter Definition</span>
            <span className="mt-1 text-xs text-[var(--text-muted)]">Tokens, messages, storage GB, API invocations</span>
          </div>

          <div className="flex flex-col rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/60 p-3.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">2</span>
            <span className="mt-2 font-bold text-sm text-[var(--text-heading)]">Consumption Ingestion</span>
            <span className="mt-1 text-xs text-[var(--text-muted)]">High-throughput Kafka events with deduplication</span>
          </div>

          <div className="flex flex-col rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/60 p-3.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">3</span>
            <span className="mt-2 font-bold text-sm text-[var(--text-heading)]">Aggregation</span>
            <span className="mt-1 text-xs text-[var(--text-muted)]">Real-time Redis counters & rolling 30d windows</span>
          </div>

          <div className="flex flex-col rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/60 p-3.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">4</span>
            <span className="mt-2 font-bold text-sm text-[var(--text-heading)]">Quota Evaluation</span>
            <span className="mt-1 text-xs text-[var(--text-muted)]">Evaluation against workspace plan entitlements</span>
          </div>

          <div className="flex flex-col rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/60 p-3.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">5</span>
            <span className="mt-2 font-bold text-sm text-[var(--text-heading)]">Policy Enforcement</span>
            <span className="mt-1 text-xs text-[var(--text-muted)]">Automated throttling, overages & Founder approvals</span>
          </div>
        </div>
      </Card>

      {/* Active Limit Pressure Alerts Table */}
      <Card
        title="Active Limit Pressure Alerts"
        description="Live workspaces that have consumed over 80% of allotted plan quota thresholds"
        action={
          <div className="flex rounded-lg bg-[var(--surface-muted)] p-0.5">
            <button
              onClick={() => setFilterSeverity("all")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                filterSeverity === "all" ? "bg-[var(--surface)] text-[var(--text-heading)] shadow-sm font-semibold" : "text-[var(--text-muted)]"
              }`}
            >
              All Alerts ({mockLimitPressures.length})
            </button>
            <button
              onClick={() => setFilterSeverity("critical")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                filterSeverity === "critical" ? "bg-[var(--surface)] text-red-700 dark:text-red-400 shadow-sm font-semibold" : "text-[var(--text-muted)]"
              }`}
            >
              Critical ({criticalCount})
            </button>
            <button
              onClick={() => setFilterSeverity("warning")}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                filterSeverity === "warning" ? "bg-[var(--surface)] text-amber-700 dark:text-amber-400 shadow-sm font-semibold" : "text-[var(--text-muted)]"
              }`}
            >
              Warning ({warningCount})
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--divider)] text-[0.75rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                <th className="pb-3 pr-4">Workspace</th>
                <th className="pb-3 px-3">Plan</th>
                <th className="pb-3 px-3">Governing Product</th>
                <th className="pb-3 px-3">Metered Dimension</th>
                <th className="pb-3 px-3">Consumption / Quota</th>
                <th className="pb-3 px-3">Pressure %</th>
                <th className="pb-3 px-3">Severity</th>
                <th className="pb-3 pl-3">Recommended Founder Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--divider)]">
              {filteredPressures.map((lp) => {
                const isCritical = lp.pressurePercentage >= 95;
                return (
                  <tr key={lp.id} className="transition-colors hover:bg-[var(--surface-muted)]/50">
                    <td className="py-3.5 pr-4 font-semibold text-[var(--text-heading)]">
                      {lp.workspaceName}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="badge-pill badge-plan">{lp.plan}</span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs text-[var(--text-secondary)]">
                      {lp.product}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs font-medium text-[var(--text-heading)]">
                      {lp.meter}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs font-semibold text-[var(--text-heading)]">
                      {lp.consumed} / {lp.limit}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-14 rounded-full bg-slate-200">
                          <div
                            className={`h-full rounded-full ${isCritical ? "bg-red-600" : "bg-amber-500"}`}
                            style={{ width: `${lp.pressurePercentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-[var(--text-heading)]">{lp.pressurePercentage}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                          isCritical
                            ? "bg-red-100 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40"
                            : "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40"
                        }`}
                      >
                        {lp.status}
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 text-xs text-[var(--role-text)]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Zap size={13} className="text-amber-500 shrink-0" />
                        <span>{lp.actionRecommended}</span>
                      </span>
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
