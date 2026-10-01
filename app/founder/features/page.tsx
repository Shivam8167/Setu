"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Box,
  Search,
  Check,
  X,
  ArrowUpRight,
  ShieldAlert,
  Layers,
  CheckCircle2,
  CheckSquare,
  BarChart2,
  Filter,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockFeatures, mockPlanEntitlements, mockProducts } from "@/lib/mockData";

export default function FeaturesCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeProductFilter, setActiveProductFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"features" | "plans">("features");

  const filteredFeatures = useMemo(() => {
    return mockFeatures.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProduct = activeProductFilter === "all" || f.productId === activeProductFilter;
      return matchesSearch && matchesProduct;
    });
  }, [searchTerm, activeProductFilter]);

  const avgAdoption = Math.round(
    mockFeatures.reduce((acc, f) => acc + f.adoptionRate, 0) / mockFeatures.length
  );

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Subparts Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/founder/products"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
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
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
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
          <span className="text-xs font-medium text-[var(--role-text)]">Total Features</span>
          <p className="text-2xl font-bold tracking-tight text-[var(--text-heading)]">{mockFeatures.length}</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Across 9 products</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Controlled Flags</span>
          <p className="text-2xl font-bold tracking-tight text-purple-600">10 Flags</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Gradual percentage rollouts</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Avg Feature Adoption</span>
          <p className="text-2xl font-bold tracking-tight text-blue-600">{avgAdoption}%</p>
          <span className="text-[0.6875rem] text-emerald-600 font-semibold">+5.4% velocity</span>
        </div>
        <div className="flex flex-col justify-between rounded-[var(--card-radius)] border border-[var(--card-border)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--role-text)]">Active Entitlements</span>
          <p className="text-2xl font-bold tracking-tight text-[var(--text-heading)]">4 Tiers</p>
          <span className="text-[0.6875rem] text-[var(--text-muted)]">Free, Pro, Business, Enterprise</span>
        </div>
      </div>

      {/* Main Card with Toggle Bar: Feature Directory vs Plan Entitlements */}
      <Card
        title="Feature Catalog & Plan Entitlements"
        description="Answering the PM's primary question: 'Who has which feature and how is it performing?'"
        action={
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-[var(--surface-muted)] p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab("features")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "features"
                    ? "bg-[var(--surface)] text-[var(--text-heading)] shadow-sm font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
              >
                <Sparkles size={13} />
                <span>Feature Directory ({mockFeatures.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("plans")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "plans"
                    ? "bg-[var(--surface)] text-[var(--text-heading)] shadow-sm font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
              >
                <Layers size={13} />
                <span>Plan Entitlements Matrix</span>
              </button>
            </div>
          </div>
        }
      >
        {activeTab === "features" ? (
          <div>
            {/* Filters Row */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--divider)] pb-3">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search features..."
                  className="h-8 rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)] pl-8 pr-3 text-xs text-[var(--text-heading)] outline-none focus:border-blue-500 focus:bg-[var(--surface)]"
                />
              </div>

              <select
                value={activeProductFilter}
                onChange={(e) => setActiveProductFilter(e.target.value)}
                className="h-8 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-2.5 text-xs text-[var(--text-secondary)] outline-none"
              >
                <option value="all">All Products</option>
                {mockProducts.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--divider)] text-[0.75rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    <th className="pb-3 pr-4">Feature Name</th>
                    <th className="pb-3 px-3">Product</th>
                    <th className="pb-3 px-3">Availability</th>
                    <th className="pb-3 px-3">Adoption Rate</th>
                    <th className="pb-3 px-3">Active Workspaces</th>
                    <th className="pb-3 px-3">Rollout</th>
                    <th className="pb-3 px-3">Telemetry</th>
                    <th className="pb-3 pl-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--divider)]">
                  {filteredFeatures.map((f) => (
                    <tr key={f.id} className="transition-colors hover:bg-[var(--surface-muted)]/50">
                      <td className="py-3.5 pr-4">
                        <div className="flex flex-col">
                          <Link
                            href={`/founder/features/${f.id}`}
                            className="font-semibold text-[var(--text-heading)] hover:text-blue-600 hover:underline"
                          >
                            {f.name}
                          </Link>
                          <span className="text-xs text-[var(--text-muted)] line-clamp-1">{f.description}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap text-xs font-medium text-[var(--text-secondary)]">
                        {f.productName}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {f.availability.map((tier) => (
                            <span key={tier} className="badge-pill badge-pill-sm badge-avail">
                              {tier}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-14 rounded-full bg-slate-200 dark:bg-slate-800">
                            <div
                              className="h-full rounded-full bg-blue-600"
                              style={{ width: `${f.adoptionRate}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-[var(--text-heading)]">{f.adoptionRate}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap text-xs font-semibold text-[var(--text-heading)]">
                        {f.activeWorkspaces.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs text-[var(--text-secondary)] border border-[var(--divider)]/40 dark:bg-white/10 dark:text-slate-200">
                          {f.rolloutPercentage}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40">
                          <CheckCircle2 size={12} />
                          <span>{f.telemetryGate.healthy ? "Healthy" : "Degraded"}</span>
                        </span>
                      </td>
                      <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 dark:border dark:border-blue-800/40">
                          {f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Plan Entitlements Matrix */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--divider)] text-[0.75rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  <th className="pb-3 pr-4">Feature / Entitlement</th>
                  <th className="pb-3 px-3 text-center">Free Starter</th>
                  <th className="pb-3 px-3 text-center">Pro Tier</th>
                  <th className="pb-3 px-3 text-center">Business App</th>
                  <th className="pb-3 px-3 text-center">Enterprise Suite</th>
                  <th className="pb-3 pl-3">Entitlement Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--divider)]">
                {mockPlanEntitlements.map((pe, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-[var(--surface-muted)]/50">
                    <td className="py-3.5 pr-4 font-semibold text-[var(--text-heading)]">
                      {pe.feature}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {pe.free === true ? (
                        <Check size={16} className="inline text-emerald-600" />
                      ) : pe.free === false ? (
                        <X size={16} className="inline text-slate-300" />
                      ) : (
                        <span className="text-xs font-semibold text-[var(--text-heading)]">{pe.free}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {pe.pro === true ? (
                        <Check size={16} className="inline text-emerald-600" />
                      ) : pe.pro === false ? (
                        <X size={16} className="inline text-slate-300" />
                      ) : (
                        <span className="text-xs font-semibold text-[var(--text-heading)]">{pe.pro}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {pe.business === true ? (
                        <Check size={16} className="inline text-emerald-600" />
                      ) : pe.business === false ? (
                        <X size={16} className="inline text-slate-300" />
                      ) : (
                        <span className="text-xs font-semibold text-[var(--text-heading)]">{pe.business}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {pe.enterprise === true ? (
                        <Check size={16} className="inline text-emerald-600" />
                      ) : pe.enterprise === false ? (
                        <X size={16} className="inline text-slate-300" />
                      ) : (
                        <span className="text-xs font-semibold text-[var(--text-heading)]">{pe.enterprise}</span>
                      )}
                    </td>
                    <td className="py-3.5 pl-3 text-xs text-[var(--text-muted)]">
                      {pe.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
