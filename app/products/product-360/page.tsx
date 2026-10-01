"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  CheckSquare,
  Sparkles,
  BarChart3,
  TrendingUp,
  Activity,
  Server,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Box,
  HeartPulse,
  ChevronDown,
  Check,
} from "lucide-react";
import Card from "@/components/shared/Card";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockProducts, mockFeatures, mockReleases } from "@/lib/mockData";

const productDarkLogos: Record<string, string> = {
  "office-sahayogi": "/logos/dark/office-sahayogi.png",
  "boss": "/logos/dark/boss.png",
  "sahayogi-cloud": "/logos/dark/sahayogi-cloud.png",
  "chat-with-sahayogi": "/logos/dark/chat-with-sahayogi.png",
  "chat-sahayogi": "/logos/dark/chat-with-sahayogi.png",
  "investor-sahayogi": "/logos/dark/investor-sahayogi.png",
  "tax-sahayogi": "/logos/dark/tax-sahayogi.png",
  "sahayogi-one": "/logos/dark/sahayogi-one.png",
  "my-sahayogi": "/logos/dark/my-sahayogi.png",
  "studio-sahayogi": "/logos/dark/studio-sahayogi.png",
};

const productLogos: Record<string, string> = {
  "office-sahayogi": "/logos/office-sahayogi.png",
  "boss": "/logos/boss.png",
  "sahayogi-cloud": "/logos/sahayogi-cloud.png",
  "chat-with-sahayogi": "/logos/chat-with-sahayogi.png",
  "chat-sahayogi": "/logos/chat-with-sahayogi.png",
  "investor-sahayogi": "/logos/investor-sahayogi.png",
  "tax-sahayogi": "/logos/tax-sahayogi.png",
  "sahayogi-one": "/logos/sahayogi-one.png",
  "my-sahayogi": "/logos/my-sahayogi.png",
  "studio-sahayogi": "/logos/studio-sahayogi.png",
};

export default function Product360HubPage() {
  const [selectedProductId, setSelectedProductId] = useState("sahayogi-cloud");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const [activeTab, setActiveTab] = useState<"overview" | "usage" | "features" | "dependencies" | "cost">("overview");

  const product = mockProducts.find((p) => p.id === selectedProductId) || mockProducts[0];
  const productFeatures = mockFeatures.filter((f) => f.productId === product.id);
  const productReleases = mockReleases.filter((r) => r.productName === product.name);

  const tabs = [
    { id: "overview", label: "360 Overview", icon: Layers },
    { id: "usage", label: "Usage & Metering", icon: BarChart3 },
    { id: "features", label: "Features & Flags", icon: Sparkles },
    { id: "dependencies", label: "Architecture & Deps", icon: Server },
    { id: "cost", label: "Operational Cost", icon: DollarSign },
  ] as const;

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
            className="flex items-center gap-1.5 rounded-lg bg-[var(--icon-btn-navy)] px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
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
            className="flex items-center gap-1.5 rounded-lg border border-[var(--divider)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
          >
            <CheckSquare size={14} />
            <span>Feature Adoption</span>
          </Link>
        </div>

        {/* Product Switcher Dropdown */}
        <div ref={dropdownRef} className="relative flex items-center gap-2">
          <span className="text-xs font-medium text-[var(--text-muted)]">Active Product:</span>
          
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            className={`tap-pop flex h-9 items-center gap-2 rounded-xl border bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
              isDropdownOpen
                ? "border-blue-500 ring-2 ring-blue-500/15 text-[var(--text-heading)] shadow-sm"
                : "border-[var(--divider)] text-[var(--text-heading)] hover:border-[var(--text-muted)] hover:bg-[var(--surface-muted)]/50 shadow-xs"
            }`}
          >
            <div className="relative shrink-0 flex items-center justify-center h-6 w-6">
              <img
                src={productLogos[product.id] || "/logos/office-sahayogi.png"}
                alt={product.name}
                className="product-logo-light h-6 w-6 object-contain shrink-0"
              />
              <img
                src={productDarkLogos[product.id] || productLogos[product.id] || "/logos/dark/office-sahayogi.png"}
                alt={product.name}
                className="product-logo-dark h-6 w-6 object-contain shrink-0"
              />
            </div>

            <span className="font-semibold text-[var(--text-heading)]">{product.name}</span>

            <span className="badge-pill badge-pill-sm">{product.tier}</span>

            <ChevronDown
              size={14}
              className={`text-[var(--text-muted)] transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180 text-blue-600" : ""
              }`}
            />
          </button>

          {/* Custom Popover Menu */}
          {isDropdownOpen && (
            <div
              role="listbox"
              aria-label="Select Active Product"
              className="absolute right-0 top-[calc(100%+6px)] z-50 w-72 sm:w-84 overflow-hidden rounded-2xl border border-[var(--divider)] bg-[var(--surface)] p-1.5 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-[var(--divider)]/60 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Switch Product Line
                </span>
                <span className="text-[10px] font-medium text-[var(--text-muted)]">
                  {mockProducts.length} Products
                </span>
              </div>

              <div className="max-h-[19rem] overflow-y-auto space-y-0.5 pr-0.5">
                {mockProducts.map((p) => {
                  const isSelected = p.id === selectedProductId;
                  const logo = productLogos[p.id];
                  const darkLogo = productDarkLogos[p.id];

                  return (
                    <button
                      key={p.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`group flex w-full items-center justify-between gap-3 rounded-xl px-2.5 py-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-50/80 text-blue-950 font-semibold ring-1 ring-blue-600/15 dark:bg-blue-950/60 dark:text-blue-100 dark:ring-blue-500/30"
                          : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-heading)]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0 flex items-center justify-center h-7 w-7">
                          <img
                            src={logo || "/logos/office-sahayogi.png"}
                            alt={p.name}
                            className="product-logo-light h-7 w-7 object-contain shrink-0"
                          />
                          <img
                            src={darkLogo || logo || "/logos/dark/office-sahayogi.png"}
                            alt={p.name}
                            className="product-logo-dark h-7 w-7 object-contain shrink-0"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span
                            className={`text-xs leading-tight truncate ${
                              isSelected ? "font-bold text-blue-950 dark:text-blue-100" : "font-medium text-[var(--text-heading)]"
                            }`}
                          >
                            {p.name}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)] leading-tight mt-0.5">
                            {p.tier}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {p.release && (
                          <span className="badge-pill badge-pill-sm font-mono">{p.release}</span>
                        )}
                        {isSelected && (
                          <Check size={14} className="text-blue-600 stroke-[2.5]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Hero Banner */}
      <div
        className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 p-6 text-white"
        style={{ background: "linear-gradient(135deg, #001C44 0%, #003380 100%)" }}
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
            <div className="flex flex-col items-end">
              <span className="text-xs text-white/70">Health Status</span>
              <span className="text-lg font-bold text-emerald-300">
                {product.health.status} ({product.health.score}%)
              </span>
            </div>
          </div>
        </div>

        {/* Hero quick stats */}
        <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 screen-sm:grid-cols-4">
          <div>
            <span className="text-xs text-white/60">Workspaces</span>
            <p className="text-lg font-bold text-white">{product.workspaceCount.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Adoption Rate</span>
            <p className="text-lg font-bold text-white">{product.adoptionRate}%</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Usage Metric</span>
            <p className="text-sm font-semibold text-white">{product.usageMetric}</p>
          </div>
          <div>
            <span className="text-xs text-white/60">Monthly Cost</span>
            <p className="text-lg font-bold text-white">${product.operationalCost.total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Internal Tabs */}
      <div className="flex border-b border-[var(--divider)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? "border-[var(--icon-btn-navy)] text-[var(--icon-btn-navy)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-heading)]"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-[var(--space-md)] screen-lg:grid-cols-2">
          {/* Dependencies Card */}
          <Card title="Core Service Dependencies" description="Underlying microservices, databases & APIs">
            <div className="flex flex-col gap-2.5">
              {product.dependencies.map((dep, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-3"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-[var(--text-heading)]">{dep.name}</span>
                    <span className="text-xs text-[var(--text-muted)]">{dep.type} • Impact: {dep.impact}</span>
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

          {/* Operational Cost Card */}
          <Card title="Operational Cost Allocation" description="Monthly infrastructure & external provider breakdown">
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-[var(--role-text)]">Total Monthly Run-Rate</span>
                <span className="text-2xl font-bold text-[var(--text-heading)]">
                  ${product.operationalCost.total.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-[var(--divider)] p-2.5">
                  <span className="text-[var(--text-muted)]">Core Compute</span>
                  <p className="text-sm font-semibold text-[var(--text-heading)]">
                    ${product.operationalCost.infra.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--divider)] p-2.5">
                  <span className="text-[var(--text-muted)]">AI Providers</span>
                  <p className="text-sm font-semibold text-[var(--text-heading)]">
                    ${product.operationalCost.aiProvider.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--divider)] p-2.5">
                  <span className="text-[var(--text-muted)]">Messaging / SMS</span>
                  <p className="text-sm font-semibold text-[var(--text-heading)]">
                    ${product.operationalCost.messaging.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--divider)] p-2.5">
                  <span className="text-[var(--text-muted)]">Cloud Storage</span>
                  <p className="text-sm font-semibold text-[var(--text-heading)]">
                    ${product.operationalCost.storage.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "features" && (
        <Card title={`${product.name} Features`} description="All features tied to this product line">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--divider)] text-[0.75rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  <th className="pb-3 pr-4">Feature</th>
                  <th className="pb-3 px-3">Adoption</th>
                  <th className="pb-3 px-3">Workspaces</th>
                  <th className="pb-3 px-3">Rollout %</th>
                  <th className="pb-3 px-3">Telemetry Gate</th>
                  <th className="pb-3 pl-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--divider)]">
                {productFeatures.map((f) => (
                  <tr key={f.id} className="transition-colors hover:bg-[var(--surface-muted)]/50">
                    <td className="py-3 pr-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[var(--text-heading)]">{f.name}</span>
                        <span className="text-xs text-[var(--text-muted)] line-clamp-1">{f.description}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[var(--text-heading)]">{f.adoptionRate}%</td>
                    <td className="py-3 px-3">{f.activeWorkspaces.toLocaleString()}</td>
                    <td className="py-3 px-3">{f.rolloutPercentage}%</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                        {"status" in f.telemetryGate ? (f.telemetryGate as any).status : (f.telemetryGate as any).healthy ? "Passed" : "Warning"}
                      </span>
                    </td>
                    <td className="py-3 pl-3 text-right">
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
      )}

      {activeTab === "usage" && (
        <Card title="Monthly Consumption & Metering" description="Real-time meters configured for this product">
          <div className="grid grid-cols-1 gap-3 screen-sm:grid-cols-3">
            <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-4">
              <span className="text-xs font-medium text-[var(--text-muted)]">Monthly Workspaces Invocations</span>
              <p className="mt-1 text-2xl font-bold text-[var(--text-heading)]">{product.usageMetric}</p>
            </div>
            <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-4">
              <span className="text-xs font-medium text-[var(--text-muted)]">Active Plans</span>
              <p className="mt-1 text-2xl font-bold text-[var(--text-heading)]">{product.planCount} Commercial Plans</p>
            </div>
            <div className="rounded-xl border border-[var(--divider)] bg-[var(--surface-muted)]/50 p-4">
              <span className="text-xs font-medium text-[var(--text-muted)]">Active Tenants</span>
              <p className="mt-1 text-2xl font-bold text-blue-600">{product.workspaceCount.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "dependencies" && (
        <Card title="Architecture & Dependencies" description="Internal and external services required by this product">
          <div className="flex flex-col gap-3">
            {product.dependencies.map((dep, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-[var(--divider)] p-3">
                <div>
                  <p className="font-semibold text-[var(--text-heading)]">{dep.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">Type: {dep.type} • Impact Level: {dep.impact}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  dep.state === "Healthy" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                }`}>
                  {dep.state}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "cost" && (
        <Card title="Detailed Operational Cost Breakdown" description="Monthly infrastructure line items">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[var(--divider)] pb-2">
              <span className="font-semibold text-[var(--text-heading)]">Line Item</span>
              <span className="font-semibold text-[var(--text-heading)]">Amount (USD)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Cloud Infrastructure (AWS EC2 / RDS / S3)</span>
              <span className="font-semibold text-[var(--text-heading)]">${product.operationalCost.infra.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">AI Model Gateway (OpenAI / Anthropic)</span>
              <span className="font-semibold text-[var(--text-heading)]">${product.operationalCost.aiProvider.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Messaging & Telephony (Twilio / WhatsApp API)</span>
              <span className="font-semibold text-[var(--text-heading)]">${product.operationalCost.messaging.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Block & Object Storage (NVMe / S3)</span>
              <span className="font-semibold text-[var(--text-heading)]">${product.operationalCost.storage.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--divider)] pt-2 text-base font-bold">
              <span>Total Monthly Run-Rate</span>
              <span className="text-blue-600">${product.operationalCost.total.toLocaleString()}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
