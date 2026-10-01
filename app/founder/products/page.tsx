"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Layers,
  CheckSquare,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Activity,
  HeartPulse,
  Box,
  TrendingUp,
} from "lucide-react";
import Card from "@/components/shared/Card";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockProducts, mockFeatures } from "@/lib/mockData";

export default function ProductsRegistryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const tiers = useMemo(() => {
    const set = new Set(mockProducts.map((p) => p.tier));
    return ["all", ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = tierFilter === "all" || p.tier === tierFilter;
      return matchesSearch && matchesTier;
    });
  }, [searchTerm, tierFilter]);

  const healthyCount = mockProducts.filter((p) => p.health.status === "Healthy").length;
  const totalWorkspaces = mockProducts.reduce((sum, p) => sum + p.workspaceCount, 0);
  const avgAdoption = Math.round(
    mockProducts.reduce((sum, p) => sum + p.adoptionRate, 0) / mockProducts.length
  );

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Subparts Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/founder/products"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            <Layers size={14} />
            <span>All Products ({mockProducts.length})</span>
          </Link>
          <Link
            href="/founder/products/product-360"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <Box size={14} />
            <span>Product 360</span>
          </Link>
          <Link
            href="/founder/features"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <Sparkles size={14} />
            <span>Features ({mockFeatures.length})</span>
          </Link>
          <Link
            href="/founder/features/adoption"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <CheckSquare size={14} />
            <span>Feature Adoption</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 gap-[var(--space-sm)] screen-sm:grid-cols-4">
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Total Products</span>
          <p className="text-2xl font-bold tracking-tight text-[var(--text-heading)]">{mockProducts.length}</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Across 8 system tiers</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Healthy Systems</span>
          <p className="text-2xl font-bold tracking-tight text-emerald-600">{healthyCount} / {mockProducts.length}</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">99.8% average uptime</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Total Workspaces</span>
          <p className="text-2xl font-bold tracking-tight text-[var(--text-heading)]">{totalWorkspaces.toLocaleString()}</p>
          <span className="text-[0.6875rem] text-emerald-600 font-semibold">+16.8% MoM growth</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Average Adoption</span>
          <p className="text-2xl font-bold tracking-tight text-blue-600">{avgAdoption}%</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Target: 75% adoption</span>
        </div>
      </div>

      {/* Product Catalog Card with Search & Filters */}
      <Card
        title="Products & Services Registry"
        description="Authoritative registry of commercial and foundational products governed by Sahayogi Setu."
        action={
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="h-8 rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)] pl-8 pr-3 text-xs text-[var(--text-heading)] outline-none focus:border-blue-500 focus:bg-[var(--surface)]"
              />
            </div>
            {/* Tier Filter */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="h-8 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-2.5 text-xs text-[var(--text-secondary)] outline-none"
            >
              {tiers.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All Tiers" : t}
                </option>
              ))}
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--divider)] text-[0.75rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                <th className="pb-3 pr-4">Product / Service</th>
                <th className="pb-3 px-3">Tier</th>
                <th className="pb-3 px-3">Workspaces</th>
                <th className="pb-3 px-3">Adoption</th>
                <th className="pb-3 px-3">Health Status</th>
                <th className="pb-3 px-3">Current Version</th>
                <th className="pb-3 px-3">Monthly Cost</th>
                <th className="pb-3 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--divider)]">
              {filteredProducts.map((p) => {
                const isHealthy = p.health.status === "Healthy";
                return (
                  <tr key={p.id} className="transition-colors hover:bg-[var(--surface-muted)]/50">
                    <td className="py-3.5 pr-4">
                      <div className="flex flex-col">
                        <Link
                          href={`/founder/products/${p.id}`}
                          className="font-semibold text-[var(--text-heading)] hover:text-blue-600 hover:underline"
                        >
                          {p.name}
                        </Link>
                        <span className="text-xs text-[var(--text-muted)] line-clamp-1">{p.tagline}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="badge-pill">{p.tier}</span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-[var(--text-heading)] whitespace-nowrap">
                      {p.workspaceCount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-slate-200 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${p.adoptionRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-[var(--text-heading)]">{p.adoptionRate}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          isHealthy
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40"
                            : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40"
                        }`}
                      >
                        {isHealthy ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                        <span>{p.health.status} ({p.health.score}%)</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-muted)]">
                        {p.release}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap font-medium text-[var(--text-secondary)]">
                      ${p.operationalCost.total.toLocaleString()}
                      <span className="ml-1 text-[0.6875rem] text-[var(--text-muted)]">({p.operationalCost.variance})</span>
                    </td>
                    <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                      <Link
                        href={`/founder/products/${p.id}`}
                        className="inline-flex items-center gap-1 rounded-md border border-[var(--divider)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] shadow-sm hover:bg-[var(--surface-muted)]"
                      >
                        <span>Details</span>
                        <ArrowUpRight size={12} />
                      </Link>
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
