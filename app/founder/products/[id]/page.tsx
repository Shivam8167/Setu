"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Server,
  DollarSign,
  Sparkles,
  Activity,
  Box,
  HeartPulse,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { mockProducts, mockFeatures, mockReleases } from "@/lib/mockData";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = mockProducts.find((p) => p.id === params?.id) || mockProducts[0];
  const productFeatures = mockFeatures.filter((f) => f.productId === product.id);
  const productReleases = mockReleases.filter((r) => r.productName.toLowerCase().includes(product.name.toLowerCase()));

  const isHealthy = product.health.status === "Healthy";

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link
          href="/founder/products"
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--icon-btn-navy)] hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Back to Products Registry</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div
        className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 p-6 text-white"
        style={{ background: "linear-gradient(135deg, #001C44 0%, #08285C 100%)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[var(--surface)]/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-200">
                {product.tier}
              </span>
              <span className="rounded-md bg-[var(--surface)]/10 px-2 py-0.5 font-mono text-xs text-white/80">
                {product.release}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">{product.name}</h1>
            <p className="mt-1 max-w-2xl text-sm text-white/80">{product.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                isHealthy ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30" : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
              }`}
            >
              {isHealthy ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              <span>{product.health.status} ({product.health.score}%)</span>
            </span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 screen-sm:grid-cols-4">
          <div>
            <span className="text-xs text-white/60">Active Workspaces</span>
            <p className="text-lg font-bold text-white">{product.workspaceCount.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Adoption Rate</span>
            <p className="text-lg font-bold text-white">{product.adoptionRate}%</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Monthly Volume</span>
            <p className="text-sm font-semibold text-white">{product.usageMetric}</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Operational Cost</span>
            <p className="text-lg font-bold text-white">${product.operationalCost.total.toLocaleString()} / mo</p>
          </div>
        </div>
      </div>

      {/* Grid: Features & Dependencies */}
      <div className="grid grid-cols-1 gap-[var(--space-md)] screen-lg:grid-cols-2">
        {/* Features Table Card */}
        <Card
          title={`Features in ${product.name}`}
          description={`${productFeatures.length} features active for this product`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--divider)] text-[0.75rem] font-semibold uppercase text-[var(--text-muted)]">
                  <th className="pb-2">Feature Name</th>
                  <th className="pb-2">Adoption</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--divider)]">
                {productFeatures.map((f) => (
                  <tr key={f.id} className="hover:bg-[var(--surface-muted)]/50">
                    <td className="py-2.5">
                      <span className="font-semibold text-[var(--text-heading)]">{f.name}</span>
                    </td>
                    <td className="py-2.5 font-bold text-blue-600">{f.adoptionRate}%</td>
                    <td className="py-2.5">
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Dependencies Card */}
        <Card
          title="Microservice Dependencies"
          description="Architecture layers supporting this product"
        >
          <div className="flex flex-col gap-2.5">
            {product.dependencies.map((dep, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-3"
              >
                <div>
                  <p className="font-semibold text-[var(--text-heading)]">{dep.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{dep.type} • Impact: {dep.impact}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    dep.state === "Healthy"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                  }`}
                >
                  {dep.state}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Incidents & Releases Row */}
      <div className="grid grid-cols-1 gap-[var(--space-md)] screen-lg:grid-cols-2">
        {/* Incidents */}
        <Card title="Product Incidents & Health SLAs" description="Open and recent incident telemetry">
          {product.incidents.length === 0 ? (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200/50 bg-emerald-50/60 p-4 text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/30 dark:text-emerald-400">
              <CheckCircle2 size={18} />
              <span className="text-sm font-semibold text-[var(--text-heading)]">Zero open incidents for {product.name}. All SLAs healthy.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {product.incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="flex flex-col gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-3.5 transition-colors hover:bg-[var(--surface)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">{inc.id}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold ${
                          inc.status === "Resolved"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                        }`}
                      >
                        {inc.status}
                      </span>
                      {inc.severity && (
                        <span className="badge-pill badge-pill-sm text-[var(--text-muted)]">
                          {inc.severity}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">{inc.time}</span>
                  </div>
                  <p className="font-semibold text-[var(--text-heading)]">{inc.title}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Releases */}
        <Card title="Product Release History" description="Recent production deployments">
          <div className="flex flex-col gap-2">
            {productReleases.map((rel) => (
              <div key={rel.id} className="flex items-center justify-between rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-3 transition-colors hover:bg-[var(--surface)]">
                <div>
                  <span className="font-semibold text-[var(--text-heading)]">{rel.version} ({rel.cohort})</span>
                  <p className="text-xs text-[var(--text-muted)]">Deployed by {rel.initiator} on {rel.deployedAt}</p>
                </div>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  {rel.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
