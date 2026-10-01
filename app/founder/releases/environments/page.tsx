"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Server,
  Globe,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockProducts } from "@/lib/mockData";

export default function EnvironmentsTopologyPage() {
  const [syncingEnv, setSyncingEnv] = useState<string | null>(null);

  const handleSync = (envId: string) => {
    setSyncingEnv(envId);
    setTimeout(() => setSyncingEnv(null), 1000);
  };

  const environments = [
    {
      id: "production",
      name: "Production Ecosystem",
      badge: "Live Traffic",
      badgeType: "bg-emerald-100 text-emerald-800",
      status: "Healthy",
      syncStatus: "Synchronized",
      url: "https://setu.sahayogi.com",
      build: "Build #8412",
      commit: "7f92a10",
      activeWorkspaces: 2150,
      slaScore: "99.98%",
      products: mockProducts.map((p) => ({ name: p.name, version: p.release, status: p.health.status })),
    },
    {
      id: "staging",
      name: "Staging & Pre-Release",
      badge: "Release Candidates",
      badgeType: "bg-blue-100 text-blue-800",
      status: "Healthy",
      syncStatus: "Synchronized",
      url: "https://staging.setu.sahayogi.internal",
      build: "Build #8415-rc2",
      commit: "9c41f23",
      activeWorkspaces: 48,
      slaScore: "99.94%",
      products: mockProducts.map((p) => ({ name: p.name, version: p.release + "-rc2", status: "Healthy" })),
    },
    {
      id: "qa",
      name: "QA & Integration Test",
      badge: "Automated Test Suite",
      badgeType: "bg-purple-100 text-purple-800",
      status: "Healthy",
      syncStatus: "Syncing",
      url: "https://qa.setu.sahayogi.internal",
      build: "Build #8418-test",
      commit: "3d18b45",
      activeWorkspaces: 12,
      slaScore: "99.90%",
      products: mockProducts.map((p) => ({ name: p.name, version: p.release + "-nightly", status: "Healthy" })),
    },
    {
      id: "dev",
      name: "Development Cluster",
      badge: "Ephemeral Workspaces",
      badgeType: "bg-amber-100 text-amber-800",
      status: "Healthy",
      syncStatus: "Continuous Deploy",
      url: "https://dev.setu.sahayogi.internal",
      build: "Build #8420-dev",
      commit: "1e77c89",
      activeWorkspaces: 8,
      slaScore: "99.80%",
      products: mockProducts.map((p) => ({ name: p.name, version: p.release + "-dev", status: "Healthy" })),
    },
  ];

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Subparts Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/founder/releases"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <GitBranch size={14} />
            <span>Releases Pipeline</span>
          </Link>
          <Link
            href="/founder/releases/environments"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            <Server size={14} />
            <span>Environments Topology</span>
          </Link>
        </div>
      </div>

      {/* Environments Grid */}
      <div className="grid grid-cols-1 gap-[var(--space-md)] screen-lg:grid-cols-2">
        {environments.map((env) => (
          <Card
            key={env.id}
            title={env.name}
            description={`${env.build} • Commit: ${env.commit}`}
            action={
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${env.badgeType}`}>
                  {env.badge}
                </span>
                <button
                  type="button"
                  onClick={() => handleSync(env.id)}
                  className="rounded-lg border border-[var(--divider)] p-1.5 text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-heading)]"
                  title="Trigger Cluster Health Sync"
                >
                  <RefreshCw size={14} className={syncingEnv === env.id ? "animate-spin" : ""} />
                </button>
              </div>
            }
          >
            <div className="flex flex-col gap-3 pt-2">
              <div className="grid grid-cols-3 gap-2 rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-3 text-xs">
                <div>
                  <span className="text-[var(--text-muted)]">Active Workspaces</span>
                  <p className="text-base font-bold text-[var(--text-heading)]">{env.activeWorkspaces}</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)]">Target SLA</span>
                  <p className="text-base font-bold text-emerald-600">{env.slaScore}</p>
                </div>
                <div>
                  <span className="text-[var(--text-muted)]">Cluster Status</span>
                  <p className="text-base font-bold text-blue-600">{env.syncStatus}</p>
                </div>
              </div>

              {/* Deployed Products */}
              <div>
                <p className="mb-2 text-xs font-bold text-[var(--text-heading)]">Deployed Products in {env.name}:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {env.products.map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center justify-between rounded-md border border-[var(--divider)] bg-[var(--surface)] p-2"
                    >
                      <span className="truncate font-semibold text-[var(--text-heading)]">{p.name}</span>
                      <span className="font-mono text-[0.6875rem] text-[var(--text-muted)]">{p.version}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
