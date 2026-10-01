"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Box,
  CheckSquare,
  TrendingUp,
  Layers,
  ArrowUpRight,
  Search,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockFeatures, mockProducts } from "@/lib/mockData";

export default function FeatureAdoptionPage() {
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeatures = useMemo(() => {
    return mockFeatures
      .filter((f) => {
        const matchesProduct = selectedProduct === "all" || f.productId === selectedProduct;
        const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesProduct && matchesSearch;
      })
      .sort((a, b) => b.adoptionRate - a.adoptionRate);
  }, [selectedProduct, searchTerm]);

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Subparts Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <Layers size={14} />
            <span>All Products ({mockProducts.length})</span>
          </Link>
          <Link
            href="/products/product-360"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <Box size={14} />
            <span>Product 360</span>
          </Link>
          <Link
            href="/features"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <Sparkles size={14} />
            <span>Features ({mockFeatures.length})</span>
          </Link>
          <Link
            href="/features/adoption"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            <CheckSquare size={14} />
            <span>Feature Adoption</span>
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

      {/* KPI Velocity Banner */}
      <div className="grid grid-cols-1 gap-3 screen-sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--text-muted)]">Average Adoption Rate</span>
          <p className="mt-1 text-2xl font-bold text-blue-600">85.6%</p>
          <span className="text-xs font-medium text-emerald-600">+5.4% WoW growth velocity</span>
        </div>
        <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--text-muted)]">Top Performing Feature</span>
          <p className="mt-1 text-xl font-bold text-[var(--text-heading)]">Unified Subscription Hub</p>
          <span className="text-xs text-[var(--text-muted)]">98.2% across 2,110 workspaces</span>
        </div>
        <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface)] p-4" style={{ boxShadow: "var(--card-shadow)" }}>
          <span className="text-xs font-medium text-[var(--text-muted)]">Fastest Moving Cohort</span>
          <p className="mt-1 text-xl font-bold text-purple-600">AI Assistant V2</p>
          <span className="text-xs font-medium text-emerald-600">+14.2% MoM adoption ramp</span>
        </div>
      </div>

      {/* Feature Adoption Leaderboard */}
      <Card
        title="Feature Adoption Rankings"
        description="Ranked by active workspace adoption percentage across customer segments"
        action={
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rankings..."
              className="h-8 rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)] pl-8 pr-3 text-xs text-[var(--text-heading)] outline-none focus:border-blue-500 focus:bg-[var(--surface)]"
            />
          </div>
        }
      >
        <div className="flex flex-col gap-3 py-1">
          {filteredFeatures.map((feat, index) => (
            <div
              key={feat.id}
              className="flex items-center gap-4 rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/40 p-3.5 transition-all hover:bg-[var(--surface)] hover:shadow-xs"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : index === 1
                    ? "bg-purple-600 text-white"
                    : index === 2
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-200"
                }`}
              >
                #{index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text-heading)]">{feat.name}</span>
                    <span className="rounded bg-[var(--surface-muted)] px-2 py-0.5 text-xs font-medium text-[var(--text-muted)]">
                      {feat.productName}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{feat.adoptionRate}%</span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${feat.adoptionRate}%`,
                      backgroundColor:
                        index === 0 ? "#0058DD" : index === 1 ? "#8B5CF6" : index === 2 ? "#10B981" : "#475569",
                    }}
                  />
                </div>

                <div className="mt-1.5 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{feat.description}</span>
                  <span className="font-semibold text-[var(--text-secondary)] whitespace-nowrap">
                    {feat.activeWorkspaces.toLocaleString()} workspaces
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
