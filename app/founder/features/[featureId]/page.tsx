"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Flag,
  Users,
  Layers,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockFeatures, mockFeatureFlags } from "@/lib/mockData";

export default function FeatureDetailPage() {
  const params = useParams<{ featureId: string }>();
  const feature = mockFeatures.find((f) => f.id === params?.featureId) || mockFeatures[0];
  const flag = mockFeatureFlags.find((fl) => fl.id === feature.flagId);

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Back link */}
      <div className="flex items-center gap-2">
        <Link
          href="/founder/features"
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--icon-btn-navy)] hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Back to Feature Catalog</span>
        </Link>
      </div>

      {/* Feature Header Card */}
      <div
        className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 p-6 text-white"
        style={{ background: "linear-gradient(135deg, #001C44 0%, #08285C 100%)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[var(--surface)]/15 px-2 py-0.5 text-xs font-semibold text-blue-200">
                {feature.productName}
              </span>
              <span className="rounded-md bg-[var(--surface)]/10 px-2 py-0.5 text-xs font-medium text-white/80">
                {feature.status}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">{feature.name}</h1>
            <p className="mt-1 max-w-2xl text-sm text-white/80">{feature.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-xs text-white/60">Adoption Rate</span>
              <span className="text-2xl font-bold text-blue-300">{feature.adoptionRate}%</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 screen-sm:grid-cols-4">
          <div>
            <span className="text-xs text-white/60">Active Workspaces</span>
            <p className="text-lg font-bold text-white">{feature.activeWorkspaces.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Monthly Volume</span>
            <p className="text-sm font-semibold text-white">{feature.monthlyUsage}</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Rollout Exposure</span>
            <p className="text-lg font-bold text-white">{feature.rolloutPercentage}%</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Telemetry Status</span>
            <p className="text-sm font-semibold text-emerald-300">
              {feature.telemetryGate.healthy ? "Healthy Gate" : "Degraded Gate"}
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Access Matrix & Telemetry Gate */}
      <div className="grid grid-cols-1 gap-[var(--space-md)] screen-lg:grid-cols-2">
        {/* Who Has Access */}
        <Card title="Workspace Population Access" description="Distribution of workspaces entitled to this feature">
          <div className="flex flex-col gap-2.5">
            {feature.whoHasAccess.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-3"
              >
                <div>
                  <span className="font-semibold text-[var(--text-heading)]">{item.plan} Tier</span>
                  <p className="text-xs text-[var(--text-muted)]">{item.workspaces} workspaces enrolled</p>
                </div>
                <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  Entitled
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Telemetry Gate Details */}
        <Card title="Automated Telemetry Safety Gate" description="Threshold rules evaluating live rollout stability">
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-[var(--divider)] p-3">
              <span className="text-xs text-[var(--text-muted)]">Error Rate Threshold vs Current</span>
              <p className="mt-0.5 text-base font-bold text-[var(--text-heading)]">
                {feature.telemetryGate.currentErrorRate} (Threshold: {feature.telemetryGate.errorRateThreshold})
              </p>
            </div>
            <div className="rounded-lg border border-[var(--divider)] p-3">
              <span className="text-xs text-[var(--text-muted)]">Latency SLA vs Current P99</span>
              <p className="mt-0.5 text-base font-bold text-[var(--text-heading)]">
                {feature.telemetryGate.currentLatency} (Threshold: {feature.telemetryGate.latencyThreshold})
              </p>
            </div>
            {flag && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
                <span className="font-bold">Controlled Feature Flag:</span> {flag.name} ({flag.environment})
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
