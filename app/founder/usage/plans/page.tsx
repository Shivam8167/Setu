"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  BarChart2,
  Activity,
  CheckCircle2,
  Zap,
  Users,
} from "lucide-react";
import Card from "@/components/shared/Card";

export default function PlansEntitlementsPage() {
  const plans = [
    {
      name: "Free Starter",
      tagline: "Developer sandbox & initial community experimentation",
      price: "$0 / mo",
      workspaces: 410,
      limits: {
        tokens: "100,000 tokens / mo",
        messages: "2,500 messages / mo",
        storage: "2 GB Storage",
        seats: "2 Team Members",
        connectors: "Standard Webhooks",
        sla: "Best Effort",
      },
      badge: "Community",
      badgeColor: "bg-[var(--surface-muted)] text-[var(--text-secondary)] border border-[var(--divider)]/40 dark:bg-white/10 dark:text-slate-200",
    },
    {
      name: "Pro Tier",
      tagline: "Growing teams scaling AI conversational workflows",
      price: "$120 / mo",
      workspaces: 810,
      limits: {
        tokens: "2,000,000 tokens / mo",
        messages: "50,000 messages / mo",
        storage: "25 GB NVMe Storage",
        seats: "15 Team Members",
        connectors: "Tally + Razorpay Direct",
        sla: "99.9% Availability",
      },
      badge: "Fastest Growing",
      badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
    },
    {
      name: "Business Application",
      tagline: "High-volume transactional ERP, GST & WhatsApp automation",
      price: "$450 / mo",
      workspaces: 650,
      limits: {
        tokens: "10,000,000 tokens / mo",
        messages: "250,000 messages / mo",
        storage: "100 GB Cloud Storage",
        seats: "Unlimited Seats",
        connectors: "All ERP & Bank Gateways",
        sla: "99.95% Availability",
      },
      badge: "Most Popular",
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
    },
    {
      name: "Enterprise Suite",
      tagline: "Custom models, dedicated clusters, DPDP & strict SLA guarantees",
      price: "Custom",
      workspaces: 280,
      limits: {
        tokens: "Unlimited / Contracted",
        messages: "Dedicated Ingestion Lane",
        storage: "Dedicated Tenant S3 Bucket",
        seats: "Enterprise SSO / SAML",
        connectors: "Custom Microservice Sync",
        sla: "99.99% Financial SLA",
      },
      badge: "Mission Critical",
      badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    },
  ];

  return (
    <div className="flex flex-col gap-[var(--space-lg)] pb-8">
      {/* Subparts Navigation Bar */}
      <div className="flex items-center justify-between border-b border-[var(--divider)] pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/founder/usage"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
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
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
          >
            <FileText size={14} />
            <span>Plan / Entitlements</span>
          </Link>
        </div>
      </div>

      {/* Plan Tiers Grid */}
      <div className="grid grid-cols-1 gap-[var(--space-md)] screen-md:grid-cols-2 screen-xl:grid-cols-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className="flex flex-col justify-between rounded-2xl border border-[var(--divider)] bg-[var(--surface)] p-5 shadow-xs transition-all hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${p.badgeColor}`}>
                  {p.badge}
                </span>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  {p.workspaces} Workspaces
                </span>
              </div>

              <h2 className="mt-3 text-lg font-bold text-[var(--text-heading)]">{p.name}</h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{p.tagline}</p>
              <p className="mt-3 text-2xl font-extrabold text-[var(--text-heading)]">{p.price}</p>

              <div className="mt-4 flex flex-col gap-2 border-t border-[var(--divider)] pt-4 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{p.limits.tokens}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{p.limits.messages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{p.limits.storage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{p.limits.seats}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{p.limits.connectors}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                  <span className="font-semibold text-blue-700 dark:text-blue-400">{p.limits.sla}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Policy Enforcement Card */}
      <Card
        title="Automated Quota & Overage Policy"
        description="System rules enforced across active tenants"
      >
        <div className="grid grid-cols-1 gap-3 screen-sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-4">
            <span className="font-bold text-sm text-[var(--text-heading)]">Warning Notification</span>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Dispatched automatically to workspace admin when consumption crosses 80% threshold.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-4">
            <span className="font-bold text-sm text-[var(--text-heading)]">Autoscale Expansion</span>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Enterprise lanes automatically autoscale with post-paid billing per overage unit.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-4">
            <span className="font-bold text-sm text-[var(--text-heading)]">Grace Period Hold</span>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Free & Pro tiers receive a 72-hour grace period before write operations are restricted.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
