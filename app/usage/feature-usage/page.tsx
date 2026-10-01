"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Activity,
  BarChart2,
  FileText,
  Search,
  Zap,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockFeatures, mockProducts } from "@/lib/mockData";

export default function FeatureUsagePage() {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeatures = useMemo(() => {
    return mockFeatures.filter((f) => {
      const matchesProduct = selectedProduct === "all" || f.productId === selectedProduct;
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesProduct && matchesSearch;
    });
  }, [selectedProduct, searchTerm]);

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Subparts Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/usage"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <BarChart2 size={14} />
            <span>Usage Overview</span>
          </Link>
          <Link
            href="/usage/feature-usage"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            <Activity size={14} />
            <span>Feature Usage</span>
          </Link>
          <Link
            href="/usage/plans"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <FileText size={14} />
            <span>Plan / Entitlements</span>
          </Link>
        </div>

        {/* Product Filter */}
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="h-8 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--text-heading)] shadow-xs outline-none focus:border-blue-500"
        >
          <option value="all">All Products ({mockProducts.length})</option>
          {mockProducts.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 gap-3 screen-sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--text-muted)]">Total Invocations</span>
          <p className="mt-1 text-2xl font-bold text-[var(--text-heading)]">14.8M / mo</p>
          <span className="text-xs font-medium text-emerald-600">+18.2% vs last month</span>
        </div>
        <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--text-muted)]">Most Consumed</span>
          <p className="mt-1 text-xl font-bold text-purple-600">AI Assistant V2</p>
          <span className="text-xs text-[var(--text-muted)]">1.42M tokens / mo</span>
        </div>
        <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--text-muted)]">Fastest Growing</span>
          <p className="mt-1 text-xl font-bold text-emerald-600">WhatsApp Cloud v19</p>
          <span className="text-xs font-medium text-emerald-600">+42% MoM volume</span>
        </div>
        <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--text-muted)]">Active Workspaces</span>
          <p className="mt-1 text-2xl font-bold text-blue-600">1,420</p>
          <span className="text-xs text-[var(--text-muted)]">Multi-tenant dispatch</span>
        </div>
      </div>

      {/* Feature Usage Table */}
      <Card
        title="Granular Feature Telemetry"
        description="Monthly execution counts, token quotas, and active workspace population"
        action={
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search consumption..."
              className="h-8 rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)] pl-8 pr-3 text-xs text-[var(--text-heading)] outline-none focus:border-blue-500 focus:bg-[var(--surface)]"
            />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--divider)] text-[0.75rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                <th className="pb-3 pr-4">Feature Name</th>
                <th className="pb-3 px-3">Product Line</th>
                <th className="pb-3 px-3">Monthly Consumption</th>
                <th className="pb-3 px-3">Active Workspaces</th>
                <th className="pb-3 px-3">Adoption %</th>
                <th className="pb-3 pl-3 text-right">Gate Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--divider)]">
              {filteredFeatures.map((f) => (
                <tr key={f.id} className="transition-colors hover:bg-[var(--surface-muted)]/50">
                  <td className="py-3.5 pr-4 font-semibold text-[var(--text-heading)]">
                    {f.name}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap text-xs text-[var(--text-secondary)]">
                    {f.productName}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap font-mono text-xs font-semibold text-blue-600">
                    {f.monthlyUsage}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap font-medium text-[var(--text-heading)]">
                    {f.activeWorkspaces.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="font-bold text-[var(--text-heading)]">{f.adoptionRate}%</span>
                  </td>
                  <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      Operational
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
